import SQLite from './../../module/SQLite/index.js'
import SqlHandle from './../../module/SQLite/sql-handle.js'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('longTermProgram', dataAccessObject)

const getAll = async function getAll(longTermId) {
    const sqlHandle = new SqlHandle()
    sqlHandle.addAndFilterSql(`parentId = \"${longTermId}\"`)
    sqlHandle.addOrder('operationalPosition', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return find
}

const longTermProgramList = {
    getAll,
}

export default longTermProgramList