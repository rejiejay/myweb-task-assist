/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'

const getTaskTagsById = function getTaskTagsById({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id, 'taskId')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    service.tag.findOne(id)
        .then(
            result => responseHanle.json(result),
            error => responseHanle.json(error)
        )
}

const listAllTaskTags = function getTaskTagsById(parameter, responseHanle) {
    service.tag.alterTableDescription()
        .then(
            result => responseHanle.json(result),
            error => responseHanle.json(error)
        )
}

const Tag = {
    get_tag_id: getTaskTagsById,
    get_tag_all: listAllTaskTags
}

export default Tag

