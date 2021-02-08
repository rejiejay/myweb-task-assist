/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import CONST from './../../library/consts'

const getTaskList = async function getTaskList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom, pageNo, pageSize }, responseHanle) {
    const verifys = [
        { value: longTermId, field: 'longTermId', method: 'isId' },
        { value: tags, field: 'tags', method: 'isArrayNilString' },
        { value: minEffectTimestamp, field: 'minEffectTimestamp', method: 'isTimestamp' },
        { value: maxEffectTimestamp, field: 'maxEffectTimestamp', method: 'isTimestamp' },
        { value: status, field: 'status', method: 'isArrayNilString' },
        { value: prioritys, field: 'prioritys', method: 'isArrayNilString' },
        { value: isRandom, field: 'isRandom', method: 'isBooleanString' },
        { value: pageNo, field: 'pageNo', method: 'isIntNumString' },
        { value: pageSize, field: 'pageSize', method: 'isIntNumString' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    let parameter = verifyInstance.data
    if ((!!isRandom && !pageSize) || (!!pageNo && !pageSize)) parameter.pageSize = CONST.defaultPageSize

    if (!!parameter.tags) {
        const taskTagyInstance = await service.tag.findTaskIdsByField(parameter.tags)
        if (taskTagyInstance.result !== 1) return taskTagyInstance
        const taskTags = taskTagyInstance.data
        parameter.taskTagIds = taskTags
    }

    const listInstance = await service.task.getList(parameter)
    if (listInstance.result !== 1) return responseHanle.json(listInstance)
    const list = listInstance.data

    const countInstance = await service.task.getCount(parameter)
    if (countInstance.result !== 1) return responseHanle.json(countInstance)
    const count = countInstance.data

    let result = { list, count }

    if (!!parameter.longTermId) {
        const longTermInstance = await service.longTerm.getOne(parameter.longTermId)
        if (longTermInstance.result !== 1) return responseHanle.json(longTermInstance)
        const longTerm = longTermInstance.data
        result.longTerm = longTerm
    }

    responseHanle.success(result)
}

const addTask = async function addTask({ title, content, specific, measurable, attainable, relevant, timeBound, longTermId, tagsId, minEffectTimestamp, maxEffectTimestamp, status, priority }, responseHanle) {
    if (!title) return responseHanle.failure('title can`t Nil')
    if (!content) return responseHanle.failure('content can`t Nil')
    const verifys = [
        { value: title, field: 'title', method: 'isStringNil' },
        { value: content, field: 'content', method: 'isStringNil' },
        { value: specific, field: 'specific', method: 'isString' },
        { value: measurable, field: 'measurable', method: 'isString' },
        { value: attainable, field: 'attainable', method: 'isString' },
        { value: relevant, field: 'relevant', method: 'isString' },
        { value: timeBound, field: 'timeBound', method: 'isString' },
        { value: longTermId, field: 'longTermId', method: 'isId' },
        { value: tagsId, field: 'tagsId', method: 'isArray' },
        { value: minEffectTimestamp, field: 'minEffectTimestamp', method: 'isTimestamp' },
        { value: maxEffectTimestamp, field: 'maxEffectTimestamp', method: 'isTimestamp' },
        { value: status, field: 'status', method: 'isId' },
        { value: priority, field: 'priority', method: 'isId' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const addInstance = await service.task.add({ title, content, specific, measurable, attainable, relevant, timeBound, longTermId, tagsId, minEffectTimestamp, maxEffectTimestamp, status, priority })
    responseHanle.json(addInstance)
}

const editTask = async function editTask({ id, title, content, specific, measurable, attainable, relevant, timeBound, longTermId, tagsId, minEffectTimestamp, maxEffectTimestamp, status, priority }, responseHanle) {
    if (!id) return responseHanle.failure('id can`t Nil')
    if (!title) return responseHanle.failure('title can`t Nil')
    if (!content) return responseHanle.failure('content can`t Nil')
    const verifys = [
        { value: title, field: 'title', method: 'isStringNil' },
        { value: content, field: 'content', method: 'isStringNil' },
        { value: specific, field: 'specific', method: 'isString' },
        { value: measurable, field: 'measurable', method: 'isString' },
        { value: attainable, field: 'attainable', method: 'isString' },
        { value: relevant, field: 'relevant', method: 'isString' },
        { value: timeBound, field: 'timeBound', method: 'isString' },
        { value: longTermId, field: 'longTermId', method: 'isId' },
        { value: tagsId, field: 'tagsId', method: 'isArray' },
        { value: minEffectTimestamp, field: 'minEffectTimestamp', method: 'isTimestamp' },
        { value: maxEffectTimestamp, field: 'maxEffectTimestamp', method: 'isTimestamp' },
        { value: status, field: 'status', method: 'isId' },
        { value: priority, field: 'priority', method: 'isId' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const editInstance = await service.task.edit({ id, title, content, specific, measurable, attainable, relevant, timeBound, longTermId, tagsId, minEffectTimestamp, maxEffectTimestamp, status, priority })
    responseHanle.json(editInstance)
}

const Task = {
    get_task_list: getTaskList,
    post_task_add: addTask,
    post_task_edit: editTask
}

export default Task

