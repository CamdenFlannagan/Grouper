import React from 'react';
import './CreateNewGroup.css'; 
import { useNavigate } from 'react-router-dom';

function CreateNewGroup() {
    const navigate = useNavigate();
    const groupName = '';


    const createTask = async () => {
        navigate('/createnewgroup/createnewtask');
    };
    return (
        <div className="CreateNewGroup">
            <h1>Create a new group here!</h1>
            <input
                type="text"
                placeholder="Enter name"
                value={groupName}
            />
            <button onClick={createTask}>Make new task</button>
        </div>
    );
}

export default CreateNewGroup;
