import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUsers, faHome, faCog, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

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


  const shouldDisplaySidebar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';


  const shouldHideMenuButton = location.pathname === '/profile';

  return (
    <>
      {shouldDisplaySidebar && !isOpen && !shouldHideMenuButton && (
        <button className={`menu-button`} onClick={toggleSidebar}>
          Menu
        </button>
      )}
      <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <button className="close-button" onClick={toggleSidebar}>X</button>
        <Link to="/createnewgroup" className="sidebar-item">
          <FontAwesomeIcon icon={faPlus} className="icon" />Create Group
        </Link>
        <Link to="/browse" className="sidebar-item">
          <FontAwesomeIcon icon={faUsers} className="icon" />Browse Groups
        </Link>
        <Link to="/dashboard" className="sidebar-item">
          <FontAwesomeIcon icon={faHome} className="icon" />Dashboard
        </Link>
        {user && (
          <Link to={`/profile/${user.uid}`} className="sidebar-item">
            <FontAwesomeIcon icon={faUser} className="icon" />Profile
          </Link>
        )}
        <a href="#" onClick={handleLogout} className="sidebar-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />Logout
        </a>
      </div>
    </>
  );
};

export default Sidebar;
