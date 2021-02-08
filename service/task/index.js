import SQLite from './../../module/SQLite/index.js'
import CONST from './../../library/consts'
import consequencer from './../../utils/consequencer'

import tag from './../tag'
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

const add = async function add({ title, content, specific, measurable, attainable, relevant, timeBound, longTermId, tagsId, minEffectTimestamp, maxEffectTimestamp, status, priority }) {
    let addData = { title, content, createTimestamp: new Date().getTime() }
    if (specific) addData.specific = specific
    if (measurable) addData.measurable = measurable
    if (attainable) addData.attainable = attainable
    if (relevant) addData.relevant = relevant
    if (timeBound) addData.timeBound = timeBound
    if (longTermId) addData.longTermId = longTermId
    if (minEffectTimestamp) addData.minEffectTimestamp = minEffectTimestamp
    if (maxEffectTimestamp) addData.maxEffectTimestamp = maxEffectTimestamp
    if (status) addData.status = status
    if (priority) addData.priority = priority
    const addInstance = await tableHandle.add(addData)
    // if (addInstance.result !== 1) return addInstance
    // if (!tagsId || tagsId.length === 0) return addInstance

    // const sqlHandle = new SQLite.SqlHandle()
    // sqlHandle.addAndFilterSql(`title = ${title}`)
    // sqlHandle.addAndFilterSql(`content = ${content}`)
    // sqlHandle.addAndFilterSql(`createTimestamp = ${addData.createTimestamp}`)
    // const queryInstance = await tableHandle.list(sqlHandle.toSqlString())
    // if (queryInstance.result !== 1) return queryInstance
    // const queryData = queryInstance.data
    // if (queryData.length <= 0) return consequencer.error('新增失败')
    // const addData = queryData[0]

    // for (let index = 0; index < tagsId.length; index++) {
    //     const tagId = array[tagsId];
    //     const addTagRelationalInstance = await tag.addTagRelational({ taskId: addData.id, tagId })
    //     if (addTagRelationalInstance.result !== 1) return addTagRelationalInstance
    // }

    return addInstance
}

const edit = async function edit({ id, title, content, specific, measurable, attainable, relevant, timeBound, longTermId, tagsId, minEffectTimestamp, maxEffectTimestamp, status, priority }) { }

const task = {
    getList,
    getCount,
    add,
    edit
}

export default task
