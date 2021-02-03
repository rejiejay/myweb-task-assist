import config from './../../configs'

const optionalHeaders = () => {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
    const tokenKey = config.auth.headerToken
    const tokenVal = localStorage.getItem(tokenKey)

    if (!!tokenVal) headers.append(tokenKey, tokenVal)

    return headers
}

export default optionalHeaders
