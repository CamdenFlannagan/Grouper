import React, { useState, useEffect } from 'react';
import { Button } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Group } from './Group.js';

import { prac_groups } from './Practice_Data';

function Browse() {
    const navigate = useNavigate();
    const [search, findWord] = useState('');

    const _groups = [];
    prac_groups.forEach((group, groupId) => {
        _groups.push(group);
    });
    const [groups, setGroups] = useState(_groups);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const handleSearch = (e) => {
        findWord(e.target.value);
    };
    
    /*const handleJoin = (groupId) => {
        navigate('/group_page', {
            state: {
                id: groupId
            }
        });
    };*/

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(search.toLowerCase()) ||
        group.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
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
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                        <button
                            onClick={() => {
                                navigate('/group_page', { state : {groupId: group.id} });
                            }}
                        >Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Browse;
