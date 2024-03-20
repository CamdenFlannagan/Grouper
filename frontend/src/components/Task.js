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

export { Task };