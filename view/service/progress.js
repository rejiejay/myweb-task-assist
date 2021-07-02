import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'
import NumberHelper from './../../utils/number-helper'

const createItem = (taskId, parentId = null, index) => ({
    id: StringHelper.createRandomStr({ length: 16 }),
    taskId,
    parentId,
    index: NumberHelper.createRandomNum(new Date().getTime() + index),
    title: '计划' + index + StringHelper.createRandomStr({ length: 4 }),
    content: '内容' + StringHelper.createRandomStr({ length: 32 }),
    specific: 'specific' + StringHelper.createRandomStr({ length: 12 }),
    measurable: 'measurable' + StringHelper.createRandomStr({ length: 12 }),
    attainable: 'attainable' + StringHelper.createRandomStr({ length: 12 }),
    relevant: 'relevant' + StringHelper.createRandomStr({ length: 12 }),
    timeBound: 'timeBound' + StringHelper.createRandomStr({ length: 12 }),
    timestamp: new Date().getTime(),
    isCompleted: false,
})

const getAllProgressPlanByTask = taskId => {
    const uncategorizedMap = (i, k) => createItem(taskId, null, k);
    const projectdMap = (i, k) => {
        const mainItem = createItem(taskId, taskId, k);
        const subMap = (i, k) => createItem(taskId, mainItem.id, k);
        return {
            ...mainItem,
            children: new Array(NumberHelper.createRandomNum(5)).fill('').map(subMap)
        }
    };

    const uncategorized = new Array(NumberHelper.createRandomNum(5)).fill('').map(uncategorizedMap);
    const project = new Array(NumberHelper.createRandomNum(5)).fill('').map(projectdMap);

    return consequencer.success({
        uncategorized,
        project
    });
}

const getMainProgressPlanByTask = taskId => {
    return consequencer.success([
        createItem(taskId, taskId, 1),
        createItem(taskId, taskId, 2),
        createItem(taskId, taskId, 3),
        createItem(taskId, taskId, 4),
        createItem(taskId, taskId, 5),
    ])
}

const getProgressSubPlanByPlan = planId => {
    const parentId = StringHelper.createRandomStr({ length: 16 })
    return consequencer.success([
        createItem(parentId, 1),
        createItem(parentId, 2),
        createItem(parentId, 3),
        createItem(parentId, 4),
        createItem(parentId, 5),
    ])
}

const addProgressPlanByTask = (taskId, task, parentId = null) => {
    return consequencer.success()
}

const switchProgressPlanPosition = (taskId, targetId) => {
    return consequencer.success()
}

const editProgressPlanById = async (id, task) => {
    return consequencer.success()
}

const completedProgressPlanById = async id => {
    return consequencer.success()
}

const progress = {
    getAllProgressPlanByTask,
    getMainProgressPlanByTask,
    getProgressSubPlanByPlan,
    addProgressPlanByTask,
    switchProgressPlanPosition,
    editProgressPlanById,
    completedProgressPlanById,
}

export default progress
