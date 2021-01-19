import fetch from './../components/async-fetch/index.js'

async function getTaskList() {
    const data = await fetch.get({
        url: 'task/list',
        query: {}
    })

    return data
}

const server = {
    getTaskList
}

export default server