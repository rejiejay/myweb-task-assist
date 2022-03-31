/**
 * controller Auth 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import config from './../../config'

const login = async function login({ account, password }, responseHanle, request) {
    if (!account) return responseHanle.failure('account 不能为空')
    if (!password) return responseHanle.failure('password 不能为空')

    const result = await service.auth.login({ account, password })
    if (result instanceof Error) {
        return responseHanle.failure(result.message, config.auth.loginFailure.code)
    }
    responseHanle.success(result)
}

const Auth = {
    post_auth_login: login,
}

export default Auth

