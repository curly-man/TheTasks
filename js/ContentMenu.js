class ContentMenu{
    constructor(contentType){
        this.contentType = contentType
    }
    getContentType(){
        return this.contentType;
    }

    renderMenuInfo(tasksCount) {
        this.inboxCount = document.getElementById(MENU_TASKS_COUNT_ID.INBOX_ID)
        this.completeCount = document.getElementById(MENU_TASKS_COUNT_ID.COMPLETE_ID)
        this.inboxCount.innerHTML = tasksCount.INBOX
        this.completeCount.innerHTML = tasksCount.COMPLETE
    }

    changeContentType(contentType) {
        this.inbox = document.getElementById(CONTENT_TYPES.INBOX)
        this.complete = document.getElementById(CONTENT_TYPES.COMPLETE)
        if (contentType === CONTENT_TYPES.COMPLETE) {
            this.inbox.classList.remove(MENU_ITEM_ACTIVE)
            this.complete.classList.add(MENU_ITEM_ACTIVE)
        }
        if (contentType === CONTENT_TYPES.INBOX) {
            this.complete.classList.remove(MENU_ITEM_ACTIVE)
            this.inbox.classList.add(MENU_ITEM_ACTIVE)
        }
        this.contentType = contentType
    }

    render(){
        const menu = `
            <div>
                <div class="col-30" style="height: 0.1px;"></div>
                <div id="confirm_element"></div>
            <div class="col-25" style="height: 0.1px;"></div>
            </div>
            <br>
            <div class="row">
            <div class="col-25" style="height: 0.1px;"></div>
            <div class="col-15">
                <div class="left-menu">
                    <h2 class="header">The Tasks</h2>
                    <nav>
                        <ul class="menu">
                            <li
                                class="menu-item ${this.contentType === CONTENT_TYPES.INBOX ? 'menu-item-active' : ''}"
                                id="inbox"
                                onClick="page.changeMenuItemEvent(event)"
                            >
                                <div class="icon-20 mr-10 fa fa-inbox">
                                </div>
                                <a class="task-type">Inbox</a>
                                <a id="inbox_task_count" class="task-count bold"></a>
                            </li>
                            <li
                                class="menu-item ${this.contentType === CONTENT_TYPES.COMPLETE ? 'menu-item-active' : ''}"
                                id="complete"
                                onClick="page.changeMenuItemEvent(event)"
                            >
                                <div class="icon-20 mr-10 fa fa-check-circle">
                                </div>
                                <a class="task-type">Complete</a>
                                <a id="complete_task_count" class="task-count bold"></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        `
        return menu
    }
}