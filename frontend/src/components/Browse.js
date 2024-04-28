import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, arrayUnion, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useAuth } from '../UserContext';
import './Browse.css'; 

function Browse() {
    const navigate = useNavigate();
    const [search, findWord] = useState('');
    const [groups, setGroups] = useState([]);
    const userId = useAuth();

    useEffect(() => {
        const fetchGroups = async () => {
            const groupsCollectionRef = collection(db, "groups");
            const data = await getDocs(groupsCollectionRef);
            setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchGroups();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const handleSearch = (e) => {
        findWord(e.target.value);
    };

    const publicGroups = groups.filter(group => group.isPublic == true);

    const filteredGroups = publicGroups.filter(group =>
        group.GroupName.toLowerCase().includes(search.toLowerCase()) ||
        group.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (groupId) => {
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }
        try {
            const docRef = await getDoc(doc(db, "groups", groupId));

            await setDoc(doc(db, "groups", docRef.id, "members", userId), {
                role: 'member',
                points: 0
            });

            const userProfileRef = doc(db, "userProfiles", userId);
            await updateDoc(userProfileRef, {
                groupIds: arrayUnion(docRef.id)
            });

            navigate('/groups', { state: { groupId: docRef.id } });

        } catch (e) {
            console.error("Error adding document or setting leader: ", e);
        }
    };

    return (
        <div className='BrowseBG'>
            <div className="Browse">
                <h1>Browse</h1>
                <input
                    type="text"
                    placeholder="Search groups..."
                    value={search}
                    onChange={handleSearch}
                />
                <div className="group-container">
                    {filteredGroups.map(group => (
                        <div key={group.id} className="group-item">
                            <h2>{group.GroupName}</h2>
                            <p>{group.description}</p>
                            <button onClick={() => handleSubmit(group.id)}>Join</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Browse;
