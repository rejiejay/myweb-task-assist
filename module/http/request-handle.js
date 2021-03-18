
import Controller from './../../controller/index.js'
import reqToParameter from './request-parse'
import Resource from './resource.js'
import ResponseHandle from './response-handle.js'
import authHandle from './auth-handle'
import Log from './../Log'

async function requestHandle(request, response) {
    const responseHandle = new ResponseHandle(response)
    const controller = new Controller(request)
    const resource = new Resource(request, response, this.isDev)

    if (this.isDev && resource.isStatic) return resource.render()

    const parseInstance = await reqToParameter(request)
    if (parseInstance.result !== 1) return responseHandle.failure(`parse parameter error`)
    const parameter = await parseInstance.data
    Log.success(`\nrequest start ------------------> \n${request.url} : ${JSON.stringify(parameter)}`)

    const authInstance = await authHandle(request)
    if (authInstance.result !== 1) {
        Log.error(`${request.url} : ${JSON.stringify(parameter)} ${authInstance.message}\nrequest auth failure  ------------------>`)
        return responseHandle.json(authInstance)
    }

    try {
        controller.request(parameter, responseHandle, request)
    } catch (error) {
        Log.error(`${request.url} : ${JSON.stringify(parameter)} ${JSON.stringify(error)}\nrequest auth failure  ------------------>`)
        responseHandle.failure(`${error}`)
    }
}

export default requestHandle
