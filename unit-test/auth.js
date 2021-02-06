import service from './../service/auth'
import controller from './../controller/auth'
import config from './../config/development'
import StringHelper from './../utils/string-helper'

import utils from './utils'

const getPermission = async responseHanle => {
    const token = config.auth.value
    const permissionInstance = await service.getPermission({ token })
    responseHanle.json(permissionInstance)
}

const uuid = new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-')
const diffUUid = new Array(5).fill().map(() => StringHelper.createRandomStr({ length: 17 })).join('-')
const passwordFirst = StringHelper.createRandomStr({ length: 18 })
const passwordSecond = StringHelper.createRandomStr({ length: 18 })

const loginFirst = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = uuid
    controller.post_auth_login({ password: passwordFirst }, responseHanle, { headers })
}

const loginSecond = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = uuid
    controller.post_auth_login({ password: passwordSecond }, responseHanle, { headers })
}

const loginDifferentUsers = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = diffUUid
    controller.post_auth_login({ password: passwordFirst }, responseHanle, { headers })
}

const tags = {
    getPermission: utils.resolveHandle(getPermission, { isShowResult: false }),
    loginFirst: utils.resolveHandle(loginFirst, { isShowResult: false }),
    loginSecond: utils.resolveHandle(loginSecond, { isShowResult: false, expectedResultsCode: config.auth.loginFailure.code })
}

export default tags
