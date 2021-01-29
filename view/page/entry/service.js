import fetch from './../../components/async-fetch/index.js'

async function getTaskList({ longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority }, sort) {
    let query = {}
    if (sort.value && sort.value === 2) query.isRandom = 'true'

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

const service = {
    getTaskList,
    getTaskTagInfor,
    getAllTaskTagInfor,
    getAllLongTermTask
}

export default service