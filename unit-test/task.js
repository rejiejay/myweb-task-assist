import controller from './../controller/task'

import utils from './utils'

/**
 * 目标: 测试页面进入请求
 */
const getTaskListWithDefault = responseHanle => controller.get_task_list({}, responseHanle)

const getTaskListWithRandom = responseHanle => controller.get_task_list({ isRandom: 'true' }, responseHanle)

/**
 * 测试分页
 */
const getTaskListWithPagination = responseHanle => controller.get_task_list({ pageNo: 1, pageSize: 15 }, responseHanle)

const getTaskListWithLongTerm = responseHanle => controller.get_task_list({ longTermId: 1 }, responseHanle)

const getTaskListWithTags = responseHanle => controller.get_task_list({ tags: JSON.stringify(['js']) }, responseHanle)

/**
 * 关于timestamp的逻辑
 * 1. 只选择min: 那么max必须强制设置为 year + 1
 * 2. 只选择max: 那么min必须强制设置为 year - 1
 * 3. 两个都选
 */
// 只能查出 1 条
const getTaskListWithTimestamp = responseHanle => controller.get_task_list({ minEffectTimestamp: `${new Date(2021, 2, 1, 0, 0).getTime()}`, maxEffectTimestamp: `${new Date(2021, 2, 9, 0, 0).getTime()}` }, responseHanle)
// 只能查出 2 条
const getTaskListWithMinTimestamp = responseHanle => controller.get_task_list({ maxEffectTimestamp: `${new Date(2021, 2, 4, 0, 0).getTime()}` }, responseHanle)
// 只能查出 1 条
const getTaskListWithMaxTimestamp = responseHanle => controller.get_task_list({ minEffectTimestamp: `${new Date(2021, 2, 6, 0, 0).getTime()}` }, responseHanle)

const task = {
    getTaskListWithDefault: utils.resolveHandle(getTaskListWithDefault, { isShowResult: false }),
    getTaskListWithRandom: utils.resolveHandle(getTaskListWithRandom, { isShowResult: false }),
    getTaskListWithPagination: utils.resolveHandle(getTaskListWithPagination, { isShowResult: false }),
    getTaskListWithLongTerm: utils.resolveHandle(getTaskListWithLongTerm, { isShowResult: false }),
    getTaskListWithTags: utils.resolveHandle(getTaskListWithTags, { isShowResult: false }),
    getTaskListWithTimestamp: utils.resolveHandle(getTaskListWithTimestamp, { isShowResult: false }),
    getTaskListWithMinTimestamp: utils.resolveHandle(getTaskListWithMinTimestamp, { isShowResult: true }),
    getTaskListWithMaxTimestamp: utils.resolveHandle(getTaskListWithMaxTimestamp, { isShowResult: true })
}

export default task
