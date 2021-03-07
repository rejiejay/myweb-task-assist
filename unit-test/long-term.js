import controller from './../controller/long-term'

import utils from './utils'

const listAllLongTermTaskRelational = responseHanle => controller.get_longTerm_all({}, responseHanle)

const getLongTermTaskRelational = responseHanle => controller.get_longTerm_id({ id: 1 }, responseHanle)

const listAllLongTermRecordDetail = responseHanle => controller.get_longTerm_detail({ longTermRecordDetailCategoryId: 'f9981986834db83f0bb112b1d237611d596de57e' }, responseHanle)

const editLongTermRecordDetail = responseHanle => controller.post_longTerm_detail_edit({
  id: 1,
  categoryIdentify: 'f9981986834db83f0bb112b1d237611d596de57e',
  uniquelyIdentify: 'b063cf3b653b3230a7c08a283bef69a4c1b60170',
  parentUniquelyIdentify: 'f9981986834db83f0bb112b1d237611d596de57e',
  createTimestamp: new Date(2021, 2, 1, 0, 0).getTime(),
  detail: 'update root'
}, responseHanle)

const deleteLongTermRecordDetail = responseHanle => controller.post_longTerm_detail_delete({ id: 1 }, responseHanle)

const addLongTermRecordDetail = responseHanle => controller.post_longTerm_detail_add({
  categoryIdentify: 'f9981986834db83f0bb112b1d237611d596de57a',
  parentUniquelyIdentify: 'f9981986834db83f0bb112b1d237611d596de52e'
}, responseHanle)

const editLongTermTaskRelational = responseHanle => controller.post_longTerm_relational_edit({
  id: 1,
  title: 'update editLongTermTaskRelational',
  record: 'update editLongTermTaskRelational'
}, responseHanle)

const longTerm = {
  listAllLongTermTaskRelational: utils.resolveHandle(listAllLongTermTaskRelational, { isShowResult: false }),
  getLongTermTaskRelational: utils.resolveHandle(getLongTermTaskRelational, { isShowResult: false }),
  listAllLongTermRecordDetail: utils.resolveHandle(listAllLongTermRecordDetail, { isShowResult: false }),
  editLongTermRecordDetail: utils.resolveHandle(editLongTermRecordDetail, { isShowResult: false }),
  deleteLongTermRecordDetail: utils.resolveHandle(deleteLongTermRecordDetail, { isShowResult: false }),
  addLongTermRecordDetail: utils.resolveHandle(addLongTermRecordDetail, { isShowResult: false }),
  editLongTermTaskRelational: utils.resolveHandle(editLongTermTaskRelational, { isShowResult: false })
}

export default longTerm