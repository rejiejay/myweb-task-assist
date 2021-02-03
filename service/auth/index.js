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
if (process.env.NODE_ENV === 'development') permissions.push({ token: '1938167', expirationTimestamp: new Date(2099, 11, 17, 3, 24, 0).getTime() })

/**
 * 获取用户权限
 * @param {string} token 
 */
const getPermission = async function getList({ token }) {
    /**
     * 过滤过期超过一天的数据
     */
    const expirationDay = new Date().getTime() + (1000 * 60 * 60 * 24)
    permissions = permissions.filter(permission => permission.expirationTimestamp <= expirationDay)

    /**
     * 所有权限
     */
    const myPermission = permissions.filter(permission => permission.token === token)

    if (myPermission.length <= 0) return consequencer.error(config.auth.unauthorized.code, config.auth.unauthorized.message)
    const expirationTimestamp = myPermission[myPermission].expirationTimestamp

    if (new Date().getTime() > expirationTimestamp) return consequencer.error(config.auth.unpermissions.code, config.auth.unpermissions.message)

    return consequencer.success()
}

const auth = {
    getPermission
}

export default auth
