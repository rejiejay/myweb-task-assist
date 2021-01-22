/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'

const getTaskTagsById = function getTaskTagsById(parameter, responseHanle) {
    service.tag.findOne(1)
    .then(
        result => responseHanle.json(result),
        error => responseHanle.json(error)
    )
}

const Tag = {
    get_tag_id: getTaskTagsById
}

export default Tag

