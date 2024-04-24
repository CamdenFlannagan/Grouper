import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUsers, faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        <Link to="/createnewgroup" className="sidebar-item profile">
          <FontAwesomeIcon icon={faPlus} className="icon" />Create Group
        </Link>
        <Link to="/browse" className="sidebar-item">
          <FontAwesomeIcon icon={faUsers} className="icon" />Browse Groups
        </Link>
        <Link to="/dashboard" className="sidebar-item">
          <FontAwesomeIcon icon={faHome} className="icon" />Dashboard
        </Link>
        <a href="#" onClick={handleLogout} className="sidebar-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />Logout
        </a>
      </div>
    </>
  );
};

export default Sidebar;
