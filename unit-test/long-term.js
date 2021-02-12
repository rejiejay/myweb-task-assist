import controller from './../controller/long-term'

import utils from './utils'

const listAllLongTermTaskRelational = responseHanle => controller.get_longTerm_all({}, responseHanle)

const getLongTermTaskRelational = responseHanle => controller.get_longTerm_id({ id: 1 }, responseHanle)

const longTerm = {
    listAllLongTermTaskRelational: utils.resolveHandle(listAllLongTermTaskRelational, { isShowResult: false }),
    getLongTermTaskRelational: utils.resolveHandle(getLongTermTaskRelational, { isShowResult: false }),
}

export default longTerm
