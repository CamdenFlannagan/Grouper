import { Task } from './Task.js';
import { Member } from './Member.js';

/**
 * Group
 * 
 * A collection of Members united by a collection of Tasks to achieve a goal
 * 
 *  groupObject = {
 *      name: string,
 *      description: string,
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

    /**
     * 
     * @param {{
     *      name: string,
     *      description: string,
     *      tasks: taskObject[],
     *      members: memberObject[]
     * }} groupObject 
     */
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
        for (let i = 0; i < this.members.length; i++)
            groupObject.members.push(this.members[i].memberObject);
        return groupObject;
    }
}

const group1 = {
    name: "Group One",
    description: "This is the description for the first group. It is informative enough to explain what its about but is fairly concise",
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

export { group1, group2 };
export { Group };