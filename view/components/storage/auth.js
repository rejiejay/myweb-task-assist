import config from './../../configs'

const tokenKey = config.auth.headerToken

const getToken = () => {
    const tokenVal = localStorage.getItem(tokenKey)
    if (tokenVal && tokenVal !== 'null') return tokenVal
    return ''
}

const setToken = token => {
    if (token) localStorage.setItem(tokenKey, token)
}

const auth = {
    getToken,
    setToken
}

export default auth