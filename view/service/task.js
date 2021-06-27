import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'

const getTaskList = async (pageNo) => {
    const list = new Array(9).fill('').map((i, k) => {

        return {
            id: StringHelper.createRandomStr({ length: 16 }),
            title: '标题' + StringHelper.createRandomStr({ length: 4 }),
            content: '内容' + StringHelper.createRandomStr({ length: 36 }),
            specific: 'specific' + StringHelper.createRandomStr({ length: 12 }),
            measurable: 'measurable' + StringHelper.createRandomStr({ length: 12 }),
            attainable: 'attainable' + StringHelper.createRandomStr({ length: 12 }),
            relevant: 'relevant' + StringHelper.createRandomStr({ length: 12 }),
            timeBound: 'timeBound' + StringHelper.createRandomStr({ length: 12 }),
        }
    })

    const result = {
        pageNo,
        count: 45,
        list
    }

    consequencer.success(result)
}

const task = {
    getTaskList
}

export default task
