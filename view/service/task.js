import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'

const createItem = () => ({
    id: StringHelper.createRandomStr({ length: 16 }),
    title: '标题' + StringHelper.createRandomStr({ length: 4 }),
    content: '内容' + StringHelper.createRandomStr({ length: 32 }),
    specific: 'specific' + StringHelper.createRandomStr({ length: 12 }),
    measurable: 'measurable' + StringHelper.createRandomStr({ length: 12 }),
    attainable: 'attainable' + StringHelper.createRandomStr({ length: 12 }),
    relevant: 'relevant' + StringHelper.createRandomStr({ length: 12 }),
    timeBound: 'timeBound' + StringHelper.createRandomStr({ length: 12 }),
    timestamp: new Date().getTime(),
    category: StringHelper.createRandomStr({ length: 12 }),
    isUrgent: Math.ceil(Math.random() * 10) > 7,
    isImportant: Math.ceil(Math.random() * 10) > 7,
})

const getTaskList = async (pageNo, category) => {
    const list = new Array(9).fill('').map((i, k) => {
        return createItem()
    })

    const result = {
        pageNo,
        count: 45,
        list
    }

    return consequencer.success(result)
}

const addTask = async ({ title, content, specific, measurable, attainable, relevant, timeBound }) => {
    return consequencer.success()
}

const getTaskByRandom = async () => {
    return consequencer.success(createItem())
}

const completeTask = async (id) => {
    return consequencer.success()
}

const task = {
    getTaskList,
    addTask,
    getTaskByRandom,
    completeTask
}

export default task
