
import consequencer from './../../utils/consequencer'
import service from './../../service'
import config from './../../config'

const authHandle = async request => {
    const { headers, method, url } = request

    if (method !== 'POST') return consequencer.success()
    // 这两个登陆的方法是不需要请求授权的
    if (url === `/${config.auth.url.login}` || url === `/${config.auth.url.refresh}`) return consequencer.success()

    const token = headers[config.auth.headerToken]
    if (!token) return consequencer.error(config.auth.unauthorized.message, config.auth.unauthorized.code)

    const permissionInstance = await service.auth.getPermission({ token })
    return permissionInstance
}

export default authHandle
