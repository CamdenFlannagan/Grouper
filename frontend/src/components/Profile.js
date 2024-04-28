import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, deleteDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { deleteUser, getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './Profile.css';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        const userDocRef = doc(db, 'userProfiles', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
          setError('');
        } else {
          setError('User not found');
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data');
        setUser(null);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const checkUserGroups = async (userId) => {
    const groupsRef = collection(db, 'groups');
    const q = query(groupsRef, where("members", "array-contains", userId));
    const groupDocs = await getDocs(q);
    let leaderOnlyGroups = [];

    for (const doc of groupDocs.docs) {
      const group = doc.data();
      const leaders = group.members.filter(member => member.role === 'leader');
      if (leaders.length === 1 && leaders[0].id === userId) {
        leaderOnlyGroups.push(group.name);
      }
    }
    return leaderOnlyGroups;
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is logged in.");
      setError("No user logged in");
      return;
    }

    const leaderOnlyGroups = await checkUserGroups(user.uid);
    if (leaderOnlyGroups.length > 0) {
      setError(`Cannot delete: Leader in these groups: ${leaderOnlyGroups.join(", ")}`);
      return;
    }

    try {
      // Check for groups with the user as the sole member and delete them
      const userGroupsRef = query(collection(db, 'groups'), where("members", "array-contains", user.uid));
      const userGroups = await getDocs(userGroupsRef);
      userGroups.forEach(async (group) => {
        if (group.data().members.length === 1) {
          await deleteDoc(doc(db, 'groups', group.id));
        }
      });

      // Delete the user profile data
      await deleteDoc(doc(db, 'userProfiles', user.uid));

      // Delete the user authentication record
      await deleteUser(user);
      navigate('/');
    } catch (err) {
      console.error("Error deleting user account:", err);
      setError("Failed to delete account");
    }
  };

  if (loading) {
    return <div className="Profile-loading">Loading...</div>;
  }

  if (error) {
    return <div className="Profile-error">{error}</div>;
  }

  return (
    <div className="Profile-container">
      <div className="Profile-header">
        <h1>User Profile</h1>
      </div>
      {user ? (
        <div className="Profile-details">
          <div className="Profile-detail-item" style={{ fontFamily: '"Syne", sans-serif' }}>Name: {user.name}</div>
          <div className="Profile-detail-item" style={{ fontFamily: '"Syne", sans-serif' }}>Email: {user.email}</div>
          <button onClick={handleDeleteAccount} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Delete Account
          </button>
        </div>
      ) : (
        <div className="Profile-error">User data is not available.</div>
      )}
    </div>
  );
}

export default Profile;
