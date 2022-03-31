import Controller from './../../controller/index.js'
import config from './../../config'

import Log from './../Log'

import reqToParameter from './request-parse'
import Resource from './resource.js'
import ResponseHandle from './response-handle.js'
import authHandle from './auth-handle'
import ProxyRewrite from './proxy-handle'

async function requestHandle(request, response) {
    const responseHandle = new ResponseHandle(response)
    const controller = new Controller(request)
    const resource = new Resource(request, response, this.isDev)

    if (this.isDev && resource.isImage) return resource.renderImage()
    if (this.isDev && resource.isStatic) return resource.render()

    const parameter = await reqToParameter(request)
    if (parameter instanceof Error) return responseHandle.failure(`parse parameter error: ${parameter.message}`)
    Log.success(`\nrequest start ------------------> \n${request.url} : ${JSON.stringify(parameter)}`)

    if (config.proxyRewrite.isRewrite) {
        const proxy = new ProxyRewrite({ request, parameter })
        const rewriteInstance = await proxy.rewrite()
        if (rewriteInstance instanceof Error) return responseHandle.failure(rewriteInstance.message);
        return responseHandle.json(rewriteInstance)
    }

    const auth = await authHandle(request)
    if (auth instanceof Error) {
        Log.error(`${request.url} : ${JSON.stringify(parameter)} ${auth.message}\nrequest auth failure  ------------------>`)
        return responseHandle.failure(auth.message, config.auth.loginFailure.code)
    }

    try {
        controller.request(parameter, responseHandle, request)
    } catch (error) {
        Log.error(`${request.url} : ${JSON.stringify(parameter)} ${JSON.stringify(error)}\nrequest auth failure  ------------------>`)
        responseHandle.failure(`${error}`)
    }
}

export default requestHandle