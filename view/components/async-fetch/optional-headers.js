import config from './../../configs'
import Storage from './../../components/storage'

const optionalHeaders = () => {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })

    const { uuidKey, uuid } = Storage.auth.getUUID()
    headers.append(uuidKey, uuid)

    const tokenKey = config.auth.headerToken
    const tokenVal = Storage.auth.getToken()

    /**
     * 如果需要测试登录, 可以将此行代码删除掉
     */
    if (process.env === 'development') {
        headers.append(tokenKey, config.auth.value)
        return headers
    }

    if (!!tokenVal) headers.append(tokenKey, tokenVal)

    return headers
}

export default optionalHeaders
