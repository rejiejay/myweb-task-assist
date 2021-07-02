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
    categoryId: StringHelper.createRandomStr({ length: 12 }),
    isUrgent: Math.ceil(Math.random() * 10) > 7,
    isImportant: Math.ceil(Math.random() * 10) > 7,
    isCompleted: false,
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

const getTaskById = async (id) => {
    return consequencer.success(createItem())
}

const getTaskRandom = category => {
    const list = new Array(9).fill('').map((i, k) => {
        return createItem()
    })

    return consequencer.success(list)
}

const setTaskCategoryTagById = async (id, categoryId) => {
    return consequencer.success(createItem())
}

const setTaskStatusById = async (id, isUrgent, isImportant) => {
    return consequencer.success(createItem())
}

const editTaskById = async (id, task) => {
    return consequencer.success(createItem())
}

const completedTaskById = async id => {
    return consequencer.success(createItem())
}

const task = {
    getTaskList,
    addTask,
    getTaskByRandom,
    completeTask,
    getTaskById,
    getTaskRandom,
    setTaskCategoryTagById,
    setTaskStatusById,
    editTaskById,
    completedTaskById,
}

export default task
