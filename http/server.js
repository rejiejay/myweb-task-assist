import * as http from 'http'

import config from './../config/index.js'
import Controller from './../controller/index.js'
import utils from './utils.js'
import Resource from './resource.js'
import consequencer from './../utils/consequencer.js'

class ResponseHandle {
    constructor(response) {
        this.response = response
    }

    responseJsonHandle(data) {
        this.response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        this.response.end(JSON.stringify(data))
    }

    json(data) {
        return this.responseJsonHandle(data)
    }

    success(data, message) {
        return this.responseJsonHandle(consequencer.success(data, message))
    }

    failure(message, result, data) {
        return this.responseJsonHandle(consequencer.error(message, result, data))
    }
}

async function requestHandle(request, response) {
    const responseHandle = new ResponseHandle(response)
    const controller = new Controller(request)
    const resource = new Resource(request, response, this.isDev)
    if (this.isDev && resource.isStatic) return resource.render()
    const parameter = utils.reqToParameter(request)
    controller.request(parameter, responseHandle, request)
}

function init() {
    const server = http.createServer(requestHandle.bind(this))
    server.listen(config.port, config.host, () => console.log('create http service successful'))
}

const server = {
    isDev: false,
    init
}

export default server
