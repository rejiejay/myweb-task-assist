import dataAccessObject from './data-access-object'

import SQLite from './../../module/SQLite/index.js'
import consequencer from './../../utils/consequencer'
import ArrayHelper from './../../utils/array-helper'

const tableTagRelational = new SQLite.TableHandle('taskTagRelational', dataAccessObject.taskTagRelational)
const tableTags = new SQLite.TableHandle('taskTags', dataAccessObject.taskTags)

/**
 * 通过 [关系表] 任务id标识 获取所有 [映射表] 数据 
 */
const getTaskTagsById = async function getTaskTagsById(taskId) {
    const tagsRelationalInstance = await this.getTagRelationalByTaskId(taskId)
    if (tagsRelationalInstance.result !== 1) return tagsRelationalInstance
    const tagsRelational = tagsRelationalInstance.data
    const tagsIds = tagsRelational.map(({ tagId }) => tagId)

    const sqlHandle = new SQLite.SqlHandle()
    tagsIds.forEach(tagId => sqlHandle.addOrFilterSql(`id = ${tagId}`))
    const tagsListInstance = await tableTags.list(sqlHandle.toSqlString())
    if (tagsListInstance.result !== 1) return tagsListInstance
    const tagsList = tagsListInstance.data

    return consequencer.success(tagsList)
}

/**
 * 列出所有[映射表]标签
 */
const listAllTaskTags = async function listAllTaskTags() {
    const tagsInstance = await tableTags.list()
    if (tagsInstance.result !== 1) return tagsInstance
    const tagsList = tagsInstance.data
    return consequencer.success(tagsList)
}

/**
 * 通过 [映射表] 标签名称 获取所有 [映射表] 数据 
 * 例如: ['gwy', 'js']
 * 共用方法
 */
const getTagIdsByNames = async function getTagIdsByNames(tagFields) {
    const tagSqlHandle = new SQLite.SqlHandle()

    tagFields.forEach(field => tagSqlHandle.addOrFilterSql(`name = "${field}"`))
    const tagsInstance = await tableTags.list(tagSqlHandle.toSqlString())
    if (tagsInstance.result !== 1) return tagsInstance
    const tagsList = tagsInstance.data

    return consequencer.success(tagsList)
}

/**
 * 通过 [关系表] 任务id标识 获取所有 [关系表] 数据 
 */
const getTagRelationalByTaskId = async function getTagRelationalByTaskId(taskId) {
    const tagSqlHandle = new SQLite.SqlHandle()
    tagSqlHandle.addAndFilterSql(`taskId = ${taskId}`)

    const tagsInstance = await tableTagRelational.list(tagSqlHandle.toSqlString())
    if (tagsInstance.result !== 1) return tagsInstance
    const tagsList = tagsInstance.data

    return consequencer.success(tagsList)
}

/**
 * 通过 [映射表] 标签名称 获取所有 [关系表] 数据 
 */
const findTagRelationalByField = async function findTagRelationalByField(tagFields) {
    const tagsInstance = await this.getTagIdsByNames(tagFields)
    if (tagsInstance.result !== 1) return tagsInstance
    const tagIds = tagsInstance.data.map(({ id }) => id)

    const tagsRelationalSqlHandle = new SQLite.SqlHandle()
    tagIds.forEach(tagId => tagsRelationalSqlHandle.addOrFilterSql(`tagId = ${tagId}`))
    const tagsRelationalInstance = await tableTagRelational.list(tagsRelationalSqlHandle.toSqlString())
    if (tagsRelationalInstance.result !== 1) return tagsRelationalInstance
    const tagRelational = ArrayHelper.uniqueDeduplicationByKey({ array: tagsRelationalInstance.data, key: 'taskId' })

    return consequencer.success(tagRelational)
}

/**
 * 通过标签名称新增[关系表] 兼 [映射表]
 * @param {*} name 映射表 标签名称
 */
const addByTagName = async function addByTagName(name) {
    const setTagsInstance = await tableTags.add({ name })
    if (setTagsInstance.result !== 1) return setTagsInstance

    const getTagsInstance = await this.getTagIdsByNames([name])
    if (getTagsInstance.result !== 1) return getTagsInstance
    const tagIds = getTagsInstance.data

    if (tagIds.length <= 0) return consequencer.error(`can not add ${name}`)

    return consequencer.success(tagIds[0])
}

/**
 * 通过 [映射表] id标识 编辑 [映射表] 数据 
 */
const editTag = async function editTag({ id, name }) {
    const tagsUpdateInstance = await tableTags.updata(id, { name })
    if (tagsUpdateInstance.result !== 1) return tagsUpdateInstance
    return tagsUpdateInstance
}

/**
 * 通过 [关系表] 任务id标识 删除 [关系表] 数据 
 */
const deleteRelationalByTagId = async function deleteRelationalByTagId({ id }) {
    const findTagInstance = await tableTags.find(id)
    if (findTagInstance.result !== 1) return findTagInstance

    const deleteTagInstance = await tableTags.del(id)
    if (deleteTagInstance.result !== 1) return deleteTagInstance

    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`tagId = ${id}`)
    const relationalTagInstance = await tableTagRelational.list(sqlHandle.toSqlString())
    if (relationalTagInstance.result !== 1) return relationalTagInstance
    const relationalTags = relationalTagInstance.data

    for (let index = 0; index < relationalTags.length; index++) {
        const relationalElement = relationalTags[index]
        const deleteRelationalInstance = await tableTagRelational.del(relationalElement.id)
        if (deleteRelationalInstance.result !== 1) return deleteRelationalInstance
    }

    return consequencer.success()
}

/**
 * 新增 [关系表] 数据 
 */
const addTagRelational = async function addTagRelational({ taskId, tagId }) {
    const relationalTagInstance = await tableTagRelational.add({ taskId, tagId })
    return relationalTagInstance
}

/**
 * 通过 [关系表] 任务id标识 删除 [关系表] 数据 
 */
const deleteRelationalByTaskId = async function deleteRelationalByTaskId(taskId) {
    const tagsRelationalInstance = await this.getTagRelationalByTaskId(taskId)
    if (tagsRelationalInstance.result !== 1) return tagsRelationalInstance
    const tagsRelational = tagsRelationalInstance.data

    for (let index = 0; index < tagsRelational.length; index++) {
        const relationalElement = tagsRelational[index]
        const deleteRelationalInstance = await tableTagRelational.del(relationalElement.id)
        if (deleteRelationalInstance.result !== 1) return deleteRelationalInstance
    }

    return consequencer.success()
}

const tag = {
    getTaskTagsById,
    listAllTaskTags,
    getTagIdsByNames,
    findTagRelationalByField,
    getTagRelationalByTaskId,
    addByTagName,
    editTag,
    deleteRelationalByTagId,
    addTagRelational,
    deleteRelationalByTaskId
}

export default tag
