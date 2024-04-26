import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { useState } from 'react';


function GroupPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [ groupObject, setGroupObject ] = useState(JSON.parse(state.groupObject));

    /**
     * Takes a list of tasks and displays them and their subtasks
     * @param {*} taskList 
     * @returns 
     */
    function displayTasks(taskList) {
        return displayTasksHelper(taskList, []);
    }

    function displayTasksHelper(taskList, indeces) {
        if (taskList === undefined) {
            // if task list is undefined, something is probably wrong with the stored data
            alert('task list undefined');
            return <></>;
        }
        let toReturn = [];
        indeces.push(0);
        for (let i = 0; i < taskList.length; i++) {
            indeces[indeces.length - 1] = i;
            const indecesCopy = JSON.stringify(indeces);
            toReturn.push((
                <div className="Task" key={JSON.stringify(indeces)}>
                    <div className={taskList[i].isComplete ? "Complete" : "Incomplete"}>
                        <h3>{taskList[i].name}</h3>
                        <div className="IsComplete">
                            <p>{taskList[i].isComplete ? 'Completed' : 'Incomplete'}</p>
                        </div>
                    </div>
                    <p>{taskList[i].instructions}</p>
                    <button onClick={() => {
                        completeTask(indecesCopy);
                    }}>Complete</button>
                    <button onClick={() => {
                        navigate('/createnewgroup/createnewtask', { state : {
                            groupObject: JSON.stringify(groupObject),
                            indeces: indecesCopy
                        }});
                    }}>Add Subtask</button>
                    {displayTasksHelper(taskList[i].subtasks, indeces)}
                </div>
            ));
        }
        indeces.pop();
        return toReturn;
    }

    const [ displayedTasks, redisplayTasks ] = useState(displayTasks(groupObject.tasks));

    function completeTask(indeces) {
        completeTaskHelper(groupObject.tasks, JSON.parse(indeces).reverse());
        if (groupObject.tasks.length === 0) {
            redisplayTasks(<p>Hooray! No more tasks!</p>);
        } else {
            redisplayTasks(displayTasks(groupObject.tasks));
        }
        setGroupObject(groupObject);
        
        // this would be a great spot to push the group object to the database
        // add code here . . .

    }

    function completeTaskHelper(taskList, indeces) {
        if (indeces.length === 0) 
            alert('Huh? There\'s nothing here');
        else if (indeces.length === 1) {
            let allSubtasksComplete = true;
            for (let i = 0; i < taskList[indeces[0]].subtasks.length; i++)
                if (taskList[indeces[0]].subtasks[i].isComplete === false)
                    allSubtasksComplete = false;
            if (allSubtasksComplete) {
                taskList[indeces[0]].isComplete = true;
            } else {
                alert('Complete all subtasks first!');
            }
        } else {
            completeTaskHelper(taskList[indeces.pop()].subtasks, indeces);
        }
    }


    const initMemberDisplay = [];
    for (let i = 0; i < groupObject.members.length; i++)
        initMemberDisplay.push(<p key={i}>{groupObject.members[i].email}</p>);

    // add users to the member list by their email
    const [ inviteUI, setInviteUI ] = useState(0);
    const [ inputedEmail, setInputedEmail ] = useState('');
    const [ memberDisplay, setMemberDisplay ] = useState(initMemberDisplay);
    const inviteButton = (
        <div>
            <button onClick={() => {
                setInviteUI(1);
            }}>Invite</button>
        </div>
    );
    const inviteInput = (
        <div>
            <input placeholder="enter email" onInput={e => {
                setInputedEmail(e.target.value);
            }} />
            <button onClick={() => {
                groupObject.members.push({
                    email: inputedEmail
                });
                setGroupObject(groupObject);
                
                // this would be a great place to push the groupObject to the DB
                // add code here . . .

                let membersToDisplay = [];
                for (let i = 0; i < groupObject.members.length; i++)
                    membersToDisplay.push(<p key={i}>{groupObject.members[i].email}</p>);
                setMemberDisplay(membersToDisplay);
                setInviteUI(0);
            }}>Submit Invitation</button>
        </div>
    );

    

    return (
        <div className="GroupPage">
            <div className="GroupPageRight">
                <h1>{groupObject.name}</h1>
                <p>{groupObject.description}</p>
                <h2>Members</h2>
                {memberDisplay}
                {inviteUI ? inviteInput : inviteButton}
            </div>
            <div className="GroupPageLeft">
                <h2>Tasks</h2>
                <button onClick={() => {
                    navigate('/createnewgroup/createnewtask', { state : {
                        groupObject: JSON.stringify(groupObject),
                        indeces: 'no tasks'
                    }});
                }}>Add Task</button>
                {groupObject.tasks.length > 0 ? displayedTasks : <p>No tasks yet. Why not add some?</p>}
            </div>
        </div>
    );
}

export default GroupPage;