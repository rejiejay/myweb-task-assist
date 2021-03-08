import fetch from './../../components/async-fetch/index.js'

async function getTaskList({ longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority, pageNo, pageSize }, sort) {
    let query = { pageNo, pageSize }
    if (sort && sort.value && sort.value === 2) {
        query.isRandom = 'true'
        delete query.pageNo
        delete query.pageSize
    }
    if (longTerm && longTerm.id) query.longTermId = longTerm.id
    if (tags && tags.length > 0) query.tags = JSON.stringify(tags.map(({ id }) => id))
    if (!!minEffectTimestamp) query.minEffectTimestamp = minEffectTimestamp
    if (!!maxEffectTimestamp) query.maxEffectTimestamp = maxEffectTimestamp
    if (multipleStatus && multipleStatus.length > 0) query.status = JSON.stringify(multipleStatus.map(({ value }) => value))
    if (multiplePriority && multiplePriority.length > 0) query.prioritys = JSON.stringify(multiplePriority.map(({ value }) => value))

    const data = await fetch.reGetConfirm({ url: 'task/list', query, isShowError: true });

    return data
}

const getTaskTagInfor = async id => await fetch.get({
    url: 'tag/id',
    query: { id },
    isShowError: true
})

const getAllTaskTagInfor = async () => await fetch.get({
    url: 'tag/all',
    query: {},
    isShowError: true
})

const getAllLongTermTask = async () => await fetch.get({
    url: 'longTerm/relational/all',
    query: {},
    isShowError: true
})

const addTag = async tagName => await fetch.post({
    url: 'tag/add',
    body: { tagName },
    isShowError: true
})

const editTag = async ({ id, name }) => await fetch.post({
    url: 'tag/edit',
    body: { id, name },
    isShowError: true
})

const deleteTag = async ({ id }) => await fetch.post({
    url: 'tag/delete',
    body: { id },
    isShowError: true
})

/**
 * 新增任务
 * @param {string} title 
 * @param {string} content 
 * @param {string} specific 
 * @param {string} measurable 
 * @param {string} attainable 
 * @param {string} relevant 
 * @param {string} timeBound 
 * @param {number} longTermId 
 * @param {Array} tagsId 
 * @param {string} status 
 * @param {string} priority 
 */
const addTask = async ({ title, content, specific, measurable, attainable, relevant, timeBound, longTermId, minEffectTimestamp, maxEffectTimestamp, tagsId, status, priority }) => await fetch.post({
    url: 'task/add',
    body: { title, content, specific, measurable, attainable, relevant, timeBound, longTermId, minEffectTimestamp, maxEffectTimestamp, tagsId, status, priority }
})

/**
 * 编辑任务
 * @param {number} id 
 * @param {other} ...addTask
 */
const editTask = async ({ id, title, content, specific, measurable, attainable, relevant, timeBound, longTermId, minEffectTimestamp, maxEffectTimestamp, tagsId, status, priority }) => await fetch.post({
    url: 'task/edit',
    body: { id, title, content, specific, measurable, attainable, relevant, timeBound, longTermId, minEffectTimestamp, maxEffectTimestamp, tagsId, status, priority }
})

const getTaskById = async id => await fetch.reGetConfirm({
    url: 'task/id',
    query: { id }
})

const getLongTermTask = async id => await fetch.reGetConfirm({
    url: 'longTerm/relational/id',
    query: { id },
    isShowError: true
})

const getAllNavigationLink = async () => await fetch.reGetConfirm({
    url: 'link/all',
    query: {},
    isShowError: true
})

const addNavigationLink = async ({ topic, filterJson }) => await fetch.post({
    url: 'link/add',
    body: { topic, filterJson }
})

const editNavigationLink = async ({ id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson }) => await fetch.post({
    url: 'link/edit',
    body: { id, uniquelyIdentify, parentUniquelyIdentify, topic, filterJson }
})

const deleteNavigationLink = async id => await fetch.post({
    url: 'link/delete',
    body: { id }
})

const getLongTermRecordDetail = async id => await fetch.reGetConfirm({
    url: 'longTerm/detail',
    query: { longTermRecordDetailCategoryId: id },
    isShowError: true
})

const editLongTermRecordDetail = async (id, { uniquelyIdentify, parentUniquelyIdentify, detail, createTimestamp }) => await fetch.post({
    url: 'longTerm/detail/edit',
    body: { id, uniquelyIdentify, parentUniquelyIdentify, detail, createTimestamp }
})

const deleteLongTermRecordDetail = async id => await fetch.post({
    url: 'longTerm/detail/delete',
    body: { id }
})

const addLongTermRecordDetail = async ({ parentUniquelyIdentify, categoryIdentify }) => await fetch.post({
    url: 'longTerm/detail/add',
    body: { parentUniquelyIdentify, categoryIdentify }
})

const addLongTermTaskTaskRelational = async longTermTaskName => await fetch.post({
    url: 'longTerm/relational/add',
    body: { longTermTaskName },
    isShowError: true
})

const editLongTermTaskRelational = async ({ id, spreadZoomIdentify, title, record }) => await fetch.post({
    url: 'longTerm/relational/edit',
    body: { id, spreadZoomIdentify, title, record }
})

const deleteLongTermTaskTaskRelational = async ({ id }) => await fetch.post({
    url: 'longTerm/relational/delete',
    body: { id },
    isShowError: true
})

const service = {
    getTaskList,
    getTaskTagInfor,
    getAllTaskTagInfor,
    getAllLongTermTask,
    addTag,
    editTag,
    deleteTag,
    addTask,
    editTask,
    getTaskById,
    getLongTermTask,
    getAllNavigationLink,
    addNavigationLink,
    editNavigationLink,
    deleteNavigationLink,
    getLongTermRecordDetail,
    editLongTermRecordDetail,
    deleteLongTermRecordDetail,
    addLongTermRecordDetail,
    addLongTermTaskTaskRelational,
    editLongTermTaskRelational,
    deleteLongTermTaskTaskRelational
}

export default service