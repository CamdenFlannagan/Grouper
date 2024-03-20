import React from 'react';
import './CreateNewGroup.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Group } from './Group.js';
import { Task } from './Task.js';
import { Member } from './Member.js'; 

const group1 = {
    name: "group one",
    description: "the first group",
    tasks: [
        {
            name: "do the thing",
            instructions: "this is how to do the thing",
            status: "complete",
            subtasks: [
                {
                    name: "do the thing subtask",
                    instructions: "do this subtask to complete the thing",
                    status: "complete",
                    subtasks: []
                }
            ]
        },
        {
            name: "do the other thing",
            instructions: "this is how to do the other thing",
            status: "incomplete",
            subtasks: []
        }
    ],
    members: [
        {name: "John"},
        {name: "Patricia"},
        {name: "Carol"},
        {name: "Ronald"}
    ]
};

const group2 = {
    name: "group two",
    description: "the second group",
    tasks: [
        {
            name: "the thing that needs to be done is this",
            instructions: "complete it please",
            status: "incomplete",
            subtasks: [
                {
                    name: "this is a subtask for the thing that needs to be done",
                    instructions: "do this in order to complete the thing",
                    status: "complete",
                    subtasks: []
                },
                {
                    name: "this is a second subtask for the thing that needs to be done",
                    instructions: "do this as well in order to complete the thing",
                    status: "incomplete",
                    subtasks: []
                }
            ]
        },
        {
            name: "this is a thing that needs to be done",
            instructions: "complete this as well",
            status: "incomplete",
            subtasks: []
        }
    ],
    members: [
        {name: "Brody"},
        {name: "Tatiana"},
        {name: "Omar"}
    ]
};

const initialGroupList = [];

function CreateNewGroup() {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groups, addGroup] = useState(initialGroupList);

    const groupOne = new Group(group1);
    const groupOneObject = groupOne.groupObject;
    console.log(groupOneObject);

    const navigate = useNavigate();

    const createTask = async () => {
        navigate('/createnewgroup/createnewtask');
    };

    function submitGroup() {
        groups.push(new Group(groupName, groupDescription));
        addGroup(groups);
    }

    return (
        <div className="CreateNewGroup">
            <h1>Create a new group here!</h1>
            <input
                name="groupNameInput"
                type="text"
                placeholder="What is your group called?"
                onChange={e => setGroupName(e.target.value)}
            />
            <br />
            <input
                name="groupDescriptionInput"
                type="text"
                placeholder="What's your group about?"
                onChange={e => setGroupDescription(e.target.value)}
            />
            <button onClick={submitGroup}>Submit</button>
            <button onClick={createTask}>Make new task</button>
            <div>
                <ul> {
                        groups.map(group => <li key={group.groupObject.name}>
                            <h2>{group.groupObject.name}</h2>
                            <p>{group.groupObject.description}</p>
                        </li>)
                } </ul>
            </div>
        </div>
    );
}

export default CreateNewGroup;
