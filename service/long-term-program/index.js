import SQLite from './../../module/SQLite/index.js'
import SqlHandle from './../../module/SQLite/sql-handle.js'

import StringHelper from './../../utils/string-helper'

import taskLongTerm from './../task/long-term'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('longTermProgram', dataAccessObject)

const getByLongTermId = async function getByLongTermId(longTermId) {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql(`parentId = \"${longTermId}\"`)
    sqlHandle.addOrder('operationalPosition', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return find
}

const addHandle = async function addHandle(longTermId, name) {
    const id = StringHelper.createRandomStr({ length: 16 })
    const nowTimestamp = new Date().getTime()
    const longTermProgram = {
        id,
        parentId: longTermId,
        name,
        operationalPosition: nowTimestamp
    }

    const result = await tableHandle.add(longTermProgram)
    if (result instanceof Error) return result

    return await tableHandle.find(id)
}

const editHandle = async function editHandle(id, name) {
    return await tableHandle.updata(id, { name })
}

/**
 * 查找是否存在数据, 不存在才可以删除
 */
const deleteHandle = async function deleteHandle(id) {
    const longTerm = await tableHandle.find(id)
    if (longTerm instanceof Error) return longTerm

    const longTermId = longTerm.parentId
    const longTermProgramId = longTerm.id

    const result = await taskLongTerm.getByLongTermProgram(longTermId, longTermProgramId)
    if (result instanceof Error) return result

    if (result.length > 0) {
        return new Error('存在数据, 不可删除!')
    }

    return await tableHandle.del(longTermProgramId)
}

const setOperationalPositionById = async function setOperationalPositionById(
    id,
    timestamp = new Date().getTime()
) {
    return await tableHandle.updata(id, { operationalPosition: timestamp })
}

const longTermProgram = {
    getByLongTermId,
    addHandle,
    editHandle,
    deleteHandle,
    setOperationalPositionById,
}

export default longTermProgram
