class Page {
    constructor(content, contentMenu, repository) {
        this.content = content
        this.contentMenu = contentMenu
        this.repository = repository
        this.addTaskElement = document.getElementById(ADD_TASK_ELEMENT_ID)
        this.confirmElement = document.getElementById(CONFIRM_ELEMENT_ID)
    }
    render() {
        this.content.render(this.repository.getTasks(this.contentMenu.getContentType()))
        this.updateMenu()
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

    changeMenuItemEvent(event) {
        this.content.clear()
        let element = event.target
        if (element.tagName != "LI") {
            element = element.parentElement
        }
        this.contentMenu.changeContentType(element.id)
        this.render()
    }

    addTaskEvent(event) {
        this.repository.addTask(this.addTaskElement.value)
            .then((task) => {
                if (this.contentMenu.getContentType() === CONTENT_TYPES.INBOX) {
                    this.content.renderTask(task)
                }
                this.updateMenu()
            })
        this.addTaskElement.value = ''
    }

    completeTaskEvent(event) {
        const taskElementID = this.getTaskElementID(event)
        new ConfirmAction("COMPLETE", this.repository.findTask(this.getTaskID(taskElementID)).name).start()
            .then((result) => {
                if (result === true) {
                    this.repository.completeTask(this.getTaskID(taskElementID))
                        .then(() => {
                            this.updateMenu()
                            this.content.removeTask(taskElementID)
                        })
                }
                else {
                    event.target.parentElement.innerHTML = this.repository.findTask(this.getTaskID(taskElementID)).render()
                }
            })
    }

    changeTaskEvent(event) {
        const taskElementID = this.getTaskElementID(event)
        const newName = event.target.value
        new ConfirmAction("CHANGE", this.repository.findTask(this.getTaskID(taskElementID)).name).start()
            .then((result) => {
                if (result === true) {
                    this.repository.changeTask(this.getTaskID(taskElementID), newName)
                }
                else {
                    event.target.value = this.repository.findTask(this.getTaskID(taskElementID)).name
                }
            })
    }

    deleteTaskEvent(event) {
        const taskElementID = this.getTaskElementID(event)
        new ConfirmAction("DELETE", this.repository.findTask(this.getTaskID(taskElementID)).name).start()
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