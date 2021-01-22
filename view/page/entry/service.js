import fetch from './../../components/async-fetch/index.js'

async function getTaskList() {
    const data = await fetch.get({
        url: 'task/list',
        query: {},
        isShowError: true
    })

    return data
}

const getTaskTagInfor = async id => await fetch.get({
    url: 'tag/id',
    query: { id },
    isShowError: true
})

const service = {
    getTaskList,
    getTaskTagInfor
}

export default service