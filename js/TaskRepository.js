class TaskRepository {
    constructor(httpRequest) {
        this.httpRequest = httpRequest
        this.inboxTasks = new Array()
        this.completeTasks = new Array()
        this.getAllTasks()
    }

    getAllTasks() {
        this.httpRequest.get().map((task) => {
            if (task.status === false) {
                this.inboxTasks.push(new Task(task.id, task.name, task.status))
            }
            else {
                this.completeTasks.push(new Task(task.id, task.name, task.status))
            }
        })
    }

    getTasks(tasksType) {
        if (tasksType === CONTENT_TYPES.INBOX) {
            return this.inboxTasks
        }
        if (tasksType === CONTENT_TYPES.COMPLETE) {
            return this.completeTasks
        }
    }

    getTasksCount() {
        return {
            INBOX: this.inboxTasks.length,
            COMPLETE: this.completeTasks.length
        }
    }

    findTask(taskElementID) {
        const taskID = taskElementID
        let task = this.inboxTasks.find(task => task.id === taskID)
        if (task === undefined) {
            task = this.completeTasks.find(task => task.id === taskID)
        }
        return task
    }

    addTask(taskName) {
        return this.httpRequest.post({ "name": taskName })
            .then((task) => {
                const newTask = new Task(task.id, task.name, task.status)
                this.inboxTasks.push(newTask)
                return newTask
            })
    }

    completeTask(taskElementID) {
        const task = this.findTask(taskElementID)
        task.done()
        return this.httpRequest.put(task)
            .then((ok) => {
                if (ok === true) {
                    if (task.status) {
                        const taskIndex = this.inboxTasks.indexOf(task)
                        this.inboxTasks.splice(taskIndex, 1)
                        this.completeTasks.push(task)
                    }
                    else {
                        const taskIndex = this.completeTasks.indexOf(task)
                        this.completeTasks.splice(taskIndex, 1)
                        this.inboxTasks.push(task)
                    }
                }
            })
    }

    changeTask(taskElementID, taskNewName) {
        const task = this.findTask(taskElementID)
        task.change(taskNewName)
        this.httpRequest.put(task)
    }

    deleteTask(taskElementID) {
        const task = this.findTask(taskElementID)
        return this.httpRequest.delete(task)
            .then((ok) => {
                if (ok === true) {
                    if (!task.status) {
                        const taskIndex = this.inboxTasks.indexOf(task)
                        this.inboxTasks.splice(taskIndex, 1)
                    }
                    else {
                        const taskIndex = this.completeTasks.indexOf(task)
                        this.completeTasks.splice(taskIndex, 1)
                    }
                    return task
                }
            })
    }
}