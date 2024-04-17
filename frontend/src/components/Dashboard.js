import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
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

    const createGroup = () => {
        navigate('/createnewgroup');
    };

    return (
        <div className="Dashboard">
            <div className="Dashboard-screen">
                <nav className="Dashboard-nav">
                    <div className="Dashboard-nav-links">
                        <Link to="/browse">BROWSE</Link>
                        <Link to="/tasks">TASKS</Link> {}
                    </div>
                </nav>
                <Sidebar />
                <div className="Dashboard-header">
                    <div className="Dashboard-page-name-container">
                        <div className="Dashboard-page-name">DASHBOARD</div>
                        <div className="Dashboard-add-circle">
                            <div className="Dashboard-new-group-icon-container">
                                <Link to="/createnewgroup">
                                    <div className="Dashboard-circle-plus">+</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Dashboard-SB">
           { 
                groups.map((group) => (
                     <div key={group.id} className="Dashboard-group">
                     <div className="Dashboard-name">{group.GroupName}</div>
                     <div className="Dashboard-description">{group.description}</div>
                </div>
             ))
           }
                </div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={createGroup}>Make new group</button>
            </div>
        </div>
    );
}

export default Dashboard;
