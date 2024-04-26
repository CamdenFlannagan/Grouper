import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/Home.css';
import './components/CreateNewGroup.css';
import './components/CreateNewTask.css';
import './components/Register.css';
import './components/Login.css';
import './components/Browse.css';
import './components/Groups.css';
import './components/TaskSubmission.css';
import './components/AddMember.css';
import Home from './components/Home';
import CreateNewGroup from './components/CreateNewGroup';
import CreateNewTask from './components/CreateNewTask';
import Register from './components/Register';
import Login from './components/Login';
import Browse from './components/Browse';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups';
import TaskSubmission from './components/TaskSubmission';
import AddMember from './components/AddMember';
import GroupSettings from './components/GroupSettings';
import ProtectedRoute from './ProtectedRoute';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/createnewgroup" element={<ProtectedRoute><CreateNewGroup /></ProtectedRoute>} />
              <Route path="/groups/createnewtask" element={<ProtectedRoute><CreateNewTask /></ProtectedRoute>} />
              <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
              <Route path="/groups/tasksubmission" element={<ProtectedRoute><TaskSubmission /></ProtectedRoute>} />
              <Route path="/groups/addmember" element={<ProtectedRoute><AddMember /></ProtectedRoute>} />
              <Route path="/groups/:groupId/settings" element={<ProtectedRoute><GroupSettings /></ProtectedRoute>} />
              <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;