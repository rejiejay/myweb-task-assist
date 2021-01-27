import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'
import valuesStructuresVerify from './../../utils/values-structures-verify'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

/**
 * 注意: 这里需要防止SQL注入, 因为是字符串, 所以必须要考虑到这层因素.
 */
const getList = function getList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom }) {
    const sqlHandle = new SQLite.SqlHandle()
    if (!!longTermId) sqlHandle.addAndFilterSql(`longTermId = ${longTermId}`)

    const tagsVerifyInstance = valuesStructuresVerify.isArrayNil(tags)
    if (tagsVerifyInstance.result === 1) {
        /**
         * TODO
         * 这里需要通过 taskTagRelational 表进行查询 taskTagId
         * 然后根据 taskTagId 进行查询所有数据
         */
    }
    if (!!minEffectTimestamp) sqlHandle.addAndFilterSql(`minEffectTimestamp <= ${minEffectTimestamp}`)
    if (!!maxEffectTimestamp) sqlHandle.addAndFilterSql(`maxEffectTimestamp >= ${maxEffectTimestamp}`)

    const statusVerifyInstance = valuesStructuresVerify.isArrayNil(status)
    if (statusVerifyInstance.result === 1) sqlHandle.addAndFilterSql(`maxEffectTimestamp >= ${maxEffectTimestamp}`)

    return tableHandle.list(sqlHandle.toWhereString())
}

const task = {
    getList
}

export default task
