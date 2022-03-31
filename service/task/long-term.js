import SQLite from './../../module/SQLite/index.js'
import SqlHandle from './../../module/SQLite/sql-handle.js'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

/**
 * longTermId
 * ! completedTimestamp
 * sortType: updateTimestamp || readCount
 */
const getBySort = async (
    sortType = 'updateTimestamp',
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态
    sqlHandle.addAndFilterSql('longTermId NOT NULL') // 并且是长期任务

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrder(
        sortType === 'updateTimestamp' ? sortType : 'readCount',
        false
    ) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    sqlHandle.addPagination(1, 8)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return { count, find }
}

/**
 * longTermId
 * ! completedTimestamp
 * sort: updateTimestamp
 */
const getByLongTermPreview = async (
    longTermId,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态
    sqlHandle.addAndFilterSql(`longTermId = \"${longTermId}\"`) // 并且是长期任务

    sqlHandle.addOrder('updateTimestamp', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    sqlHandle.addPagination(1, 8)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return find
}

/**
 * longTermId
 * ! longTermProgramId
 * ! completedTimestamp
 * sort: updateTimestamp
 */
const getByUnCategorized = async (
    longTermId,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态
    sqlHandle.addAndFilterSql(`longTermId = \"${longTermId}\"`) // 并且是长期任务
    sqlHandle.addAndFilterSql('longTermProgramId IS NULL') // 并且长期任务未分类

    sqlHandle.addOrder('updateTimestamp', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return find
}

/**
 * longTermId
 * ! longTermProgramId
 * ! completedTimestamp
 * sort: updateTimestamp
 */
const getByUnCategorizedPagination = async (
    longTermId,
    pageNo = 1,
    pageSize = 9,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态
    sqlHandle.addAndFilterSql(`longTermId = \"${longTermId}\"`) // 并且是长期任务
    sqlHandle.addAndFilterSql('longTermProgramId IS NULL') // 并且长期任务未分类

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrder('updateTimestamp', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    sqlHandle.addPagination(pageNo, pageSize)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

/**
 * longTermId
 * longTermProgramId
 * ! completedTimestamp
 * sort: updateTimestamp
 */
const getByLongTermProgram = async (
    longTermId,
    longTermProgramId,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态
    sqlHandle.addAndFilterSql(`longTermId = \"${longTermId}\"`) // 并且是长期任务
    sqlHandle.addAndFilterSql(`longTermProgramId = \"${longTermProgramId}\"`) // 并且长期任务已经分类

    sqlHandle.addOrder('updateTimestamp', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return find
}

/**
 * longTermId
 * longTermProgramId
 * ! completedTimestamp
 * sort: updateTimestamp
 */
const getByLongTermProgramPagination = async (
    longTermId,
    longTermProgramId,
    pageNo = 1,
    pageSize = 9,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态
    sqlHandle.addAndFilterSql(`longTermId = \"${longTermId}\"`) // 并且是长期任务
    sqlHandle.addAndFilterSql(`longTermProgramId = \"${longTermProgramId}\"`) // 并且长期任务已经分类

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrder('updateTimestamp', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    sqlHandle.addPagination(pageNo, pageSize)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

const taskLongTerm = {
    getBySort,
    getByLongTermPreview,

    getByUnCategorized,
    getByUnCategorizedPagination,

    getByLongTermProgram,
    getByLongTermProgramPagination,
}

export default taskLongTerm
