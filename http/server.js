import * as http from 'http'

import config from './../config/index.js'
import Controller from './../controller/index.js'
import reqToParameter from './request-parse'
import Resource from './resource.js'
import ResponseHandle from './response-handle.js'

async function requestHandle(request, response) {
    const responseHandle = new ResponseHandle(response)
    const controller = new Controller(request)
    const resource = new Resource(request, response, this.isDev)

    if (this.isDev && resource.isStatic) return resource.render()

    const parseInstance = await reqToParameter(request)
    if (parseInstance.result !== 1) return responseHandle.failure(`parse parameter error`)
    const parameter = await parseInstance.data

    try {
        controller.request(parameter, responseHandle, request)
    } catch (error) {
        responseHandle.failure(`${error}`)
    }
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
