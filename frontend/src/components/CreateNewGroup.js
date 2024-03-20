import React from 'react';
import './CreateNewGroup.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

class Member {
    /**
     * name
     * 
     * a string containing the name of the member
     * 
     *  memberObject = {
     *      name: String
     *  }
     */
    name;

    constructor(memberObject) {
        this.name = memberObject.name;
    }

    get name() {
        return this.name;
    }

    get memberObject() {
        const memberObject = {
            name: this.name
        };
        return memberObject;
    }
}
/**
 * Task
 * 
 * A thing that needs to get done
 * 
 *  taskObject = {
 *      name: String,
 *      instructions: String,
 *      status: String,
 *      subtasks: Task[]
 *  }
 */
class Task {
    /**
     * name
     * 
     * a string containing the name of the Task
     */
    name;

    /**
     * instructions
     * 
     * a string containing instructions for how to complete the task
     */
    instructions;

    /**
     * status
     * 
     * a string, either "incomplete" or "complete", indicating the status of the Task
     */
    status;

    /**
     * subtasks
     * 
     * a list of Tasks, all of which must be completed for this Task to be completed
     */
    subtasks;

    constructor(taskObject) {
        this.name = taskObject.name;
        this.instructions = taskObject.instructions;
        this.status = taskObject.status;
        this.subtasks = [];
        for (let i = 0; i < taskObject.subtasks.length; i++)
            this.subtasks.push(new Task(taskObject.subtasks[i]));
    }

    /**
     * Add a task to the sub-task list
     * @param {Task} task 
     */
    addTask(task) {
        this.subtasks.push(task);
    }

    /**
     * get an object holding all the information of this task
     */
    get taskObject() {
        const taskObject = {
            name: this.name,
            instructions: this.instructions,
            status: this.status,
            subtasks: []
        };
        for (let i = 0; i < this.subtasks.length; i++)
            taskObject.subtasks.push(this.subtasks[i].taskObject);
        return taskObject;
    }
}

/**
 * Group
 * 
 * A collection of Members united by a collection of Tasks to achieve a goal
 * 
 *  groupObject = {
 *      name: String,
 *      description: String,
 *      tasks: Task[],
 *      members: Member[]
 *  }
 */
class Group {
    /**
     * name
     * 
     * a string containing the name of the Group
     */
    name;

    /**
     * description
     * 
     * a string containing a general overview of the Group
     */
    description;

    /**
     * tasks
     * 
     * a list of Tasks
     */
    tasks;

    /**
     * members
     * 
     * a list of Members
     */
    members;

    constructor(groupObject) {
        this.name = groupObject.name;
        this.description = groupObject.description;
        this.tasks = [];
        for (let i = 0; i < groupObject.tasks.length; i++)
            this.tasks.push(new Task(groupObject.tasks[i]));
        this.members = [];
        for (let i = 0; i < groupObject.members.length; i++)
            this.members.push(groupObject.members[i]);
    }

    /**
     * groupObject
     * @return an object containing all of the Group's information
     */
    get groupObject() {
        const groupObject = {
            name: this.name,
            description: this.description,
            tasks: [],
            members: []
        };
        for (let i = 0; i < this.tasks.length; i++)
            groupObject.tasks.push(this.tasks[i].taskObject);
        return groupObject;
    }
}

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
