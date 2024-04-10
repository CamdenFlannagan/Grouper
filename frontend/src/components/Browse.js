import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Sidebar from './Sidebar';


function Browse() {
    const navigate = useNavigate();
    const [search, findWord] = useState('');
    const [groups, setGroups] = useState([
        //Using static groups as an example. Will use firebase to search through groups when team finishes that.
        { id: 1, name: 'Art 101', description: 'Austin Rodriguez, CTAG: YALE UNIVERSITY' },
        { id: 2, name: 'Calculus 1 Midterm', description: 'Francisco Abraham,  CTAG: WHEATON COLLEGE' }

    ]);


    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };


    const handleSearch = (e) => {
        findWord(e.target.value);
    };


    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(search.toLowerCase()) ||
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
                            <h2>{group.name}</h2>
                            <p>{group.description}</p>
                        </div>
                    ))}
                </div>

            </div>
            <Sidebar />
        </div>
    );
}


export default Browse;
