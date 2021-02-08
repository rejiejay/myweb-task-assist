import dataAccessObject from './data-access-object'

import SQLite from './../../module/SQLite/index.js'
import consequencer from './../../utils/consequencer'
import ArrayHelper from './../../utils/array-helper'

const tableTagRelational = new SQLite.TableHandle('taskTagRelational', dataAccessObject.taskTagRelational)
const tableTags = new SQLite.TableHandle('taskTags', dataAccessObject.taskTags)

/**
 * 通过任务 taskTagId 查询所有 tags name
 */
const getTaskTagsById = async function getTaskTagsById(id) {
    const tagsRelationalInstance = await tableTagRelational.list(`WHERE taskId = ${id}`)
    if (tagsRelationalInstance.result !== 1) return tagsRelationalInstance
    const tagsRelational = tagsRelationalInstance.data
    const tagsIds = tagsRelational.map(({ tagsId }) => tagsId)

    const sqlHandle = new SQLite.SqlHandle()
    tagsIds.forEach(tagsId => sqlHandle.addOrFilterSql(`id = ${tagsId}`))
    const tagsListInstance = await tableTags.list(sqlHandle.toSqlString())
    if (tagsListInstance.result !== 1) return tagsListInstance
    const tagsList = tagsListInstance.data

    const tagsName = tagsList.map(({ name }) => name)
    return consequencer.success(tagsName)
}

const listAllTaskTags = async function listAllTaskTags() {
    const tagsInstance = await tableTags.list()
    if (tagsInstance.result !== 1) return tagsInstance
    const tagsList = tagsInstance.data
    return consequencer.success(tagsList)
}

const getTagIdsByNames = async function getTagIdsByNames(tagFields) {
    const tagSqlHandle = new SQLite.SqlHandle()

    tagFields.forEach(field => tagSqlHandle.addOrFilterSql(`name = "${field}"`))
    const tagsInstance = await tableTags.list(tagSqlHandle.toSqlString())
    if (tagsInstance.result !== 1) return tagsInstance
    const tagsList = tagsInstance.data
    const tagIds = tagsList

    return consequencer.success(tagIds)
}

const findTaskIdsByField = async function findTaskIdsByField(tagFields) {
    const tagsInstance = await this.getTagIdsByNames(tagFields)
    if (tagsInstance.result !== 1) return tagsInstance
    const tagIds = tagsInstance.data.map(({ id }) => id)

    const tagsRelationalSqlHandle = new SQLite.SqlHandle()
    tagIds.forEach(tagId => tagsRelationalSqlHandle.addOrFilterSql(`tagsId = ${tagId}`))
    const tagsRelationalInstance = await tableTagRelational.list(tagsRelationalSqlHandle.toSqlString())
    if (tagsRelationalInstance.result !== 1) return tagsRelationalInstance
    const taskIds = ArrayHelper.uniqueDeduplicationByKey({ array: tagsRelationalInstance.data, key: 'taskId' }).map(({ taskId }) => taskId)

    return consequencer.success(taskIds)
}

const addByTagName = async function addByTagName(name) {
    const setTagsInstance = await tableTags.add({ name })
    if (setTagsInstance.result !== 1) return setTagsInstance

    const getTagsInstance = await this.getTagIdsByNames([name])
    if (getTagsInstance.result !== 1) return getTagsInstance
    const tagIds = getTagsInstance.data

    if (tagIds.length <= 0) return consequencer.error(`can not add ${name}`)

    return consequencer.success(tagIds[0])
}

const editTag = async function editTag({ id, name }) {
    const tagsUpdateInstance = await tableTags.updata(id, { name })
    if (tagsUpdateInstance.result !== 1) return tagsUpdateInstance
    return tagsUpdateInstance
}

const deleteTag = async function deleteTag({ id }) {
    const findTagInstance = await tableTags.find(id)
    if (findTagInstance.result !== 1) return findTagInstance

    const deleteTagInstance = await tableTags.del(id)
    if (deleteTagInstance.result !== 1) return deleteTagInstance

    const sqlHandle = new SQLite.SqlHandle()
    sqlHandle.addAndFilterSql(`tagsId = ${id}`)
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

const addTagRelational = async function addTagRelational({ taskId, tagsId }) {
    const relationalTagInstance = await tableTagRelational.add({ taskId, tagsId })
    return relationalTagInstance
}

const tag = {
    getTaskTagsById,
    listAllTaskTags,
    getTagIdsByNames,
    findTaskIdsByField,
    addByTagName,
    editTag,
    deleteTag,
    addTagRelational
}

export default tag
