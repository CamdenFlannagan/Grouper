import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';

function Tasks() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [ groupObject, setGroupObject ] = useState(JSON.parse(state.groupObject));
    const indeces = state.indeces;

    const [ inputedName, setInputedName ] = useState('');
    const [ inputedInstructions, setInputedInstructions ] = useState('');

    function addTask(indeces) {
        if (indeces === '[0]') {
            groupObject.tasks.push({
                name: inputedName,
                instructions: inputedInstructions,
                isComplete: false,
                subtasks: []
            });
            return;
        }
        addTaskHelper(groupObject.tasks, JSON.parse(indeces).reverse());
        setGroupObject(groupObject);
    }

    function addTaskHelper(taskList, indeces) {
        if (indeces.length === 0) 
            alert('Huh? There\'s nothing here');
        else if (indeces.length === 1) {
                taskList[indeces[0]].subtasks.push({
                    name: inputedName,
                    instructions: inputedInstructions,
                    isComplete: false,
                    subtasks: []
                });
        } else {
            addTaskHelper(taskList[indeces.pop()].subtasks, indeces);
        }
    }

    return (
        <div className="Tasks">
            <h1>Create a new task here!</h1>
            <h2>Name</h2>
            <input placeholder="task name" onInput={e => {
                setInputedName(e.target.value);
            }} />
            <h2>Instructions</h2>
            <input placeholder="instructions for task" onInput={e => {
                setInputedInstructions(e.target.value);
            }} />
            <button onClick={() => {
                addTask(indeces);
                navigate('/grouppage', { state : { groupObject : JSON.stringify(groupObject) }});
            }}>Submit</button>
        </div>
    );
}

export default Tasks;
