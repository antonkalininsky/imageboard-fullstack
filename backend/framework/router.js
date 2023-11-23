// ***
// endpoint structure
// ***
// endpoints = {
//     '/path': {
//         'GET': handler1,
//         'POST': handler2,
//         'PUT': handler3,
//     }
// }

module.exports = class Router {
    constructor() {
        this.endpoints = {}
    }

    request(method = 'GET', path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }

        const endpoint = this.endpoints[path]

        if (endpoint[method]) {
            throw new Error(`Метод ${method} по адресу ${path} уже существует!`)
        }

        endpoint[method] = handler
    }

    get(path, handler) {
        this.request('GET', path, handler)
    }

    post(path, handler) {
        this.request('POST', path, handler)
    }

    put(path, handler) {
        this.request('PUT', path, handler)
    }

    delete(path, handler) {
        this.request('DELETE', path, handler)
    }
}