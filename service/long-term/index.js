import SQLite from './../../module/SQLite/index.js'
import StringHelper from './../../utils/string-helper'
import consequencer from './../../utils/consequencer'

import dataAccessObject from './data-access-object'

const relationalTable = new SQLite.TableHandle('longTermTaskRelational', dataAccessObject.longTermTaskRelational)
const detailTable = new SQLite.TableHandle('longTermRecordDetail', dataAccessObject.longTermRecordDetail)

const listAllTaskRelational = function listAllTaskRelational() {
    return relationalTable.list('')
}

const getOneTaskRelational = function getOneTaskRelational(id) {
    return relationalTable.find(+id)
}

const listAllLongTermRecordDetail = function getOneTaskRelational(id) {
    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`categoryIdentify = "${id}"`)
    return detailTable.list(sqlHandle.toSqlString())
}

const getOneLongTermRecordDetail = function getOneLongTermRecordDetail(id) {
    return detailTable.find(+id)
}

const editLongTermRecordDetail = function editLongTermRecordDetail(id, editUpData) {
    return detailTable.updata(id, editUpData)
}

const deleteLongTermRecordDetail = function deleteLongTermRecordDetail(id) {
    return detailTable.del(id)
}

const addLongTermRecordDetail = async function addLongTermRecordDetail({ parentUniquelyIdentify, categoryIdentify }) {
    const uniquelyIdentify = StringHelper.createRandomStr({ length: 32 })
    const createTimestamp = new Date().getTime()
    const longTermRecordDetail = {
        uniquelyIdentify,
        categoryIdentify,
        parentUniquelyIdentify,
        createTimestamp,
        detail: ' '
    }

    const addInstance = await detailTable.add(longTermRecordDetail)
    if (addInstance.result !== 1) return addInstance

    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`uniquelyIdentify = "${uniquelyIdentify}"`)
    const findInstance = await detailTable.list(sqlHandle.toSqlString())
    if (findInstance.result !== 1) return findInstance

    return consequencer.success(findInstance.data[0])
}

const editLongTermTaskRelational = async function editLongTermTaskRelational({ id, spreadZoomIdentify, title, record }) {
    const findInstance = await relationalTable.find(+id)
    if (findInstance.result !== 1) return findInstance
    const longTermTaskRelational = findInstance.data

    return relationalTable.updata(id, { ...longTermTaskRelational, spreadZoomIdentify, title, record })
}

const addLongTermTaskRelational = async function addLongTermTaskRelational(title) {
    const record = 'Nil'
    const detailCategoryIdentify = StringHelper.createRandomStr({ length: 32 })
    return relationalTable.add({ title, record, detailCategoryIdentify })
}

const deleteLongTermTaskRelational = async function deleteLongTermTaskRelational(id) {
    return relationalTable.del(id)
}

const longTerm = {
    listAllTaskRelational,
    getOneTaskRelational,
    listAllLongTermRecordDetail,
    getOneLongTermRecordDetail,
    editLongTermRecordDetail,
    deleteLongTermRecordDetail,
    addLongTermRecordDetail,
    editLongTermTaskRelational,
    addLongTermTaskRelational,
    deleteLongTermTaskRelational
}

export default longTerm
