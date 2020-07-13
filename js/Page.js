class Page {
    constructor(content, contentMenu, repository) {
        this.root = document.getElementById('root');
        this.content = content;
        this.contentMenu = contentMenu;
        this.repository = repository;
        this.confirmElement = document.getElementById(CONFIRM_ELEMENT_ID);
    }
    render() {
        const tasks = this.repository.getTasks(this.contentMenu.getContentType());
        const pageData = this.contentMenu.render() + this.content.render(tasks);
        this.root.innerHTML = pageData;
        this.updateMenu();
    }

    updateMenu() {
        this.contentMenu.renderMenuInfo(this.repository.getTasksCount())
    }

    getTaskElementID(event) {
        return event.target.parentElement.id
    }

    getTaskID(taskElementID) {
        return taskElementID.split("_")[1]
    }

    confirmAction(action, taskName){
        return new ConfirmAction(action, taskName).start()
    }

    changeMenuItemEvent(event) {
        let element = event.target;
        if (element.tagName != "LI") {
            element = element.parentElement;
        }
        this.contentMenu.changeContentType(element.id);
        this.render();
    }

    addTaskEvent(event) {
        const addTaskElement = document.getElementById(ADD_TASK_ELEMENT_ID);
        this.repository.addTask(addTaskElement.value)
            .then((task) => {
                if (this.contentMenu.getContentType() === CONTENT_TYPES.INBOX) {
                    this.content.addTask(task)
                }
                this.updateMenu()
                this.content.clearInputValue()
            })
    }

    completeTaskEvent(event) {
        const taskElementID = this.getTaskElementID(event)
        const task = this.repository.findTask(this.getTaskID(taskElementID))
        this.confirmAction(ACTIONS.COMPLETE, task.name)
            .then((result) => {
                if (result === true) {
                    this.repository.completeTask(this.getTaskID(taskElementID))
                        .then(() => {
                            this.render()
                        })
                }
                else {
                    event.target.parentElement.innerHTML = task.render()
                }
            })
    }

    changeTaskEvent(event) {
        const taskElementID = this.getTaskElementID(event)
        const newName = event.target.value
        const task = this.repository.findTask(this.getTaskID(taskElementID))
        this.confirmAction(ACTIONS.CHANGE, task.name)
            .then((result) => {
                if (result === true) {
                    this.repository.changeTask(this.getTaskID(taskElementID), newName)
                }
                else {
                    event.target.value = task.name
                }
            })
    }

    deleteTaskEvent(event) {
        const taskElementID = this.getTaskElementID(event)
        const task = this.repository.findTask(this.getTaskID(taskElementID))
        this.confirmAction(ACTIONS.DELETE, task.name)
            .then((result) => {
                if (result === true) {
                    this.repository.deleteTask(this.getTaskID(taskElementID))
                        .then(() => {
                            this.updateMenu()
                            this.content.removeTask(taskElementID)
                        })
                }
            })
    }
}