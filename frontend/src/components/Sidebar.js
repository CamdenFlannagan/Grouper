import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
        <Link to="/home" className="sidebar-item">Logout</Link>
      </div>
    </>
  );
};




export default Sidebar;