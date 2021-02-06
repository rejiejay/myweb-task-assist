import config from './../../configs'
import Storage from './../../components/storage'

const optionalHeaders = () => {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })

    const { uuidKey, uuid } = Storage.auth.getUUID()
    headers.append(uuidKey, uuid)

    const tokenKey = config.auth.headerToken
    const tokenVal = Storage.auth.getToken()

    if (!!tokenVal) headers.append(tokenKey, tokenVal)

    return headers
}

export default optionalHeaders
