import service from './../service/auth'
import controller from './../controller/auth'
import config from './../config/development'
import StringHelper from './../utils/string-helper'

import utils from './utils'

const token = config.auth.value
const getPermission = async responseHanle => {
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

const loginSecondErrorPassword = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = uuid
    controller.post_auth_login({ password: passwordSecond }, responseHanle, { headers })
}

const loginDifferentUsers = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = diffUUid
    controller.post_auth_login({ password: passwordFirst }, responseHanle, { headers })
}

const loginDifferentUsersErrorPassword = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = diffUUid
    controller.post_auth_login({ password: passwordSecond }, responseHanle, { headers })
}

const loginSecondDifferentUsers = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = diffUUid
    controller.post_auth_login({ password: passwordFirst }, responseHanle, { headers })
}

const refreshToken = responseHanle => {
    let headers = {}
    headers[config.auth.uuid] = diffUUid
    controller.post_auth_refresh({ token }, responseHanle, { headers })
}

const tags = {
    getPermission: utils.resolveHandle(getPermission, { isShowResult: false }),
    loginFirst: utils.resolveHandle(loginFirst, { isShowResult: false }),
    loginSecondErrorPassword: utils.resolveHandle(loginSecondErrorPassword, { isShowResult: false, expectedResultsCode: config.auth.loginFailure.code }),
    loginDifferentUsers: utils.resolveHandle(loginDifferentUsers, { isShowResult: false, }),
    loginDifferentUsersErrorPassword: utils.resolveHandle(loginDifferentUsersErrorPassword, { isShowResult: false, expectedResultsCode: config.auth.loginFailure.code }),
    loginSecondDifferentUsers: utils.resolveHandle(loginSecondDifferentUsers, { isShowResult: false }),
    refreshToken: utils.resolveHandle(refreshToken, { isShowResult: false })
}

export default tags
