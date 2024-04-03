/**
 * Task
 * 
 * A thing that needs to get done
 * 
 *  taskObject = {
 *      name: string,
 *      instructions: string,
 *      points: int,
 *      isComplete: boolean,
 *      subtasks: Task[]
 *  }
 */
class Task {
    
    // a title for the task
    name;

    // how to complete the task
    instructions;

    // how many points is the task worth?
    points;

    // is the task complete?
    isComplete;

    // how is this task broken into smaller pieces
    subtasts;

    /**
     * constructor for Task
     * @param {{
     *      name: string,
     *      instructions: string,
     *      points: int,
     *      isComplete: boolean,
     *      subtasks: Task[]
     * }} taskObject 
     */
    constructor(taskObject) {
        this.name = taskObject.name;
        this.instructions = taskObject.instructions;
        this.points = taskObject.points;
        this.isComplete = taskObject.isComplete;
        this.subtasks = [];
        for (let i = 0; i < taskObject.subtasks.length; i++)
            this.subtasks.push(new Task(taskObject.subtasks[i]));
    }

    /**
     * Add a task to the sub-task list
     * @param {Task} task 
     */
    addSubtask(task) {
        this.subtasks.push(task);
    }

    /**
     * get an object holding all the information of this task
     */
    get taskObject() {
        const taskObject = {
            name: this.name,
            instructions: this.instructions,
            points: this.points,
            isComplete: this.isComplete,
            subtasks: []
        };
        for (let i = 0; i < this.subtasks.length; i++)
            taskObject.subtasks.push(this.subtasks[i].taskObject);
        return taskObject;
    }
}

export { Task };