import SQLite from './../../module/SQLite/index.js'

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

const longTerm = {
    listAllTaskRelational,
    getOneTaskRelational,
    listAllLongTermRecordDetail,
    getOneLongTermRecordDetail,
    editLongTermRecordDetail,
    deleteLongTermRecordDetail
}

export default longTerm
