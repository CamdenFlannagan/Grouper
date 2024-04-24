import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './components/Home.css';
import CreateNewGroup from './components/CreateNewGroup';
import './components/CreateNewGroup.css';
import CreateNewTask from './components/CreateNewTask'; 
import './components/CreateNewTask.css';
import Register from './components/Register';
import './components/Register.css';
import Login from './components/Login';
import './components/Login.css';
import Browse from './components/Browse';
import './components/Browse.css';
import GroupSettings from './components/GroupSettings'; 
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/Dashboard';
import Groups from './components/Groups';
import './components/Groups.css'
import TaskSubmission from './components/TaskSubmission';
import './components/TaskSubmission.css'
import { UserProvider } from './UserContext';


function App() {
  return (
    <UserProvider> 
      <Router>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1}}> 
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
              <Route path="/groups/:groupId/settings" element={<ProtectedRoute><GroupSettings /></ProtectedRoute>} />
              
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}
export default App;