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
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/Dashboard';
import GroupPage from './components/GroupPage';
import './components/GroupPage.css'

function App() {
  return (
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
            <Route path="/createnewgroup/createnewtask" element={<ProtectedRoute><CreateNewTask /></ProtectedRoute>} />
            <Route path="/grouppage" element={<GroupPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;