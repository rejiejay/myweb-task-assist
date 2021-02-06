import consequencer from './../../utils/consequencer'
import config from './../../config'
import StringHelper from './../../utils/string-helper'
import TimeHelper from './../../utils/time-helper'
import ObjectHelper from './../../utils/object-helper'

/**
 * 权限
 * 因为不做多用户, 所以此处不需要用到数据库, 直接使用缓存数据即可
 */
let permissions = [
    // {
    //     token: '',
    //     expirationTimestamp: 1,
    // }
]

/**
 * 测试环下插入一个token
 */
if (process.env.NODE_ENV === 'development' && config.auth.value) permissions.push({ token: config.auth.value, expirationTimestamp: new Date(2099, 11, 17, 3, 24, 0).getTime() })

/**
 * 获取用户权限
 * @param {string} token 
 */
const getPermission = async function getPermission({ token }) {
    if (Object.prototype.toString.call(token) !== '[object String]') return consequencer.error(config.auth.unpermissions.message, config.auth.unpermissions.code)
    const simpleVerify = token.split('-')
    if (simpleVerify.length !== 5) return consequencer.error(config.auth.unpermissions.message, config.auth.unpermissions.code)

    for (let index = 0; index < simpleVerify.length; index++) {
        const tokenElement = simpleVerify[index]
        if (tokenElement.length !== 17) return consequencer.error(config.auth.unpermissions.message, config.auth.unpermissions.code)
    }

    /**
     * 过滤过期超过一天的数据，数据库的过期的时间小于昨天
     */
    const expirationDay = new Date().getTime() - TimeHelper.dayTimestamp
    permissions = permissions.filter(permission => permission.expirationTimestamp >= expirationDay)

    /**
     * 所有权限
     */
    const myPermission = permissions.filter(permission => permission.token === token)

    if (myPermission.length <= 0) return consequencer.error(config.auth.unpermissions.message, config.auth.unpermissions.code)
    const expirationTimestamp = myPermission[0].expirationTimestamp

    if (new Date().getTime() > expirationTimestamp) return consequencer.error(config.auth.expired.message, config.auth.expired.code)

    return consequencer.success(token)
}

const buildToken = () => new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-')

let user = {
    // uuid: {
    //     password,
    //     expiration, // 默认一周过期
    //     errorCount // 默认5次不允许
    // }
}
const login = async function login({ password, uuid }) {
    // 第一次登陆(必然是我)
    if (JSON.stringify(user) === '{}') {
        const token = buildToken()
        const expiration = new Date().getTime() + (TimeHelper.dayTimestamp * 7)
        user[uuid] = { password, expiration, errorCount: 0 }
        return consequencer.success(token)
    }

    // 不存在uuid -> 可能更换帐户 -> 校验密码
    if (!user[uuid]) {
        ObjectHelper.mapper(user).forEach((key, value) => {
            if (value.password === password) user[uuid] = JSON.parse(JSON.stringify(value))
        })

        if (!user[uuid]) return consequencer.error('不存在此帐户', config.auth.loginFailure.code)

        return consequencer.success(user[uuid].token)
    }

    const userInstance = user[uuid]

    if (userInstance.errorCount > 5) return consequencer.error('你已无法登录', config.auth.loginFailure.code)

    if (userInstance.password !== password) {
        userInstance.errorCount++
        return consequencer.error('密码错误', config.auth.loginFailure.code)
    }
}

const refresh = async function refresh(token) {}

const auth = {
    getPermission,
    login,
    refresh
}

export default auth
