import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'

const getTaskList = async (pageNo, category) => {
    const list = new Array(9).fill('').map((i, k) => {
        return {
            id: StringHelper.createRandomStr({ length: 16 }),
            title: '标题' + StringHelper.createRandomStr({ length: 4 }),
            content: '内容' + StringHelper.createRandomStr({ length: 32 }),
            specific: 'specific' + StringHelper.createRandomStr({ length: 12 }),
            measurable: 'measurable' + StringHelper.createRandomStr({ length: 12 }),
            attainable: 'attainable' + StringHelper.createRandomStr({ length: 12 }),
            relevant: 'relevant' + StringHelper.createRandomStr({ length: 12 }),
            timeBound: 'timeBound' + StringHelper.createRandomStr({ length: 12 }),
            isUrgent: Math.ceil(Math.random() * 10) > 7,
            isImportant: Math.ceil(Math.random() * 10) > 7,
        }
    })

    const result = {
        pageNo,
        count: 45,
        list
    }

    return consequencer.success(result)
}

const addTask = async () => {
    return consequencer.success()
}

const task = {
    getTaskList,
    addTask
}

export default task
