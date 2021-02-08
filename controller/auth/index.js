/**
 * controller task 对外方法: 所有方法对外
 */
import consequencer from './../../utils/consequencer'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import service from './../../service/index.js'
import config from './../../config'

const simpleVerifyUUid = request => {
    const headers = request.headers
    if (!headers) return consequencer.error('非法登陆')
    const uuid = headers[config.auth.uuid]

    const isStringInstance = valuesStructuresVerify.isStringNil(uuid)
    if (isStringInstance.result !== 1) return consequencer.error('非法登陆')

    const simpleVerify = uuid.split('-')
    if (simpleVerify.length !== 5) return consequencer.error('非法登陆')

    for (let index = 0; index < simpleVerify.length; index++) {
        const uuidElement = simpleVerify[index]
        if (uuidElement.length !== 17) return consequencer.error('非法登陆')
    }

    return consequencer.success(uuid)
}

const login = async function login({ password }, responseHanle, request) {
    if (!password) return responseHanle.failure('password 不能为空')

    const verifyInstance = simpleVerifyUUid(request)
    if (verifyInstance.result !== 1) return responseHanle.failure(verifyInstance.message)
    const uuid = verifyInstance.data

    const result = await service.auth.login({ password, uuid })
    responseHanle.json(result)
}

const refresh = async function refresh({ token }, responseHanle, request) {
    if (!token) return responseHanle.failure('token 不能为空')

    const verifyInstance = simpleVerifyUUid(request)
    if (verifyInstance.result !== 1) return responseHanle.failure(verifyInstance.message)
    const uuid = verifyInstance.data

    const result = await service.auth.refresh({ token, uuid })
    responseHanle.json(result)
}

const Tag = {
    post_auth_login: login,
    post_auth_refresh: refresh
}

export default Tag

