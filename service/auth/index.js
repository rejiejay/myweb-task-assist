import config from './../../config'
import StringHelper from './../../utils/string-helper'
import TimeHelper from './../../utils/time-helper'

/**
 * 凭证 “缓存池”
 * 简单判断：BE通过判断“缓存池”是否存在凭证，可以简单判断是否有效
 * 进阶判断：BE通过凭证查找是否存在“数据库关联的用户信息”，进而判断是否有效
 */
let permissions = [
    // {
    //     userId: '', // 数据库关联的用户信息
    //     token: '',
    //     expiredTimestamp: 1,
    // }
]

/**
 * 测试环下插入一个token， 方便单元测试
 */
if (process.env.NODE_ENV === 'development' && config.auth.testUserId && config.auth.testToken) {
    permissions.push({
        userId: config.auth.testUserId,
        token: config.auth.testToken,
        expiredTimestamp: new Date(2099, 11, 17, 3, 24, 0).getTime()
    })
}

/**
 * 废弃过期超过一周的数据, 每天执行一次
 */
let executeClearExpiredPermissionsTimestamp = new Date().getTime() // 执行时间
const clearExpiredPermissions = () => {
    const nowTimestamp = new Date().getTime();

    /**
     * 当前时间超出执行时间1天, 执行一次清空操作
     */
    if (nowTimestamp > (executeClearExpiredPermissionsTimestamp + TimeHelper.dayTimestamp)) {
        // 执行时间设置为现在
        executeClearExpiredPermissionsTimestamp = nowTimestamp;
        // 已经过期的 permission 全部过滤掉
        permissions = permissions.filter(permission => permission.expiredTimestamp >= nowTimestamp)
    }
}

/**
 * 获取用户权限
 * For Auth 重复调用
 * @param {string} token 
 */
const getPermission = async function getPermission({ token }) {
    clearExpiredPermissions();

    const myPermission = permissions.find(permission => permission.token === token)

    if (!myPermission) {
        return new Error('token is not permission')
    }

    return myPermission
}

const addPermission = userId => {
    const token = buildToken()
    /**
     * 一周后过期
     */
    const expiredTimestamp = new Date().getTime() + TimeHelper.weekTimestamp
    const permission = { userId, token, expiredTimestamp }
    permissions.push(permission)
    return permission
}

const buildToken = () => new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-')

let loginTryRecords = []
let executeClearLoginTryRecordsTimestamp = new Date().getTime() // 执行时间
/**
 * 废弃过期超过一天的密码登录尝试, 每天执行一次
 */
const clearExpiredLoginTry = () => {
    const nowTimestamp = new Date().getTime();

    /**
     * 当前时间超出执行时间1天, 执行一次清空操作
     */
    if (nowTimestamp > (executeClearLoginTryRecordsTimestamp + TimeHelper.dayTimestamp)) {
        // 执行时间设置为现在
        executeClearLoginTryRecordsTimestamp = nowTimestamp;
        // 已经过期的 permission 全部过滤掉
        loginTryRecords = loginTryRecords.filter(loginTry => loginTry.expiredTimestamp >= nowTimestamp)
    }
}
let users = {
    '454766952@qq.com': {
        id: new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-'),
        password: 'DFqew1938167'
    },
}
const login = async function login({ account, password }) {
    clearExpiredLoginTry()

    const my = users[account]
    if (!my) {
        return new Error('account is nil')
    }

    const tryCount = loginTryRecords.filter(loginTry => loginTry.loginAccount === account).length
    if (tryCount > 15) {
        return new Error('You try login too many time, Please try again after tomorrow')
    }

    if (my.password !== password) {
        loginTryRecords.push({
            loginAccount: account,
            expiredTimestamp: new Date().getTime() + TimeHelper.dayTimestamp,
        })
        return new Error('账号密码错误')
    }

    const permission = addPermission(my.id)

    return permission.token
}

const auth = {
    getPermission,
    login,
}

export default auth
