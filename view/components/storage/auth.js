import StringHelper from './../../utils/string-helper'
import { encryptTokenToSignature } from './../../../utils/signature-helper'

/**
 * 因为担心localStorage存在并发的问题, 所以使用 cache token
 */
const localStorageTokenKey = 'task-token' // 因为是在同个网站下, 所以要有区别
let cacheToken = ''
export const getToken = () => {
    const token = window.localStorage.getItem(localStorageTokenKey)
    if (!!cacheToken) {
        return cacheToken
    }
    if (token && token !== 'null') {
        cacheToken = token
        return token
    }
    return ''
}

export const setToken = token => {
    cacheToken = token
    window.localStorage.setItem(localStorageTokenKey, token)
}

export const getUUID = () => {
    let uuid = window.localStorage.getItem('device-uuid')
    if (!!uuid && uuid !== 'null') return uuid

    uuid = new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-')
    window.localStorage.setItem('device-uuid', uuid)

    return uuid
}

export const getSignature = () => {
    const token = getToken()
    return encryptTokenToSignature(token)
}

const auth = {
    getToken,
    setToken,
    getUUID,
    getSignature
}

export default auth