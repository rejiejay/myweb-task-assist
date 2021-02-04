import service from './../service/auth'
import config from './../config/development'

import utils from './utils'

const getPermission = async responseHanle => {
    const token = config.auth.value
    const permissionInstance = await service.getPermission({ token })
    responseHanle.json(permissionInstance)
}

const tags = {
    getPermission: utils.resolveHandle(getPermission, { isShowResult: false })
}

export default tags
