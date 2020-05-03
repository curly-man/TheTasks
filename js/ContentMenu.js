class ContentMenu{
    constructor(contentType){
        this.inbox = document.getElementById(CONTENT_TYPES.INBOX)
        this.complete = document.getElementById(CONTENT_TYPES.COMPLETE)
        this.inboxCount = document.getElementById(MENU_TASKS_COUNT_ID.INBOX_ID)
        this.completeCount = document.getElementById(MENU_TASKS_COUNT_ID.COMPLETE_ID)
        this.contentType = contentType
    }
    getContentType(){
        return this.contentType
    }

    renderMenuInfo(tasksCount) {
        this.inboxCount.innerHTML = tasksCount.INBOX
        this.completeCount.innerHTML = tasksCount.COMPLETE
    }

    changeContentType(contentType) {
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
}