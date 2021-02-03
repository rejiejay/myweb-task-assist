import consts from './../library/consts'

const auth = {
    headerToken: 'task-assist-v4-token',
    unauthorized: {
        code: consts.code.unauthorized,
        message: '该用户没有权限'
    },
    unpermissions: {
        code: consts.code.unpermissions,
        message: '权限错误'
    }
}

export default auth
