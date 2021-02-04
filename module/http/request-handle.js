
import Controller from './../../controller/index.js'
import reqToParameter from './request-parse'
import Resource from './resource.js'
import ResponseHandle from './response-handle.js'
import authHandle from './auth-handle'

async function requestHandle(request, response) {
    const responseHandle = new ResponseHandle(response)
    const controller = new Controller(request)
    const resource = new Resource(request, response, this.isDev)

    if (this.isDev && resource.isStatic) return resource.render()

    const parseInstance = await reqToParameter(request)
    if (parseInstance.result !== 1) return responseHandle.failure(`parse parameter error`)
    const parameter = await parseInstance.data

    const authInstance = await authHandle(request)
    if (authInstance.result !== 1) return responseHandle.json(authInstance)

    try {
        controller.request(parameter, responseHandle, request)
    } catch (error) {
        responseHandle.failure(`${error}`)
    }
}

export default requestHandle
