
import service from './../../service'
import config from './../../config'
import { authHandleWithTokenSignature } from './../../utils/signature-helper'

const authHandle = async request => {
    const { headers, method, url } = request

    // 一般而言: get 请求不需要授权
    if (method === 'GET') return true

    // 这登陆的方法是不需要请求授权的
    if (url === `/${config.auth.url.login}`) {
        return true
    }

    const token = headers['token']
    const signature = headers['signature']
    const result = authHandleWithTokenSignature(signature, token)
    if (result instanceof Error) {
        return result
    }

    return await service.auth.getPermission({ token })
}

export default authHandle
