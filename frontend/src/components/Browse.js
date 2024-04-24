import React, { useState, useEffect } from 'react';
import { Button } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getFirestore, collection, addDoc, setDoc, doc, updateDoc, arrayUnion, getDocs, getDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { app } from '../firebase';
import { useAuth } from '../UserContext';
import Sidebar from './Sidebar';



function Browse() {
    const navigate = useNavigate();
    const [search, findWord] = useState('');
    //Fetches real groups from firebase
    const [groups, setGroups] = useState([]);

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

    const filteredGroups = groups.filter(group =>
        group.GroupName.toLowerCase().includes(search.toLowerCase()) ||
        group.description.toLowerCase().includes(search.toLowerCase())
    );

    const userId = useAuth();
    const handleSubmit = async groupId => {
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
                <button onClick={handleLogout}>Logout</button>
                <div>
                    {filteredGroups.map(group => (
                        <div key={group.id}>
                            <h2>{group.GroupName}</h2> 
                            <p>{group.description}</p>
                        <button onClick={handleSubmit(group.id)}>Join</button>
                        </div>
                    ))}
                </div>

            </div>
            <Sidebar />
        </div>
    );
}


export default Browse;
