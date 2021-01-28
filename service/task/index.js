import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import CONST from './../../library/consts'

import tag from './../tag/index'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

/**
 * 注意: 这里需要防止SQL注入, 因为是字符串, 所以必须要考虑到这层因素.
 */
const getList = async function getList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom, pageNo, pageSize }) {
    const sqlHandle = new SQLite.SqlHandle()
    if (!!longTermId) sqlHandle.addAndFilterSql(`longTermId = ${longTermId}`)

    if (!!isRandom) sqlHandle.addOrderByRandom(pageSize ? pageSize : CONST.defaultPageSize)
    if (!!pageNo) sqlHandle.addPagination(pageNo, pageSize)

    const tagsVerifyInstance = valuesStructuresVerify.isArrayNil(tags, 'tags')
    if (tagsVerifyInstance.result === 1) {
        const taskTagyInstance = await tag.findTaskIdsByField(tags)
        if (taskTagyInstance.result !== 1) return taskTagyInstance

        const taskTagIds = taskTagyInstance.data
        sqlHandle.addAndFilterSql(`(${taskTagIds.map(id => `taskTagId = ${id}`).join(' OR ')})`)
    }
    if (!!minEffectTimestamp) sqlHandle.addAndFilterSql(`minEffectTimestamp <= ${minEffectTimestamp}`)
    if (!!maxEffectTimestamp) sqlHandle.addAndFilterSql(`maxEffectTimestamp >= ${maxEffectTimestamp}`)

    const statusVerifyInstance = valuesStructuresVerify.isArrayNil(status, 'status')
    if (statusVerifyInstance.result === 1) sqlHandle.addAndFilterSql(`(${status.map(val => `status = ${val}`).join(' OR ')})`)

    const prioritysVerifyInstance = valuesStructuresVerify.isArrayNil(prioritys, 'prioritys')
    if (prioritysVerifyInstance.result === 1) sqlHandle.addAndFilterSql(`(${prioritys.map(val => `prioritys = ${val}`).join(' OR ')})`)

    return tableHandle.list(sqlHandle.toSqlString())
}

const task = {
    getList
}

export default task
