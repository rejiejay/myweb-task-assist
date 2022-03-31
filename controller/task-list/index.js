import serviceTaskList from './../../service/task/list'
import valuesStructuresVerify from './../../utils/values-structures-verify'

import verify from './verify.js'
import taskListTag from './tag'

const getAllTaskByUnCategorized = async (parameter, responseHanle) => {
    const verifyInstance = verify.filterParameter(parameter)
    if (verifyInstance instanceof Error) return responseHanle.failure(verifyInstance.message);
    const { pageNo, tag, progress, priority, pageSize } = verifyInstance

    const result = await serviceTaskList.getByUnCategorized(pageNo, tag, progress, priority, pageSize)
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const getPreviewTaskByQuickRecall = async ({ }, responseHanle) => {
    const recentlyResult = await serviceTaskList.getBySort('updateTimestamp')
    if (recentlyResult instanceof Error) return responseHanle.failure(recentlyResult.message);

    const mostlyResult = await serviceTaskList.getBySort('readCount')
    if (mostlyResult instanceof Error) return responseHanle.failure(mostlyResult.message);

    responseHanle.success({
        count: mostlyResult.count,
        mostly: mostlyResult.find,
        recently: recentlyResult.find,
    })
}

const getAllTaskByUpdateTimestamp = async (parameter, responseHanle) => {
    const verifyInstance = verify.filterParameter(parameter)
    if (verifyInstance instanceof Error) return responseHanle.failure(verifyInstance.message);
    const { pageNo, tag, progress, priority, pageSize } = verifyInstance

    const result = await serviceTaskList.getBySort('updateTimestamp', pageNo, tag, progress, priority, pageSize)
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const getAllTaskByReadCount = async (parameter, responseHanle) => {
    const verifyInstance = verify.filterParameter(parameter)
    if (verifyInstance instanceof Error) return responseHanle.failure(verifyInstance.message);
    const { pageNo, tag, progress, priority, pageSize } = verifyInstance

    const result = await serviceTaskList.getBySort('readCount', pageNo, tag, progress, priority, pageSize)
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

let executePreviewTaskByQuickTimeClassifyTimestamp = new Date().getTime() // 执行时间
let cacheQuickTimeClassify = []
const clearQuickTimeClassify = () => {
    const nowTimestamp = new Date().getTime();
    const minutTimestamp = 1000 * 60
    const expiredTimestamp = executePreviewTaskByQuickTimeClassifyTimestamp + (minutTimestamp * 10)

    /**
     * 当前时间超出执行时间10分钟, 执行一次清空缓存操作
     */
    if (nowTimestamp > expiredTimestamp) {
        // 执行时间设置为现在
        executePreviewTaskByQuickTimeClassifyTimestamp = nowTimestamp;
        // 已经过期的 QuickTimeClassify 全部过滤掉
        cacheQuickTimeClassify = []
    }
}
const getPreviewTaskByQuickTimeClassify = async ({ }, responseHanle) => {
    clearQuickTimeClassify()
    if (cacheQuickTimeClassify.length > 0) {
        return responseHanle.success(cacheQuickTimeClassify)
    }

    const nowTimestamp = new Date().getTime()
    const minutTimestamp = 1000 * 60
    const hourTimestamp = minutTimestamp * 60
    const dayTimestamp = hourTimestamp * 24
    const dayLaterTimestamp = nowTimestamp + dayTimestamp;
    const dayThreeLaterTimestamp = nowTimestamp + (dayTimestamp * 3);
    const weekLaterTimestamp = nowTimestamp + (dayTimestamp * 7);
    const weekTwoLaterTimestamp = nowTimestamp + (dayTimestamp * 14);
    const monthLaterTimestamp = nowTimestamp + (dayTimestamp * 30);
    const monthTwoLaterTimestamp = nowTimestamp + (dayTimestamp * 60);
    const seasonLaterTimestamp = nowTimestamp + (dayTimestamp * 90);
    const halfYearLaterTimestamp = nowTimestamp + (dayTimestamp * 182.5);
    const yearLaterTimestamp = nowTimestamp + (dayTimestamp * 365);

    const withinDay = await serviceTaskList.getByTimestamp(null, dayLaterTimestamp)
    if (withinDay instanceof Error) return responseHanle.failure(withinDay.message);

    const withinThreeDay = await serviceTaskList.getByTimestamp(dayLaterTimestamp, dayThreeLaterTimestamp)
    if (withinThreeDay instanceof Error) return responseHanle.failure(withinThreeDay.message);

    const withinWeek = await serviceTaskList.getByTimestamp(dayThreeLaterTimestamp, weekLaterTimestamp)
    if (withinWeek instanceof Error) return responseHanle.failure(withinWeek.message);

    const withinWeekTwoWeeh = await serviceTaskList.getByTimestamp(weekLaterTimestamp, weekTwoLaterTimestamp)
    if (withinWeekTwoWeeh instanceof Error) return responseHanle.failure(withinWeekTwoWeeh.message);

    const withinMonth = await serviceTaskList.getByTimestamp(weekTwoLaterTimestamp, monthLaterTimestamp)
    if (withinMonth instanceof Error) return responseHanle.failure(withinMonth.message);

    const withinTwoMonth = await serviceTaskList.getByTimestamp(monthLaterTimestamp, monthTwoLaterTimestamp)
    if (withinTwoMonth instanceof Error) return responseHanle.failure(withinTwoMonth.message);

    const withinSeason = await serviceTaskList.getByTimestamp(monthTwoLaterTimestamp, seasonLaterTimestamp)
    if (withinSeason instanceof Error) return responseHanle.failure(withinSeason.message);

    const withinHalfYear = await serviceTaskList.getByTimestamp(seasonLaterTimestamp, halfYearLaterTimestamp)
    if (withinHalfYear instanceof Error) return responseHanle.failure(withinHalfYear.message);

    const withinYear = await serviceTaskList.getByTimestamp(halfYearLaterTimestamp, yearLaterTimestamp)
    if (withinYear instanceof Error) return responseHanle.failure(withinYear.message);

    const yearLater = await serviceTaskList.getByTimestamp(yearLaterTimestamp, null)
    if (yearLater instanceof Error) return responseHanle.failure(yearLater.message);


    const fixedResult = [
        {
            title: '2周',
            minTimestamp: weekLaterTimestamp,
            maxTimestamp: weekTwoLaterTimestamp,
            data: withinWeekTwoWeeh.find,
            count: withinWeekTwoWeeh.count
        },
        {
            title: '1个月',
            minTimestamp: weekTwoLaterTimestamp,
            maxTimestamp: monthLaterTimestamp,
            data: withinMonth.find,
            count: withinMonth.count
        },
        {
            title: '2个月',
            minTimestamp: monthLaterTimestamp,
            maxTimestamp: monthTwoLaterTimestamp,
            data: withinTwoMonth.find,
            count: withinTwoMonth.count
        },
        {
            title: '1季度',
            minTimestamp: monthTwoLaterTimestamp,
            maxTimestamp: seasonLaterTimestamp,
            data: withinSeason.find,
            count: withinSeason.count
        },
        {
            title: '半年',
            minTimestamp: seasonLaterTimestamp,
            maxTimestamp: halfYearLaterTimestamp,
            data: withinHalfYear.find,
            count: withinHalfYear.count
        },
        {
            title: '1年',
            minTimestamp: halfYearLaterTimestamp,
            maxTimestamp: yearLaterTimestamp,
            data: withinYear.find,
            count: withinYear.count
        },
        {
            title: '未来',
            minTimestamp: yearLaterTimestamp,
            maxTimestamp: '',
            data: yearLater.find,
            count: yearLater.count
        },
    ]

    const flexibleResult = []

    if (withinDay.count > 7) {
        flexibleResult.push({
            title: '1天内',
            minTimestamp: '',
            maxTimestamp: dayLaterTimestamp,
            data: withinDay.find,
            count: withinDay.count
        })
    } else {
        withinThreeDay.find = [
            ...withinDay.find,
            ...withinThreeDay.find
        ]
        withinThreeDay.count = withinDay.count + withinThreeDay.count
    }

    if (withinThreeDay.count > 7) {
        flexibleResult.push({
            title: '3天内',
            minTimestamp: flexibleResult.length > 0 ? dayLaterTimestamp : '',
            maxTimestamp: dayThreeLaterTimestamp,
            data: withinThreeDay.find,
            count: withinThreeDay.count
        })
    } else {
        withinWeek.find = [
            ...withinThreeDay.find,
            ...withinWeek.find
        ]
        withinWeek.count = withinThreeDay.count + withinWeek.count
    }

    flexibleResult.push({
        title: '1周内',
        minTimestamp: flexibleResult.length > 0 ? dayThreeLaterTimestamp : '',
        maxTimestamp: weekLaterTimestamp,
        data: withinWeek.find,
        count: withinWeek.count
    })

    const result = [
        ...flexibleResult,
        ...fixedResult
    ].filter(({ data }) => data.length > 0)

    cacheQuickTimeClassify = result // 缓存
    responseHanle.success(result)
}

const getAllTaskByTimestamp = async ({
    minTimestamp,
    maxTimestamp,
    pageNo,
    tag,
    progress,
    priority,
    pageSize,
}, responseHanle) => {
    if (minTimestamp) {
        const minTimestampVerify = valuesStructuresVerify.isTimestamp(minTimestamp, 'minTimestamp')
        if (minTimestampVerify instanceof Error) return minTimestampVerify
        minTimestamp = minTimestampVerify
    }
    if (maxTimestamp) {
        const maxTimestampVerify = valuesStructuresVerify.isTimestamp(maxTimestamp, 'maxTimestamp')
        if (maxTimestampVerify instanceof Error) return maxTimestampVerify
        maxTimestamp = maxTimestampVerify
    }
    const verifyInstance = verify.filterParameter({ pageNo, tag, progress, priority, pageSize })
    if (verifyInstance instanceof Error) return responseHanle.failure(verifyInstance.message);
    pageNo = verifyInstance.pageNo
    tag = verifyInstance.tag
    progress = verifyInstance.progress
    priority = verifyInstance.priority
    pageSize = verifyInstance.pageSize

    const result = await serviceTaskList.getByTimestamp(
        minTimestamp,
        maxTimestamp,
        pageNo,
        tag,
        progress,
        priority,
        pageSize,
    )
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const getCompletedTasks = async ({ pageNo }, responseHanle) => {
    const pageNoVerify = valuesStructuresVerify.isIntNumString(pageNo, 'pageNo')
    if (pageNoVerify instanceof Error) {
        pageNo = 1
    } else {
        pageNo = +pageNo
    }

    const result = await serviceTaskList.getByCompleted(pageNo)
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const getRandomlyTasks = async ({ }, responseHanle) => {
    const result = await serviceTaskList.getByRandomly()
    if (result instanceof Error) return responseHanle.failure(result.message);

    const { find, count } = result;
    responseHanle.success({ list: find, count })
}

const TaskList = {
    get_task_list_un_categorized: getAllTaskByUnCategorized,

    get_task_preview_quick_recall: getPreviewTaskByQuickRecall,
    get_task_list_update_timestamp: getAllTaskByUpdateTimestamp,
    get_task_list_read_count: getAllTaskByReadCount,

    get_task_preview_quick_time_classify: getPreviewTaskByQuickTimeClassify,
    get_task_list_time: getAllTaskByTimestamp,

    get_task_list_completed: getCompletedTasks,

    get_task_list_randomly: getRandomlyTasks,

    ...taskListTag,
}

export default TaskList