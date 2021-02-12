import controller from './../controller/tag'
import service from './../service/tag'

import utils from './utils'

//  ['js', 'exam', 'love', 'gwy']
const getTaskTagsById = responseHanle => controller.get_tag_id({ id: 1 }, responseHanle)

//  [{ id: 1, name: 'js' }, { id: 2, name: 'exam' }, { id: 3, name: 'love' }, { id: 4, name: 'gwy' }]
const listAllTaskTags = responseHanle => controller.get_tag_all({}, responseHanle)

const findTaskIdsByField = async responseHanle => {
    const tagFields = ['love']
    const taskIdsInstance = await service.findTagRelationalByField(tagFields)
    responseHanle.json(taskIdsInstance)
}

const addTaskTagByField = responseHanle => controller.post_tag_add({ tagName: 'testAdd' }, responseHanle)

const editTaskTagByField = responseHanle => controller.post_tag_edit({ id: 1, name: 'testEdit' }, responseHanle)

const deleteTaskTagByField = responseHanle => controller.post_tag_delete({ id: 1 }, responseHanle)

const tags = {
    getTaskTagsById: utils.resolveHandle(getTaskTagsById, { isShowResult: false }),
    listAllTaskTags: utils.resolveHandle(listAllTaskTags, { isShowResult: false }),
    findTaskIdsByField: utils.resolveHandle(findTaskIdsByField, { isShowResult: false }),
    addTaskTagByField: utils.resolveHandle(addTaskTagByField, { isShowResult: false }),
    editTaskTagByField: utils.resolveHandle(editTaskTagByField, { isShowResult: false }),
    deleteTaskTagByField: utils.resolveHandle(deleteTaskTagByField, { isShowResult: false })
}

export default tags
