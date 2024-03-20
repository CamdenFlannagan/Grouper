import { Task } from './Task.js';
import { Member } from './Member.js';

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

export { Group };