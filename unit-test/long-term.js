import controller from './../controller/long-term'

import utils from './utils'

const listAllLongTermTaskRelational = responseHanle => controller.get_longTerm_all({}, responseHanle)

const getLongTermTaskRelational = responseHanle => controller.get_longTerm_id({ id: 1 }, responseHanle)

const listAllLongTermRecordDetail = responseHanle => controller.get_longTerm_detail({ longTermRecordDetailCategoryId: 'f9981986834db83f0bb112b1d237611d596de57e' }, responseHanle)

const longTerm = {
    listAllLongTermTaskRelational: utils.resolveHandle(listAllLongTermTaskRelational, { isShowResult: false }),
    getLongTermTaskRelational: utils.resolveHandle(getLongTermTaskRelational, { isShowResult: false }),
    listAllLongTermRecordDetail: utils.resolveHandle(listAllLongTermRecordDetail, { isShowResult: false })
}

export default longTerm
