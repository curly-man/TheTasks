class ConfirmAction {
    constructor(action, taskName) {
        this.action = action
        this.taskName = taskName
        this.content = document.getElementById(CONFIRM_ELEMENT_ID)
        this.decline = this.decline.bind(this)
        this.approve = this.approve.bind(this)
        this.render = this.render.bind(this)
        window["approveAction"] = this.approve
        window["declineAction"] = this.decline
    }
    render() {
        return `
        <div class="confirm">
            <div>
                <a id="confirm-info" class="confirm-message"></a>
                <button
                    type="button"
                    class="confirm-button"
                    onclick="declineAction(event)"
                    aria-hidden="true"
                >
                    Decline
                </button>
                <button
                    type="button"
                    class="confirm-button"
                    onClick="approveAction(event)"
                    aria-hidden="true"
                >
                    Approve
                </button>
            </div>
        </div>
        `
    }

    renderConfirmInfo() {
        document.getElementById(CONFIRM_INFO).innerHTML = this.taskName + " will be " + this.action + " in " + this.timeLeft + "s"
    }

    start() {
        return new Promise((resolve, reject) => {
            this.timeLeft = 5
            this.content.innerHTML = this.render();
            this.renderConfirmInfo()
            let confirmTimer = setInterval(() => {
                if (this.timeLeft <= 0) {
                    this.status = true
                    clearInterval(confirmTimer);
                } else {
                    this.timeLeft -= 1;
                    this.renderConfirmInfo()
                }
            }, 1000);
            let check = setInterval(() => {
                if (this.status === false) {
                    clearInterval(check);
                    clearInterval(confirmTimer);
                    this.content.innerHTML = "";
                    resolve(false)
                }
                if (this.status === true) {
                    clearInterval(check);
                    clearInterval(confirmTimer);
                    this.content.innerHTML = "";
                    resolve(true)
                }
            }, 10)
        })
    }

    approve() {
        this.status = true
    }

    decline() {
        this.status = false
    }
}