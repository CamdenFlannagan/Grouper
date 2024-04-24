import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <button className={`menu-button ${isOpen ? 'hide' : ''}`} onClick={toggleSidebar}>
        Menu
      </button>
      <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <button className="close-button" onClick={toggleSidebar}>X</button>
        <Link to="/createnewgroup" className="sidebar-item profile">Create Group</Link>
        <Link to="/browse" className="sidebar-item">Browse Groups</Link>
        <Link to="/dashboard" className="sidebar-item">Dashboard</Link>
        <Link to="#settings" className="sidebar-item">Settings</Link>
        <a href="#" onClick={handleLogout} className="sidebar-item">Logout</a>
      </div>
    </>
  );
};

export default Sidebar;
