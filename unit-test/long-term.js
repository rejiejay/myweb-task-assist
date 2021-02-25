import controller from './../controller/long-term'

import utils from './utils'

const listAllLongTermTaskRelational = responseHanle => controller.get_longTerm_all({}, responseHanle)

const getLongTermTaskRelational = responseHanle => controller.get_longTerm_id({ id: 1 }, responseHanle)

const listAllLongTermRecordDetail = responseHanle => controller.get_longTerm_detail({ longTermRecordDetailCategoryId: 'f9981986834db83f0bb112b1d237611d596de57e' }, responseHanle)

const editLongTermRecordDetail = responseHanle => controller.post_longTerm_detail_edit({ id: 1, detail: 'update root' }, responseHanle)

const deleteLongTermRecordDetail = responseHanle => controller.post_longTerm_detail_delete({ id: 1 }, responseHanle)

const longTerm = {
    listAllLongTermTaskRelational: utils.resolveHandle(listAllLongTermTaskRelational, { isShowResult: false }),
    getLongTermTaskRelational: utils.resolveHandle(getLongTermTaskRelational, { isShowResult: false }),
    listAllLongTermRecordDetail: utils.resolveHandle(listAllLongTermRecordDetail, { isShowResult: false }),
    editLongTermRecordDetail: utils.resolveHandle(editLongTermRecordDetail, { isShowResult: false }),
    deleteLongTermRecordDetail: utils.resolveHandle(deleteLongTermRecordDetail, { isShowResult: false })
}

export default longTerm
