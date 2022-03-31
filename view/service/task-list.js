import AsyncFetch from './../components/async-fetch'

export const getAllTaskByUnCategorized = async (
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const query = { pageNo, tag, progress, priority, pageSize }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/un/categorized',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getPreviewTaskByQuickRecall = async () => {
    const query = {}
    const fetchInstance = await AsyncFetch.get({
        url: 'task/preview/quick/recall',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getAllTaskByUpdateTimestamp = async (
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const query = { pageNo, tag, progress, priority, pageSize }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/update/timestamp',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getAllTaskByReadCount = async (
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const query = { pageNo, tag, progress, priority, pageSize }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/read/count',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getAllTaskByTimestamp = async (
    minTimestamp = null,
    maxTimestamp = null,
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const query = { minTimestamp, maxTimestamp, pageNo, tag, progress, priority, pageSize }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/time',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getPreviewTaskByQuickTimeClassify = async () => {
    const query = {}
    const fetchInstance = await AsyncFetch.get({
        url: 'task/preview/quick/time/classify',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getCompletedTasks = async (pageNo) => {
    const query = { pageNo }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/completed',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getRandomlyTasks = async (pageNo) => {
    const query = { pageNo }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/randomly',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

// not in view
export const getPreviewTaskByLongTermUnCategorized = async () => { }

export const getPreviewTaskByLongTermQuickRecall = async () => {
    const query = {}
    const fetchInstance = await AsyncFetch.get({
        url: 'task/long/term/preview/quick/recall',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getPreviewTaskByAllLongTerm = async () => {
    const query = {}
    const fetchInstance = await AsyncFetch.get({
        url: 'task/long/term/preview/classify/long/term',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getAllTaskByLongTermUnCategorized = async (longTermId) => {
    const query = { longTermId }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/long/term/list/un/categorized',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getAllTaskByLongTermPrograms = async (longTermId) => {
    const query = { longTermId }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/long/term/list/programs',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getTaskByLongTermUnCategorizedPagination = async (
    longTermId,
    pageNo = 1,
    pageSize = 9
) => {
    const query = { longTermId, pageNo, pageSize }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/long/term/pagination/un/categorized',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getTaskByLongTermProgramPagination = async (
    longTermId,
    longTermProgramId,
    pageNo = 1,
    pageSize = 9
) => {
    const query = {
        longTermId,
        longTermProgramId,
        pageNo,
        pageSize
    }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/long/term/pagination/programs',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

const taskList = {
    getAllTaskByUnCategorized,

    getPreviewTaskByQuickRecall,
    getAllTaskByUpdateTimestamp,
    getAllTaskByReadCount,

    getPreviewTaskByQuickTimeClassify,
    getAllTaskByTimestamp,

    getCompletedTasks,

    getRandomlyTasks,

    // not in view
    getPreviewTaskByLongTermUnCategorized,
    getPreviewTaskByLongTermQuickRecall,
    getPreviewTaskByAllLongTerm,

    getAllTaskByLongTermUnCategorized,
    getAllTaskByLongTermPrograms,

    getTaskByLongTermUnCategorizedPagination,
    getTaskByLongTermProgramPagination,
}

export default taskList