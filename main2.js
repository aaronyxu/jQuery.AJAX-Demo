window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    if (typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector)
        for (let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i]
        }
        nodes.length = temp.length
    } else if (nodeOrSelector instanceof Node) {
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }

    nodes.addClass = function (classes) {
        if (classes instanceof Array) {
            classes.forEach((value) => {
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add(value)
                }
            })
        } else if (typeof classes === 'string') {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add(classes)
            }
        }
    }

    nodes.setText = function (text) {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].textContent = text
        }
    }

    return nodes
}


// ES 6.0 jQuery.ajax API (using Promise) 
window.jQuery.ajax = function ({ url, method, body, headers }) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()
        request.open(method, url) // 设置请求第一部分
        for (let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value) // 设置请求第二部分
        }
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, responseText)
                } else if (request.status >= 400) {
                    reject.call(undefined, request)
                }
            }
        }
        request.send(body) // 设置请求第四部分
    })
}

window.$ = jQuery

button.addEventListener('click', (e) => {
    let promise = window.jQuery.ajax({
        url: '/xxx',
        method: 'GET',
    })

    promise.then(
        (responseText) => { console.log(responseText) },
        (request) => { console.log(request) }
    )
})
