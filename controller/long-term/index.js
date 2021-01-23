/**
 * controller long term 对外方法: 所有方法对外
 */
import service from './../../service/index.js'

const listAllLongTermTaskRelational = function listAllLongTermTaskRelational(parameter, responseHanle) {
    service.longTerm()
        .then(
            result => responseHanle.json(result),
            error => responseHanle.json(error)
        )
}

const longTerm = {
    get_longTerm_all: listAllLongTermTaskRelational
}

export default longTerm

