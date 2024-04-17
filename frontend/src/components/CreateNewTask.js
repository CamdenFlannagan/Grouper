import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';

function Tasks() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const groupObject = JSON.parse(state.groupObject);

    return (
        <div className="Tasks">
            <h1>Create a new task here!</h1>
            <h2>Name</h2>
            <input placeholder="task name" />
            <h2>Instructions</h2>
            <input placeholder="instructions for task" />
            <p>{state.groupObject}</p>
            <button onClick={() => {
                navigate('/grouppage', { state : { groupObject : JSON.stringify(groupObject) }});
            }}>Submit</button>
        </div>
    );
}

export default Tasks;
