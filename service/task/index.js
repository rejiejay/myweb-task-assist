import SQLite from './../../module/SQLite/index.js'

import StringHelper from './../../utils/string-helper'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

const getTask = async function getTask(id) {
    return await tableHandle.find(id)
}

const addTask = async function addTask({
    title,
    content,

    specific,
    measurable,
    attainable,
    relevant,
    timeBound,
}) {
    const id = StringHelper.createRandomStr({ length: 16 })
    const nowTimestamp = new Date().getTime()
    let task = {
        id,

        title,
        content,

        createTimestamp: nowTimestamp,
        updateTimestamp: nowTimestamp,
        operationalPosition: nowTimestamp,
    }

    if (specific) {
        task.specific = specific
    }
    if (measurable) {
        task.measurable = measurable
    }
    if (attainable) {
        task.attainable = attainable
    }
    if (relevant) {
        task.relevant = relevant
    }
    if (timeBound) {
        task.timeBound = timeBound
    }

    const result = await tableHandle.add(task)
    if (result instanceof Error) return result

    return await tableHandle.find(id)
}

const editTaskByField = async function editTaskByField(id, update) {
    return await tableHandle.updata(id, update)
}

const deleteTask = async function deleteTask(id) {
    return await tableHandle.del(id)
}

const findBehindTask = async function findBehindTask({ operationalPosition, isUp }) {
    const find = await tableHandle.list(
        `WHERE ${'longTermId IS NULL AND' // 不是长期任务
        } ${'completedTimestamp IS NULL AND' // 且任务未完成的状态
        } ${'deadlineTimestamp IS NULL AND' // 且任务未设定期限
        } operationalPosition ${isUp ? '>' : '<'
        } ${operationalPosition
        } LIMIT 1;`
    )

    if (find instanceof Error) return find

    return find
}

const task = {
    getTask,
    addTask,
    editTaskByField,
    deleteTask,
    findBehindTask,
}

export default task
