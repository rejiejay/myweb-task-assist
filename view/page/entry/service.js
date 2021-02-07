import fetch from './../../components/async-fetch/index.js'

async function getTaskList({ longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority, pageNo, pageSize }, sort) {
    let query = { pageNo, pageSize }
    if (sort && sort.value && sort.value === 2) {
        query.isRandom = 'true'
        delete query.pageNo
        delete query.pageSize
    }
    if (longTerm && longTerm.id) query.longTermId = longTerm.id
    if (tags && tags.length > 0) query.tags = JSON.stringify(tags)
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
    url: 'longTerm/all',
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

const service = {
    getTaskList,
    getTaskTagInfor,
    getAllTaskTagInfor,
    getAllLongTermTask,
    addTag,
    editTag
}

export default service