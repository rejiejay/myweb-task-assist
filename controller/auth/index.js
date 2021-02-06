/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import config from './../../config'

const login = async function login({ password }, responseHanle, request) {
    const headers = request.headers
    const uuid = headers[config.auth.uuid]
    if (!password) return responseHanle.failure('password 不能为空')
    if (!uuid) return responseHanle.failure('非法登陆')
    if (Object.prototype.toString.call(uuid) !== '[object String]') return responseHanle.failure('非法登陆')
    const simpleVerify = uuid.split('-')
    if (simpleVerify.length !== 5) return responseHanle.failure('非法登陆')

    for (let index = 0; index < simpleVerify.length; index++) {
        const uuidElement = simpleVerify[index]
        if (uuidElement.length !== 17) return responseHanle.failure('非法登陆')
    }

    const result = await service.auth.login({ password, uuid })
    responseHanle.json(result)
}

const refresh = async function refresh({ token }, responseHanle, request) {
    if (!token) return responseHanle.failure('token 不能为空')

    const result = await service.auth.refresh(token)
    responseHanle.json(result)
}

const Tag = {
    post_auth_login: login,
    post_auth_refresh: refresh
}

export default Tag

