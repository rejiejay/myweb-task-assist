import controller from './../controller/long-term-program'
import service from './../service/long-term-program'

import utils from './utils'

let longTermProgramId = ''
const longTermId = 'longTermId'

const addLongTermProgram = async responseHanle => {
    const name = 'name'
    const result = await service.addHandle(longTermId, name)
    if (result instanceof Error) return responseHanle.failure(result.message)

    longTermProgramId = result.id
    controller.post_long_term_program_add({ longTermId, name }, responseHanle)
}
const getAllLongTermProgram = async responseHanle => controller.get_long_term_program_list({ longTermId }, responseHanle)
const editLongTermProgram = responseHanle => controller.post_long_term_program_edit({ id: longTermProgramId, name: 'new' }, responseHanle)
const setLongTermProgramToTop = responseHanle => controller.post_long_term_program_to_top({ id: longTermProgramId }, responseHanle)
const deleteLongTermProgram = responseHanle => controller.post_long_term_program_delete({ id: longTermProgramId }, responseHanle)

const longTermProgram = {
    addLongTermProgram: utils.resolveHandle(addLongTermProgram, { isShowResult: false }),
    getAllLongTermProgram: utils.resolveHandle(getAllLongTermProgram, { isShowResult: false }),
    editLongTermProgram: utils.resolveHandle(editLongTermProgram, { isShowResult: false }),
    setLongTermProgramToTop: utils.resolveHandle(setLongTermProgramToTop, { isShowResult: false }),
    deleteLongTermProgram: utils.resolveHandle(deleteLongTermProgram, { isShowResult: false }),
}

export default longTermProgram
