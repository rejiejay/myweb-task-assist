/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import ObjectHelper from './../../utils/object-helper'
import CONST from './../../library/consts'
import consequencer from '../../utils/consequencer.js'

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
        const taskTagyInstance = await service.tag.findTagRelationalByField(parameter.tags)
        if (taskTagyInstance.result !== 1) return taskTagyInstance
        const taskTagIds = taskTagyInstance.data.map(({ taskId }) => taskId)
        parameter.taskTagIds = taskTagIds
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

/**
 * tag编辑的3钟情况
 * 1. 新增
 * 2. 删除
 * 3. 修改
 */
const editTaskTagHandle = async function editTaskTagHandle(originTask, tagsId) {
    const { taskTagId, id } = originTask

    const addHandle = async () => {
        for (let index = 0; index < tagsId.length; index++) {
            const tagId = tagsId[index];
            const addTagRelationalInstance = await service.tag.addTagRelational({ taskId: id, tagId })
            if (addTagRelationalInstance.result !== 1) return addTagRelationalInstance
        }

        return consequencer.success(id, 'success', 2345)
    }

    const deleteHandle = async () => {
        const deleteTagRelationalInstance = await service.tag.deleteRelationalByTaskId(id)
        if (deleteTagRelationalInstance.result !== 1) return addTagRelationalInstance
        return consequencer.success('', 'success', 2345)
    }

    const editHandle = async () => {
        const deleteTagRelationalInstance = await deleteHandle()
        if (deleteTagRelationalInstance.result !== 1) return addTagRelationalInstance
        return await addHandle()
    }

    const originalTagsIdInstance = await service.tag.getTagRelationalByTaskId(id)
    if (originalTagsIdInstance.result !== 1) return originalTagsIdInstance

    const originalTagsId = originalTagsIdInstance.data.map(({ tagId }) => tagId)
    const addSituation = !taskTagId && tagsId.length > 0
    const deleteSituation = !!taskTagId && (!tagsId || tagsId.length === 0)
    const editSituation = !!taskTagId && !!tagsId && JSON.stringify(originalTagsId) !== JSON.stringify(tagsId)
    console.log('addSituation', addSituation)
    console.log('deleteSituation', deleteSituation)
    console.log('editSituation', editSituation)

    if (addSituation) return await addHandle()
    if (deleteSituation) return await deleteHandle()
    if (editSituation) return await editHandle()

    return consequencer.success()
}

/**
 * 策略, 所有值必须传值过来
 */
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

    const originTaskInstance = await service.task.getById(id)
    if (originTaskInstance.result !== 1) return responseHanle.json(originTaskInstance)
    const originTask = originTaskInstance.data
    let updateData = ObjectHelper.updataAttachHandle(originTask, { title, content, specific, measurable, attainable, relevant, timeBound, longTermId, minEffectTimestamp, maxEffectTimestamp, status, priority })

    const editInstance = await service.task.edit(id, updateData)
    responseHanle.json(editInstance)
}

const Task = {
    get_task_list: getTaskList,
    post_task_add: addTask,
    post_task_edit: editTask
}

export default Task

