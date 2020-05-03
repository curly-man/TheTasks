class Content {
    constructor(contentArea) {
        this.contentArea = document.getElementById(contentArea)
    }

    renderTask(task) {
        this.contentArea.innerHTML += task.render()
    }

    removeTask(taskID) {
        document.getElementById(taskID).remove()
    }

    clear() {
        this.contentArea.innerHTML = ""
    }

    render(tasks) {
        tasks.map((task) => {
            this.renderTask(task)
        })
    }
}