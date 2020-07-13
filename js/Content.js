class Content {
    addTask(task) {
        const tasks = document.getElementById('tasks');
        tasks.innerHTML += task.render();
    }

    removeTask(taskID) {
        document.getElementById(taskID).remove()
    }

    clearInputValue(){
        document.getElementById('addTask_Name').value = '';
    }

    render(tasks){
        let renderedTasks = '';
        tasks.map((task) => {
            renderedTasks += task.render()
        });
        const content = `
            <div class="col-40">
                <div class="main-content">
                    <div class="task-menu">
                        <div id="addTask" class="task-add mt-20">
                            <button class="btn" type="button" >
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            </button>
                            <input
                                id="addTask_Name"
                                type="text"
                                class="input-task-add mt-3"
                                onChange="page.addTaskEvent(event)"
                                placeholder="Add Task"
                            >
                        </div>
                        <div id="tasks" class="mt-20">
                            ${renderedTasks}
                        </div>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        `;
        return content;
    }
}