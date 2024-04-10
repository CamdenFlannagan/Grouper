import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };
    const createGroup = async () => {
        navigate('/createnewgroup');
    };

    return (
        <div className="Dashboard">
            <div className="Dashboard-screen">

                <Sidebar />
                <div className= "Dashboard-header ">
                    <div className="Dashboard-page-name-container">
                        <div className="Dashboard-page-name ">
                            DASHBOARD
                        </div>
                        <div className="Dashboard-add-circle">
                            <div className="Dashboard-circle-plus-container">
                                <Link to="/createnewgroup">
                                    <div className="Dashboard-circle-plus">
                                        +
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Dashboard-scrollable-bottom">
                    <div className="Dashboard-single-group">
                        <div className="Dashboard-single-group-name">

                        </div>
                        <div className="Dashboard-single-group-description">

                        </div>
                    </div>
                </div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={createGroup}>Make new group</button>
            </div>
        </div>
    );
}

export default Dashboard;
