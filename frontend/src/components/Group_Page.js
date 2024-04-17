import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { useState } from 'react';

import { prac_groups } from './Practice_Data';

function Group_Page() {
    const { state } = useLocation();
    const groupObject = prac_groups.get(state.groupId);

    const displayMembers = groupObject.members.map(member => (
        <p>{member.name}</p>
    ));



    function displayTask(taskObject) {
        return (
            <div className="Task">
                <h3>{taskObject.name}</h3>
                <p>{taskObject.instructions}</p>
                <button>Complete</button>
                {taskObject.subtasks.map(subtask => (
                    displayTask(subtask)
                ))}
                
            </div>
        )
    }

    const displayTasks = groupObject.tasks.map(task => (
        displayTask(task)
    ));

    return (
        <div>
            <h1>{groupObject.name}</h1>
            <p>{groupObject.description}</p>
            <h2>Members</h2>
            {displayMembers}
            <h2>Tasks</h2>
            {displayTasks}
        </div>
    );
}

export default Group_Page;