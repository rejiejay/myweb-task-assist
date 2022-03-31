import SQLite from './../../module/SQLite/index.js'
import SqlHandle from './../../module/SQLite/sql-handle.js'

import StringHelper from './../../utils/string-helper'

import taskLongTerm from './../task/long-term'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('longTerm', dataAccessObject)

const getAll = async function getAll() {
    const sqlHandle = new SqlHandle()

    sqlHandle.addOrder('operationalPosition', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return find
}

const getByPagination = async function getByPagination(pageNo, pageSize) {
    const sqlHandle = new SqlHandle()

    sqlHandle.addOrder('operationalPosition', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addPagination(pageNo, pageSize)
    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return { find, count }
}

const getById = async function getById(id) {
    return await tableHandle.find(id)
}

const addHandle = async function addHandle(name) {
    const id = StringHelper.createRandomStr({ length: 16 })
    const nowTimestamp = new Date().getTime()
    const longTerm = {
        id,
        name,
        operationalPosition: nowTimestamp
    }

    const result = await tableHandle.add(longTerm)
    if (result instanceof Error) return result

    return await tableHandle.find(id)
}

const editHandle = async function editHandle(id, name, description) {
    const updated = { name }
    if (description) updated.description = description
    return await tableHandle.updata(id, updated)
}

const deleteHandle = async function deleteHandle(id) {
    const result = await taskLongTerm.getByLongTermPreview(id)
    if (result instanceof Error) return result

    if (result.length > 0) {
        return new Error('存在数据, 不可删除!')
    }

    return await tableHandle.del(id)
}

const setOperationalPositionById = async function setOperationalPositionById(
    id,
    timestamp = new Date().getTime()
) {
    return await tableHandle.updata(id, { operationalPosition: timestamp })
}

const longTerm = {
    getAll,
    getByPagination,
    getById,
    addHandle,
    editHandle,
    deleteHandle,
    setOperationalPositionById,
}

export default longTerm
