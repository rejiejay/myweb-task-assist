import SQLite from './../../module/SQLite/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import CONST from './../../library/consts'
import tag from './../tag/index'
import consequencer from './../../utils/consequencer'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

const getList = async function getList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom, pageNo, pageSize }) {
    const sqlHandle = new SQLite.SqlHandle()
    if (!!longTermId) sqlHandle.addAndFilterSql(`longTermId = ${longTermId}`)

    if (!!isRandom) sqlHandle.addOrderByRandom(pageSize ? pageSize : CONST.defaultPageSize)
    if (!!pageNo) sqlHandle.addPagination(pageNo, pageSize)

    const tagsVerifyInstance = valuesStructuresVerify.isArrayNil(tags, 'tags')
    if (tagsVerifyInstance.result === 1) {
        const taskTagyInstance = await tag.findTaskIdsByField(tags)
        if (taskTagyInstance.result !== 1) return taskTagyInstance
        const taskTags = taskTagyInstance.data
        const taskTagIds = taskTags.map(({ taskId }) => taskId)
        sqlHandle.addAndFilterSql(`(${taskTagIds.map(id => `id = ${id}`).join(' OR ')})`)
    }

    if (!!minEffectTimestamp && !!maxEffectTimestamp) {
        sqlHandle.addAndFilterSql(`minEffectTimestamp >= ${minEffectTimestamp}`)
        sqlHandle.addAndFilterSql(`maxEffectTimestamp <= ${maxEffectTimestamp}`)
    } else {
        if (!!minEffectTimestamp) {
            sqlHandle.addAndFilterSql(`minEffectTimestamp >= ${minEffectTimestamp}`)
            sqlHandle.addAndFilterSql(`maxEffectTimestamp <= ${minEffectTimestamp}`)
        }
        if (!!maxEffectTimestamp) {
            sqlHandle.addAndFilterSql(`maxEffectTimestamp <= ${maxEffectTimestamp}`)
            sqlHandle.addAndFilterSql(`minEffectTimestamp >= ${maxEffectTimestamp}`)
        }
    }

    const statusVerifyInstance = valuesStructuresVerify.isArrayNil(status, 'status')
    if (statusVerifyInstance.result === 1) sqlHandle.addAndFilterSql(`(${status.map(val => `status = ${val}`).join(' OR ')})`)

    const prioritysVerifyInstance = valuesStructuresVerify.isArrayNil(prioritys, 'prioritys')
    if (prioritysVerifyInstance.result === 1) sqlHandle.addAndFilterSql(`(${prioritys.map(val => `prioritys = ${val}`).join(' OR ')})`)

    return tableHandle.list(sqlHandle.toSqlString())
}

const getCount = async function getCount() {
    const queryInstance = await tableHandle.query('SELECT COUNT(id) FROM task')
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
