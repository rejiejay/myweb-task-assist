/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'

/**
 * 通过任务 taskTagId 查询所有 tags name
 */
const getTaskTagsById = async function getTaskTagsById({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id, 'taskId')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.tag.getTaskTagsById(id)
    responseHanle.json(result)
}

/**
 * 查询所有 tags name
 */
const listAllTaskTags = async function listAllTaskTags(parameter, responseHanle) {
    const result = await service.tag.listAllTaskTags()
    responseHanle.json(result)
}

const addTagByName = async function addTagByName({ tagName }, responseHanle) {
    if (!tagName) return responseHanle.failure('tagName 不能为空')

    const result = await service.tag.addByTagName(tagName)
    responseHanle.json(result)
}

const Tag = {
    get_tag_id: getTaskTagsById,
    get_tag_all: listAllTaskTags,
    post_tag_add: addTagByName
}

export default Tag

