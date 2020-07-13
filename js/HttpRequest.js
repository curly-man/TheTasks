class HttpRequest {
    constructor(api) {
        this.url = api
    }
    sendRequest(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status < 400) {
                        resolve(xhr.responseText)
                    } else {
                        reject(xhr.response)
                    }
                }
            }
            xhr.send(JSON.stringify(data))
        })
    }
    get() {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", this.url, false)
        xhr.send()
        if (xhr.status == 200) {
            let result = JSON.parse(xhr.responseText)
            return result
        }
    }
    post(data) {
        return this.sendRequest("POST", this.url, data)
            .then((response) => {
                return JSON.parse(response)
            })
    }
    put(data) {
        return this.sendRequest("PUT", this.url + '/' + data.id, data)
            .then(() => {
                return true
            })
    }
    delete(data) {
        return this.sendRequest("DELETE", this.url + '/' + data.id, data)
            .then(() => {
                return true
            })
    }
}