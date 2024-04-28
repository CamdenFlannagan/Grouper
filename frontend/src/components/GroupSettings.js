import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../UserContext';
import './GroupSettings.css';

function GroupSettings() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useAuth(); 

  useEffect(() => {
    async function fetchMembers() {
      try {
        const membersRef = collection(db, 'groups', groupId, 'members');
        const membersSnap = await getDocs(membersRef);
        const membersList = await Promise.all(
          membersSnap.docs.map(async docSnap => {
            const memberData = docSnap.data();
            const userProfileRef = doc(db, 'userProfiles', docSnap.id);
            const userProfileSnap = await getDoc(userProfileRef);
            const memberName = userProfileSnap.exists() ? userProfileSnap.data().name : 'Unknown';
            return {
              id: docSnap.id,
              name: memberName,
              role: memberData.role,
              points: memberData.points,
            };
          })
        );

        // Sort members by points
        membersList.sort((a, b) => b.points - a.points);
        setMembers(membersList);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
      setLoading(false);
    }

    fetchMembers();
  }, [groupId]);

  const isLeader = members.some(member => member.id === userId && member.role === 'leader');

  const confirmAndRemoveMember = async memberId => {
    if (members.length === 1) {
      if (!window.confirm("You are the last member in the group. Removing yourself will delete the group. Continue?")) {
        return;
      }
    } else {
      if (!window.confirm("Are you sure you want to remove this member from the group?")) {
        return;
      }
    }

    try {
      await deleteDoc(doc(db, 'groups', groupId, 'members', memberId));
      await updateDoc(doc(db, 'userProfiles', memberId), {
        groupIds: arrayRemove(groupId)
      });

      if (memberId === userId) {
        navigate('/dashboard');
        return;
      }

      setMembers(members.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Error removing member from group:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="GroupSettings-container">
      <h1 className="GroupSettings-header">Group Settings</h1>
      {members.map((member, index) => (
        <div key={member.id} className="GroupSettings-member">
          <div>
            <span className="GroupSettings-member-name">{member.name}</span>
            <span className="GroupSettings-member-role"> ({member.role})</span>
            <span className="GroupSettings-member-points"> Points: {member.points}</span>
            <span className="GroupSettings-member-rank"> Rank: {index + 1}</span>
          </div>
          {isLeader && member.id !== userId && (
            <>
              <button className="GroupSettings-button" onClick={() => confirmAndRemoveMember(member.id)}>Remove</button>
            </>
          )}
        </div>
      ))}
      {isLeader && (
        <button className="GroupSettings-button remove-myself" onClick={() => confirmAndRemoveMember(userId)}>Remove Myself</button>
      )}
      <button className="GroupSettings-button" onClick={() => navigate('/groups', { state: { groupId } })}>Back to Group</button>
    </div>
  );
}

export default GroupSettings;
