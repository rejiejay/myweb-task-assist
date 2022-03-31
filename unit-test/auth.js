import service from './../service/auth'
import controller from './../controller/auth'

import utils from './utils'

const account = '454766952@qq.com'
const password = 'DFqew1938167'
let token = ''

const httpLogin = responseHanle => {
    let headers = {}
    controller.post_auth_login({ account, password }, responseHanle, { headers })
}

const serviceLogin = async responseHanle => {
    const result = await service.login({ account, password })
    if (result instanceof Error) {
        return responseHanle.failure(result.message)
    }
    token = result;
    responseHanle.success(result);
}

const getPermission = async responseHanle => {
    const result = await service.getPermission({ token })
    if (result instanceof Error) {
        return responseHanle.failure(result.message)
    }
    responseHanle.success(result);
}

const auth = {
    httpLogin: utils.resolveHandle(httpLogin, { isShowResult: false }),
    serviceLogin: utils.resolveHandle(serviceLogin, { isShowResult: false }),
    getPermission: utils.resolveHandle(getPermission, { isShowResult: false }),
}

export default auth
