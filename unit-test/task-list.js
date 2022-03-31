import controller from './../controller/task-list'

import utils from './utils'

const getAllTaskByUnCategorized = responseHanle => controller.get_task_list_un_categorized({ pageNo: 1 }, responseHanle)

const getPreviewTaskByQuickRecall = responseHanle => controller.get_task_preview_quick_recall({}, responseHanle)

const getAllTaskByUpdateTimestamp = responseHanle => controller.get_task_list_update_timestamp({ pageNo: 1 }, responseHanle)

const getAllTaskByReadCount = responseHanle => controller.get_task_list_read_count({ pageNo: 1 }, responseHanle)

const getPreviewTaskByQuickTimeClassify = responseHanle => controller.get_task_preview_quick_time_classify({}, responseHanle)
const getPreviewTaskByQuickTimeClassifyCache = responseHanle => controller.get_task_preview_quick_time_classify({}, responseHanle)

const getAllTaskByTimestamp = responseHanle => controller.get_task_list_time({
    minTimestamp: new Date().getTime()
}, responseHanle)

const getCompletedTasks = responseHanle => controller.get_task_list_completed({ pageNo: 1 }, responseHanle)

const getRandomlyTasks = responseHanle => controller.get_task_list_randomly({}, responseHanle)

const taskList = {
    getAllTaskByUnCategorized: utils.resolveHandle(getAllTaskByUnCategorized, { isShowResult: false }),
    getPreviewTaskByQuickRecall: utils.resolveHandle(getPreviewTaskByQuickRecall, { isShowResult: false }),
    getAllTaskByUpdateTimestamp: utils.resolveHandle(getAllTaskByUpdateTimestamp, { isShowResult: false }),
    getAllTaskByReadCount: utils.resolveHandle(getAllTaskByReadCount, { isShowResult: false }),
    getPreviewTaskByQuickTimeClassify: utils.resolveHandle(getPreviewTaskByQuickTimeClassify, { isShowResult: false }),
    getPreviewTaskByQuickTimeClassifyCache: utils.resolveHandle(getPreviewTaskByQuickTimeClassifyCache, { isShowResult: false }),
    getAllTaskByTimestamp: utils.resolveHandle(getAllTaskByTimestamp, { isShowResult: false }),
    getCompletedTasks: utils.resolveHandle(getCompletedTasks, { isShowResult: false }),
    getRandomlyTasks: utils.resolveHandle(getRandomlyTasks, { isShowResult: false }),
}

export default taskList
