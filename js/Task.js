class Task{
    constructor(id, name, status){
        this.id = id
        this.name = name
        this.status = status
        this.done = this.done.bind(this)
        this.change = this.change.bind(this)
    }
    done(){
        this.status = !this.status
    }
    change(newName){
        this.name = newName
    }
    render(){
        let check = ''
        if (this.status){
            check = 'checked'
        }
        const newTask = `
            <div id='${'task_'+this.id}' class="task">
                <input
                    type="checkbox"
                    ${check}
                    class="input-task-done ml-10"
                    onclick="page.completeTaskEvent(event)"
                >
                <input
                    class="input-task ml-10"
                    onchange="page.changeTaskEvent(event)"
                    value="${this.name}"
                >
                <button
                    class="btn btn-delete fa fa-trash"
                    type="button"
                    onClick="page.deleteTaskEvent(event)"
                    aria-hidden="true"
                >
                </button>
                <hr>
            </div>`
        return newTask
    }
}