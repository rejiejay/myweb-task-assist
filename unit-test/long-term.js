import controller from './../controller/long-term'
import service from './../service/long-term'

import utils from './utils'

let longTermId = ''

const getAllLongTerm = responseHanle => controller.get_long_term_all({}, responseHanle)
const getLongTermByPagination = responseHanle => controller.get_long_term_pagination({}, responseHanle)
const addLongTerm = async responseHanle => {
    const name = 'name'
    const result = await service.addHandle(name)
    if (result instanceof Error) return responseHanle.failure(result.message)

    longTermId = result.id
    controller.post_long_term_add({ name }, responseHanle)
}
const getLongTermDetailById = responseHanle => controller.get_long_term_id({ id: longTermId }, responseHanle)
const editLongTerm = responseHanle => controller.post_long_term_edit({ id: longTermId, name: 'new' }, responseHanle)
const setLongTermToTop = responseHanle => controller.post_long_term_to_top({ id: longTermId }, responseHanle)
const deleteLongTerm = responseHanle => controller.post_long_term_delete({ id: longTermId }, responseHanle)

const longTerm = {
    getAllLongTerm: utils.resolveHandle(getAllLongTerm, { isShowResult: false }),
    getLongTermByPagination: utils.resolveHandle(getLongTermByPagination, { isShowResult: false }),
    addLongTerm: utils.resolveHandle(addLongTerm, { isShowResult: false }),
    getLongTermDetailById: utils.resolveHandle(getLongTermDetailById, { isShowResult: false }),
    editLongTerm: utils.resolveHandle(editLongTerm, { isShowResult: false }),
    setLongTermToTop: utils.resolveHandle(setLongTermToTop, { isShowResult: false }),
    deleteLongTerm: utils.resolveHandle(deleteLongTerm, { isShowResult: false }),
}

export default longTerm
