import SQLite from './../../module/SQLite/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import CONST from './../../library/consts'
import tag from './../tag/index'
import consequencer from './../../utils/consequencer'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

const getList = async function getList({ longTermId, taskTagIds, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom, pageNo, pageSize }) {
    const sqlHandle = new SQLite.SqlHandle()
    if (!!longTermId) sqlHandle.addAndFilterSql(`longTermId = ${longTermId}`)

    if (!!isRandom) sqlHandle.addOrderByRandom(pageSize ? pageSize : CONST.defaultPageSize)
    if (!!pageNo) sqlHandle.addPagination(pageNo, pageSize)

    if (!!taskTagIds) sqlHandle.addAndFilterSql(`(${taskTagIds.map(id => `id = ${id}`).join(' OR ')})`)

    /**
     * myRange = 数据库的数据范围
     * min = 筛选的最小时间
     * max = 筛选的最大时间
     * myRange 必须和 min 和 max 有交集
     * myRange 最大值比 min 大 = 一定存在交集
     * myRange 最小值比 max 小 = 一定存在交集
     */
    if (!!minEffectTimestamp) sqlHandle.addAndFilterSql(`maxEffectTimestamp >= ${minEffectTimestamp}`)
    if (!!maxEffectTimestamp) sqlHandle.addAndFilterSql(`minEffectTimestamp <= ${maxEffectTimestamp}`)

    if (!!status) sqlHandle.addAndFilterSql(`(${status.map(val => `status = ${val}`).join(' OR ')})`)
    if (!!prioritys) sqlHandle.addAndFilterSql(`(${prioritys.map(val => `priority = ${val}`).join(' OR ')})`)

    return tableHandle.list(sqlHandle.toSqlString())
}

const getCount = async function getCount({ longTermId, taskTagIds, minEffectTimestamp, maxEffectTimestamp, status, prioritys }) {
    const sqlHandle = new SQLite.SqlHandle()

    if (!!longTermId) sqlHandle.addAndFilterSql(`longTermId = ${longTermId}`)
    if (!!taskTagIds) sqlHandle.addAndFilterSql(`(${taskTagIds.map(id => `id = ${id}`).join(' OR ')})`)
    if (!!minEffectTimestamp) sqlHandle.addAndFilterSql(`maxEffectTimestamp >= ${minEffectTimestamp}`)
    if (!!maxEffectTimestamp) sqlHandle.addAndFilterSql(`minEffectTimestamp <= ${maxEffectTimestamp}`)
    if (!!status) sqlHandle.addAndFilterSql(`(${status.map(val => `status = ${val}`).join(' OR ')})`)
    if (!!prioritys) sqlHandle.addAndFilterSql(`(${prioritys.map(val => `priority = ${val}`).join(' OR ')})`)

    const queryInstance = await tableHandle.query(`SELECT COUNT(id) FROM task ${sqlHandle.toSqlString()}`)
    if (queryInstance.result !== 1) return queryInstance
    let result
    try {
        const query = queryInstance.data[0]
        const count = query.values[0][0]
        result = count
    } catch (error) {
        return consequencer.error(`${error}`)
    }
    return consequencer.success(result)
}

const task = {
    getList,
    getCount
}

export default task
