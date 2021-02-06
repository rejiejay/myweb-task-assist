import config from './../../configs'
import StringHelper from './../../../utils/string-helper'

const tokenKey = config.auth.headerToken
const uuidKey = config.auth.uuid

const getToken = () => {
    const tokenVal = window.localStorage.getItem(tokenKey)
    if (tokenVal && tokenVal !== 'null') return tokenVal
    return ''
}

const setToken = token => window.localStorage.setItem(tokenKey, token)

const getUUID = () => {
    let uuid = window.localStorage.getItem(uuidKey)
    if (uuid && uuid !== 'null') return { uuidKey, uuid }

    uuid = new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-')
    window.localStorage.setItem(uuidKey, uuid)

    return {
        uuidKey,
        uuid
    }
}

const auth = {
    getToken,
    setToken,
    getUUID
}

export default auth