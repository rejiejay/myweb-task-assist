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
 * local.database.sqlite 3条数据: (3-5) (6-8) (1-10)
 */
// 只选择min = 9、只能查出 3 条：(3-5) (6-8) (1-10)、因为所有时间段都存在小于9
const getTaskListWithMinTimestamp = responseHanle => controller.get_task_list({ minEffectTimestamp: `${new Date(2000, 1, 9, 0, 0).getTime()}` }, responseHanle)
// 只选择max = 4、只能查出 2 条：(3-5) (1-10)、因为(6-8)查不出来
const getTaskListWithMaxTimestamp = responseHanle => controller.get_task_list({ maxEffectTimestamp: `${new Date(2000, 1, 4, 0, 0).getTime()}` }, responseHanle)
// 两个都选 = (9-10)、只能查出 1 条：(1-10)、因为(3-5) (6-8) 都不在范围(9-10)
const getTaskListWithTimestamp = responseHanle => controller.get_task_list({ minEffectTimestamp: `${new Date(2000, 1, 9, 0, 0).getTime()}`, maxEffectTimestamp: `${new Date(2000, 1, 10, 0, 0).getTime()}` }, responseHanle)

const task = {
    getTaskListWithDefault: utils.resolveHandle(getTaskListWithDefault, { isShowResult: false }),
    getTaskListWithRandom: utils.resolveHandle(getTaskListWithRandom, { isShowResult: false }),
    getTaskListWithPagination: utils.resolveHandle(getTaskListWithPagination, { isShowResult: false }),
    getTaskListWithLongTerm: utils.resolveHandle(getTaskListWithLongTerm, { isShowResult: false }),
    getTaskListWithTags: utils.resolveHandle(getTaskListWithTags, { isShowResult: false }),
    getTaskListWithMinTimestamp: utils.resolveHandle(getTaskListWithMinTimestamp, { isShowResult: true }),
    getTaskListWithMaxTimestamp: utils.resolveHandle(getTaskListWithMaxTimestamp, { isShowResult: true }),
    getTaskListWithTimestamp: utils.resolveHandle(getTaskListWithTimestamp, { isShowResult: true }),
}

export default task
