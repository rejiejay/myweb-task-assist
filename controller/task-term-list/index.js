import _ from 'lodash'

import valuesStructuresVerify from './../../utils/values-structures-verify'

import taskLongTermList from './../../service/task/long-term'
import longTermList from './../../service/long-term/list'
import longTermProgramList from './../../service/long-term-program/list'

/**
 * 获取8个快速回忆的 longTerm 任务
 */
const getPreviewTaskByLongTermQuickRecall = async ({ }, responseHanle) => {
    const mostly = await taskLongTermList.getBySort('updateTimestamp')
    if (mostly instanceof Error) return responseHanle.failure(mostly.message);

    const recently = await taskLongTermList.getBySort('readCount')
    if (recently instanceof Error) return responseHanle.failure(recently.message);

    responseHanle.success({
        count: mostly.count,
        mostly: mostly.find,
        recently: recently.find
    })
}

/**
 * 获取所有 longTerm
 * 再换 获取所有 longTerm 下8个 longTerm 任务
 */
const getPreviewTaskByAllLongTerm = async ({ }, responseHanle) => {
    const longTerm = await longTermList.getAll()
    if (longTerm instanceof Error) return responseHanle.failure(longTerm.message);

    const result = []

    for (let index = 0; index < longTerm.length; index++) {
        const element = longTerm[index];
        const all = await taskLongTermList.getByLongTermPreview(element.id)
        if (all instanceof Error) return responseHanle.failure(all.message);

        result.push({
            ...element,
            data: all
        })
    }

    responseHanle.success(result)
}

/**
 * 获取所有 longTerm 下所有 未分类的 longTerm 任务
 */
const getAllTaskByLongTermUnCategorized = async ({ longTermId }, responseHanle) => {
    const result = await taskLongTermList.getByUnCategorized(longTermId)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

/**
 * 获取所有 longTerm 下的所有 programs
 * 再换 获取所有 longTerm 下所有 longTerm 任务
 */
const getAllTaskByLongTermPrograms = async ({ longTermId }, responseHanle) => {
    const longTermProgram = await longTermProgramList.getAll(longTermId)
    if (longTermProgram instanceof Error) return responseHanle.failure(longTermProgram.message);

    const result = []

    for (let index = 0; index < longTermProgram.length; index++) {
        const element = longTermProgram[index];
        const all = await taskLongTermList.getByLongTermProgram(longTermId, element.id)
        if (all instanceof Error) return responseHanle.failure(all.message);

        result.push({
            ...element,
            data: all
        })
    }

    responseHanle.success(result)
}

const getTaskByLongTermUnCategorizedPagination = async (query, responseHanle) => {
    let longTermId = _.get(query, 'longTermId', '');
    let pageNo = _.get(query, 'pageNo', '1');
    let pageSize = _.get(query, 'pageSize', '8');

    const longTermIdVerify = valuesStructuresVerify.isStringNil(longTermId, 'longTermId')
    if (longTermIdVerify instanceof Error) return responseHanle.failure(longTermIdVerify.message);

    const pageNoVerify = valuesStructuresVerify.isIntNumString(pageNo, 'pageNo')
    if (pageNoVerify instanceof Error) return pageNoVerify
    pageNo = +pageNo

    const pageSizeVerify = valuesStructuresVerify.isIntNumString(pageSize, 'pageSize')
    if (pageSizeVerify instanceof Error) return pageSizeVerify
    pageSize = +pageSize

    const result = await taskLongTermList.getByUnCategorizedPagination(longTermId, pageNo, pageSize)
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const getTaskByLongTermProgramPagination = async (query, responseHanle) => {
    let longTermId = _.get(query, 'longTermId', '');
    let longTermProgramId = _.get(query, 'longTermProgramId', '');
    let pageNo = _.get(query, 'pageNo', '1');
    let pageSize = _.get(query, 'pageSize', '8');

    const longTermIdVerify = valuesStructuresVerify.isStringNil(longTermId, 'longTermId')
    if (longTermIdVerify instanceof Error) return responseHanle.failure(longTermIdVerify.message);

    const longTermProgramIdVerify = valuesStructuresVerify.isStringNil(longTermProgramId, 'longTermProgramId')
    if (longTermProgramIdVerify instanceof Error) return responseHanle.failure(longTermProgramIdVerify.message);

    const pageNoVerify = valuesStructuresVerify.isIntNumString(pageNo, 'pageNo')
    if (pageNoVerify instanceof Error) return pageNoVerify
    pageNo = +pageNo

    const pageSizeVerify = valuesStructuresVerify.isIntNumString(pageSize, 'pageSize')
    if (pageSizeVerify instanceof Error) return pageSizeVerify
    pageSize = +pageSize

    const result = await taskLongTermList.getByLongTermProgramPagination(
        longTermId,
        longTermProgramId,
        pageNo,
        pageSize)

    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const TaskTermList = {
    get_task_long_term_preview_quick_recall: getPreviewTaskByLongTermQuickRecall,
    get_task_long_term_preview_classify_long_term: getPreviewTaskByAllLongTerm,

    get_task_long_term_list_un_categorized: getAllTaskByLongTermUnCategorized,
    get_task_long_term_list_programs: getAllTaskByLongTermPrograms,

    get_task_long_term_pagination_un_categorized: getTaskByLongTermUnCategorizedPagination,
    get_task_long_term_pagination_programs: getTaskByLongTermProgramPagination,
}

export default TaskTermList