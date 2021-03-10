/**
 * controller long term 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import ObjectHelper from './../../utils/object-helper'

const listAllLongTermTaskRelational = async function listAllLongTermTaskRelational(parameter, responseHanle) {
    const result = await service.longTerm.listAllTaskRelational()
    responseHanle.json(result)
}

const getLongTermTaskRelational = async function getLongTermTaskRelational({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id, 'LongTermId')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.longTerm.getOneTaskRelational(id)
    responseHanle.json(result)
}

const listAllLongTermRecordDetail = async function listAllLongTermRecordDetail({ longTermRecordDetailCategoryId }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isStringNil(longTermRecordDetailCategoryId, 'longTermRecordDetailCategoryId')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.longTerm.listAllLongTermRecordDetail(longTermRecordDetailCategoryId)
    responseHanle.json(result)
}

const editLongTermRecordDetail = async function editLongTermRecordDetail({ id, uniquelyIdentify, parentUniquelyIdentify, detail, createTimestamp }, responseHanle) {
    const verifys = [
        { value: id, field: 'id', method: 'isId' },
        { value: uniquelyIdentify, field: 'uniquelyIdentify', method: 'isStringNil' },
        { value: parentUniquelyIdentify, field: 'parentUniquelyIdentify', method: 'isStringNil' },
        { value: detail, field: 'detail', method: 'isStringNil' },
        { value: createTimestamp, field: 'createTimestamp', method: 'isTimestamp' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const originRecordDetailInstance = await service.longTerm.getOneLongTermRecordDetail(id)
    if (originRecordDetailInstance.result !== 1) return responseHanle.json(originRecordDetailInstance)
    const originRecordDetail = originRecordDetailInstance.data
    let updateData = ObjectHelper.updataAttachHandle(originRecordDetail, { uniquelyIdentify, parentUniquelyIdentify, detail, createTimestamp })

    const result = await service.longTerm.editLongTermRecordDetail(id, updateData)
    responseHanle.json(result)
}

const deleteLongTermRecordDetail = async function deleteLongTermRecordDetail({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id, 'LongTermId')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.longTerm.deleteLongTermRecordDetail(id)
    responseHanle.json(result)
}

const addLongTermRecordDetail = async function addLongTermRecordDetail({ parentUniquelyIdentify, categoryIdentify }, responseHanle) {
    const verifys = [
        { value: parentUniquelyIdentify, field: 'parentUniquelyIdentify', method: 'isStringNil' },
        { value: categoryIdentify, field: 'categoryIdentify', method: 'isStringNil' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.longTerm.addLongTermRecordDetail({ parentUniquelyIdentify, categoryIdentify })
    responseHanle.json(result)
}

const addLongTermTaskRelational = async function addLongTermTaskRelational({ longTermTaskName }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isStringNil(longTermTaskName, 'longTermTaskName')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.longTerm.addLongTermTaskRelational(longTermTaskName)
    responseHanle.json(result)
}

const editLongTermTaskRelational = async function editLongTermTaskRelational({ id, spreadZoomIdentify, title, record }, responseHanle) {
    const verifys = [
        { value: id, field: 'id', method: 'isId' },
        { value: spreadZoomIdentify, field: 'spreadZoomIdentify', method: 'isString' },
        { value: title, field: 'title', method: 'isString' },
        { value: record, field: 'record', method: 'isString' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const taskRelationalInstance = await service.longTerm.getOneTaskRelational(id)
    if (taskRelationalInstance.result !== 1) return responseHanle.json(taskRelationalInstance)
    const taskRelational = taskRelationalInstance.data
    const updateRelational = {
        ...taskRelational,
        spreadZoomIdentify: spreadZoomIdentify || taskRelational.spreadZoomIdentify,
        title: title || taskRelational.title,
        record: record || taskRelational.record
    }

    const result = await service.longTerm.editLongTermTaskRelational(updateRelational)
    responseHanle.json(result)
}

const deleteLongTermTaskRelational = async function deleteLongTermTaskRelational({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id, 'id')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const taskRelationalInstance = await service.longTerm.getOneTaskRelational(id)
    if (taskRelationalInstance.result !== 1) return responseHanle.json(taskRelationalInstance)
    const taskRelational = taskRelationalInstance.data

    const allTaskDetailInstance = await service.longTerm.listAllLongTermRecordDetail(taskRelational.detailCategoryIdentify)
    if (allTaskDetailInstance.result !== 1) return responseHanle.json(allTaskDetailInstance)
    const allTaskDetail = allTaskDetailInstance.data

    for (let index = 0; index < allTaskDetail.length; index++) {
        const taskDetail = allTaskDetail[index];
        const longTermRecordDetailInstance = await service.longTerm.deleteLongTermRecordDetail(taskDetail.id)
        if (longTermRecordDetailInstance.result !== 1) return responseHanle.json(longTermRecordDetailInstance)
    }

    const result = await service.longTerm.deleteLongTermTaskRelational(id)
    responseHanle.json(result)
}

const longTerm = {
    get_longTerm_relational_all: listAllLongTermTaskRelational,
    get_longTerm_relational_id: getLongTermTaskRelational,
    get_longTerm_detail: listAllLongTermRecordDetail,
    post_longTerm_detail_edit: editLongTermRecordDetail,
    post_longTerm_detail_delete: deleteLongTermRecordDetail,
    post_longTerm_detail_add: addLongTermRecordDetail,
    post_longTerm_relational_edit: editLongTermTaskRelational,
    post_longTerm_relational_add: addLongTermTaskRelational,
    post_longTerm_relational_delete: deleteLongTermTaskRelational
}

export default longTerm