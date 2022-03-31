import AsyncFetch from './../components/async-fetch'

export const getAllLongTerm = async () => {
    const query = {}
    const fetchInstance = await AsyncFetch.get({
        url: 'long/term/all',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getLongTermByPagination = async (pageNo = 1, pageSize = 8) => {
    const query = { pageNo, pageSize }
    const fetchInstance = await AsyncFetch.get({
        url: 'long/term/pagination',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

/**
 * for title
 */
export const getLongTermDetailById = async longTermId => {
    const query = { id: longTermId }
    const fetchInstance = await AsyncFetch.get({
        url: 'long/term/id',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const addLongTerm = async longTermName => {
    const body = { name: longTermName }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/add',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editLongTerm = async (longTermId, longTermName, longTermDescription = '') => {
    const body = {
        id: longTermId,
        name: longTermName,
    }
    if (longTermDescription) body.description = longTermDescription
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/edit',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const deleteLongTerm = async longTermId => {
    const body = { id: longTermId }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/delete',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const setLongTermToTop = async longTermId => {
    const body = { id: longTermId }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/to/top',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const getAllLongTermProgram = async (longTermId) => {
    const query = { longTermId }
    const fetchInstance = await AsyncFetch.get({
        url: 'long/term/program/list',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const addLongTermProgram = async (longTermId, longTermProgramName) => {
    const body = { longTermId, name: longTermProgramName }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/program/add',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const editLongTermProgram = async (longTermProgramId, longTermProgramName) => {
    const body = { id: longTermProgramId, name: longTermProgramName }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/program/edit',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const deleteLongProgramTerm = async longTermProgramId => {
    const body = { id: longTermProgramId }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/program/delete',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

export const setLongTermProgramToTop = async longTermProgramId => {
    const body = { id: longTermProgramId }
    const fetchInstance = await AsyncFetch.post({
        url: 'long/term/program/to/top',
        body
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}

const longTerm = {
    getAllLongTerm,
    getLongTermByPagination,

    getLongTermDetailById,

    editLongTerm,
    addLongTerm,
    deleteLongTerm,
    setLongTermToTop,

    getAllLongTermProgram,
    addLongTermProgram,
    editLongTermProgram,
    deleteLongProgramTerm,
    setLongTermProgramToTop,
}

export default longTerm
