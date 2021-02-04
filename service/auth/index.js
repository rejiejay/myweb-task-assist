import consequencer from './../../utils/consequencer'
import config from './../../config'

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
    const expirationDay = new Date().getTime() - (1000 * 60 * 60 * 24)
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

const auth = {
    getPermission
}

export default auth
