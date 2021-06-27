import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'

const createItem = (parentId, index) => ({
    id: StringHelper.createRandomStr({ length: 16 }),
    parentId,
    index,
    title: '计划' + index + StringHelper.createRandomStr({ length: 4 }),
    content: '内容' + StringHelper.createRandomStr({ length: 32 }),
    specific: 'specific' + StringHelper.createRandomStr({ length: 12 }),
    measurable: 'measurable' + StringHelper.createRandomStr({ length: 12 }),
    attainable: 'attainable' + StringHelper.createRandomStr({ length: 12 }),
    relevant: 'relevant' + StringHelper.createRandomStr({ length: 12 }),
    timeBound: 'timeBound' + StringHelper.createRandomStr({ length: 12 }),
    timestamp: new Date().getTime(),
})

const getProgressPlanByTask = id => {
    const parentId = StringHelper.createRandomStr({ length: 16 })
    return consequencer.success([
        createItem(parentId, 1),
        createItem(parentId, 2),
        createItem(parentId, 3),
        createItem(parentId, 4),
        createItem(parentId, 5),
    ])
}

const progress = {
    getProgressPlanByTask
}

export default progress
