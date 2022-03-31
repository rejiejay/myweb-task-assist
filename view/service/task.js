import AsyncFetch from './../components/async-fetch'

export const getTaskDetail = async (taskPreviewId) => {
    const query = { id: taskPreviewId }
    const fetchInstance = await AsyncFetch.get({
        url: 'task/id',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const addTaskByDetail = async ({
    title,
    content,

    specific,
    measurable,
    attainable,
    relevant,
    timeBound,
}) => {
    const body = {
        title,
        content,

        specific,
        measurable,
        attainable,
        relevant,
        timeBound,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/add',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editTaskByDetail = async (update) => {
    let {
        id,
        title,
        content,

        specific,
        measurable,
        attainable,
        relevant,
        timeBound,
    } = update
    if (!specific) specific = 'null'
    if (!measurable) measurable = 'null'
    if (!attainable) attainable = 'null'
    if (!relevant) relevant = 'null'
    if (!timeBound) timeBound = 'null'

    const body = {
        id,
        title,
        content,

        specific,
        measurable,
        attainable,
        relevant,
        timeBound,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/edit',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editTaskDeadline = async (id, deadlineTimestamp = 'null') => {
    const body = {
        id,
        deadlineTimestamp: deadlineTimestamp || 'null',
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/deadline',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editTaskLongTerm = async (id, longTermId = 'null') => {
    const body = {
        id,
        longTermId: longTermId || 'null',
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/long/term',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editTaskTag = async (id, tag = 'null') => {
    const body = {
        id,
        tag: tag || 'null',
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/tag',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editTaskPriority = async (id, priority = 'null') => {
    const body = {
        id,
        priority: priority || 'null',
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/priority',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editTaskProgress = async (id, progress = 'null') => {
    const body = {
        id,
        progress: progress || 'null',
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/progress',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const deleteTask = async id => {
    const body = {
        id,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/delete',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const completedTask = async id => {
    const body = {
        id,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/completed',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const setUnCategorizedTaskToTop = async id => {
    const body = {
        id,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/to/top',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const moveUnCategorizedTaskUp = async id => {
    const body = {
        id,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/move/up',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const moveUnCategorizedTaskDown = async id => {
    const body = {
        id,
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/move/down',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const setTaskLongTermProgram = async (id, longTermProgramId = 'null') => {
    const body = {
        id,
        longTermProgramId: longTermProgramId || 'null',
    }
    const fetchInstance = await AsyncFetch.post({
        url: 'task/long/term/program',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

const task = {
    getTaskDetail,
    addTaskByDetail,
    editTaskByDetail,
    editTaskDeadline,
    editTaskLongTerm,
    editTaskTag,
    editTaskPriority,
    editTaskProgress,
    deleteTask,
    completedTask,

    setUnCategorizedTaskToTop,
    moveUnCategorizedTaskUp,
    moveUnCategorizedTaskDown,

    setTaskLongTermProgram,
}

export default task
