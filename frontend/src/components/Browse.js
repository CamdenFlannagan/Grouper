import React, { useState, useEffect } from 'react';
import { Button } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Sidebar from './Sidebar';

import { Group } from './Group.js';

import { prac_groups } from './Practice_Data';

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

    //Demo version by Camden with fake groups
    /*const _groups = [];
    prac_groups.forEach((group, groupId) => {
        _groups.push(group);
    });
    const [groups, setGroups] = useState(_groups);*/

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
                        <button //For the fake groups, replace GroupName with name
                            onClick={() => {
                                navigate('/grouppage', { state : {groupId: group.id, groupObject: group.groupObject} });
                            }}
                        >Join</button>
                        </div>
                    ))}
                </div>

            </div>
            <Sidebar />
        </div>
    );
}


export default Browse;
