import SQLite from './../../module/SQLite/index.js'
import SqlHandle from './../../module/SQLite/sql-handle.js'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

/**
 * ! longTermId
 * ! deadlineTimestamp
 * ! completedTimestamp
 * sort: operationalPosition
 */
const getByUnCategorized = async (
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('longTermId IS NULL') // 不是长期任务
    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 且任务未完成的状态
    sqlHandle.addAndFilterSql('deadlineTimestamp IS NULL') // 且任务未设定期限

    if (tag) sqlHandle.addAndFilterSql(`tag = \"${tag}\"`)
    if (progress) sqlHandle.addAndFilterSql(`progress = \"${progress}\"`)
    if (priority) sqlHandle.addAndFilterSql(`priority = \"${priority}\"`)

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrder('operationalPosition', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    sqlHandle.addPagination(pageNo, pageSize)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

/**
 * ! completedTimestamp
 * sortType: updateTimestamp || readCount
 */
const getBySort = async (
    sortType = 'updateTimestamp',
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态

    sqlHandle.addOrder(
        sortType === 'updateTimestamp' ? sortType : 'readCount',
        false
    ) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列

    if (tag) sqlHandle.addAndFilterSql(`tag = \"${tag}\"`)
    if (progress) sqlHandle.addAndFilterSql(`progress = \"${progress}\"`)
    if (priority) sqlHandle.addAndFilterSql(`priority = \"${priority}\"`)

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addPagination(pageNo, pageSize)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

/**
 * ! longTermId
 * ! completedTimestamp
 * sort: deadlineTimestamp
 */
const getByTimestamp = async (
    minTimestamp = null,
    maxTimestamp = null,
    pageNo = 1,
    tag = null,
    progress = null,
    priority = null,
    pageSize = 8,
) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('longTermId IS NULL') // 不是长期任务
    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 且任务未完成的状态
    if (minTimestamp) {
        sqlHandle.addAndFilterSql(`deadlineTimestamp > ${minTimestamp}`)
    }
    if (maxTimestamp) {
        sqlHandle.addAndFilterSql(`deadlineTimestamp < ${maxTimestamp}`)
    }

    if (tag) sqlHandle.addAndFilterSql(`tag = \"${tag}\"`)
    if (progress) sqlHandle.addAndFilterSql(`progress = \"${progress}\"`)
    if (priority) sqlHandle.addAndFilterSql(`priority = \"${priority}\"`)

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrder('deadlineTimestamp', true) // ASC 表示按正序排序 (即：从小到大排序) ---升序排列
    sqlHandle.addPagination(pageNo, pageSize)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

/**
 * completedTimestamp
 * sort: completedTimestamp
 */
const getByCompleted = async (pageNo) => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp NOT NULL') // 任务完成的状态

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrder('completedTimestamp', false) // DESC 表示按倒序排序 (即：从大到小排序) ---降序排列
    sqlHandle.addPagination(pageNo, 8)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

/**
 * ! completedTimestamp
 */
const getByRandomly = async () => {
    const sqlHandle = new SqlHandle()

    sqlHandle.addAndFilterSql('completedTimestamp IS NULL') // 任务未完成的状态

    const count = await tableHandle.count(sqlHandle.toSqlString())
    if (count instanceof Error) return count

    sqlHandle.addOrderByRandom(9)

    const find = await tableHandle.list(sqlHandle.toSqlString())
    if (find instanceof Error) return find

    return {
        find,
        count
    }
}

const taskList = {
    getByUnCategorized,
    getBySort,
    getByTimestamp,
    getByCompleted,
    getByRandomly,
}

export default taskList
