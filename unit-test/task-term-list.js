import controller from '../controller/task-term-list'
import longTermList from '../service/long-term/list'
import longTermProgramService from '../service/long-term-program/index'

import utils from './utils'

let longTermId = ''

const getPreviewTaskByLongTermQuickRecall = responseHanle => controller.get_task_long_term_preview_quick_recall({}, responseHanle)
const getPreviewTaskByAllLongTerm = responseHanle => controller.get_task_long_term_preview_classify_long_term({}, responseHanle)
const getAllTaskByLongTermUnCategorized = async responseHanle => {
    const result = await longTermList.getAll()
    if (result instanceof Error) return responseHanle.failure(result.message)

    if (result.length === 0) {
        return responseHanle.success(result)
    }

    longTermId = result[0].id

    controller.get_task_long_term_list_un_categorized({ longTermId }, responseHanle)
}
const getAllTaskByLongTermPrograms = responseHanle => {
    if (!longTermId) return responseHanle.success(longTermId)
    controller.get_task_long_term_list_programs({ longTermId }, responseHanle)
}

const getTaskByLongTermUnCategorizedPagination = async responseHanle => {
    if (!longTermId) return responseHanle.success(longTermId)
    controller.get_task_long_term_pagination_un_categorized({ longTermId }, responseHanle)
}

const getTaskByLongTermProgramPagination = async responseHanle => {
    if (!longTermId) return responseHanle.success(longTermId)
    const longTermProgram = await longTermProgramService.addHandle(longTermId, 'name')
    if (longTermProgram instanceof Error) return responseHanle.failure(longTermProgram.message)
    const longTermProgramId = longTermProgram.id

    controller.get_task_long_term_list_programs({ longTermId, longTermProgramId }, responseHanle)
}

const taskTermList = {
    getPreviewTaskByLongTermQuickRecall: utils.resolveHandle(getPreviewTaskByLongTermQuickRecall, { isShowResult: false }),
    getPreviewTaskByAllLongTerm: utils.resolveHandle(getPreviewTaskByAllLongTerm, { isShowResult: false }),
    getAllTaskByLongTermUnCategorized: utils.resolveHandle(getAllTaskByLongTermUnCategorized, { isShowResult: false }),
    getAllTaskByLongTermPrograms: utils.resolveHandle(getAllTaskByLongTermPrograms, { isShowResult: false }),
    getTaskByLongTermUnCategorizedPagination: utils.resolveHandle(getTaskByLongTermUnCategorizedPagination, { isShowResult: false }),
    getTaskByLongTermProgramPagination: utils.resolveHandle(getTaskByLongTermProgramPagination, { isShowResult: false }),
}

export default taskTermList
