import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

function GroupSettings() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const membersRef = collection(db, 'groups', groupId, 'members');
        const membersSnap = await getDocs(membersRef);

        const membersList = await Promise.all(
          membersSnap.docs.map(async (docSnap) => {
            const userProfileRef = doc(db, 'userProfiles', docSnap.id);
            const userProfileSnap = await getDoc(userProfileRef);
            return {
              id: docSnap.id,
              role: docSnap.data().role,
              name: userProfileSnap.exists() ? userProfileSnap.data().name : 'Unknown',
            };
          })
        );

        setMembers(membersList);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
      setLoading(false);
    }
    fetchMembers();
  }, [groupId]);

  const handleRoleUpdate = async (memberId, newRole) => {
    try {
      const memberRef = doc(db, 'groups', groupId, 'members', memberId);
      await updateDoc(memberRef, {
        role: newRole,
      });
      setMembers(members.map(member => member.id === memberId ? { ...member, role: newRole } : member));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleRemoveMember = async memberId => {
    if (members.length === 1) {
      if (window.confirm("Are you sure you want to leave and delete the group? This action cannot be undone.")) {
        try {
          const tasksRef = collection(db, 'groups', groupId, 'tasks');
          const tasksSnap = await getDocs(tasksRef);
          for (const taskDoc of tasksSnap.docs) {
            await deleteDoc(doc(db, 'groups', groupId, 'tasks', taskDoc.id));
          }

          await deleteDoc(doc(db, 'groups', groupId));
          navigate('/dashboard');
        } catch (error) {
          console.error('Error removing the last member and deleting the group:', error);
        }
      }
    } else {
      try {
        await deleteDoc(doc(db, 'groups', groupId, 'members', memberId));
        setMembers(members.filter(member => member.id !== memberId));
      } catch (error) {
        console.error('Error removing member:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Group Settings</h1>
      {members.map(member => (
        <div key={member.id}>
          <span>{member.name} ({member.role})</span>
          {member.role !== 'leader' && (
            <button onClick={() => handleRoleUpdate(member.id, 'leader')}>Make Leader</button>
          )}
          <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
        </div>
      ))}
      <button onClick={() => navigate(-1)}>Back to Group</button>
    </div>
  );
}

export default GroupSettings;
