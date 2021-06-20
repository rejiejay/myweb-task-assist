import consts from './../library/consts'

const auth = {
    headerToken: 'task-assist-v5-token',
    uuid: 'universally-unique-identifier',
    url: {
       login: 'auth/login',
        refresh: 'auth/refresh',   
    },
    loginFailure: {
        code: consts.code.loginFailure,
        message: '登录失败'
    },
    /**
     * 该用户没有权限：表示 压根就不存在cdoe
     */
    unauthorized: {
        code: consts.code.unauthorized,
        message: '该用户没有权限'
    },
    /**
     * 权限错误：表示 存在 code, 但是 code 是错误的, 或则时间太久了丢失了(1 day)
     */
    unpermissions: {
        code: consts.code.unpermissions,
        message: '权限错误'
    },
    /**
     * 权限过期：表示 存在 code, 并且 code 是正确的, 并且在一天内还未过期
     */
    expired: {
        code: consts.code.expired,
        message: '权限过期'
    }
}

export default auth
