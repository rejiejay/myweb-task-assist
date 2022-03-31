import { authHandleWithTokenSignature } from './../utils/signature-helper'
import service from './../service'

/**
 * 权限校验的高阶函数
 */
const higherOrderAuth = (controller) => {
    const handle = async (parameter, responseHandle, request) => {
        const token = request.headers['token']
        const signature = request.headers['signature']

        const result = authHandleWithTokenSignature(signature, token)
        if (result instanceof Error) {
            const failureCode = config.auth.loginFailure.code
            return responseHanle.failure(result.message, failureCode)
        }

        const permission = await service.auth.getPermission({ token })
        if (permission instanceof Error) {
            return responseHanle.failure(permission.message, failureCode)
        }

        controller(parameter, responseHandle, request)
    }

    return handle
}

export default higherOrderAuth