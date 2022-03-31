import _ from 'lodash'

import service from './../../service/long-term/index'
import valuesStructuresVerify from './../../utils/values-structures-verify'

const getAllLongTerm = async ({ }, responseHanle) => {
    const result = await service.getAll()
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const getLongTermByPagination = async (query, responseHanle) => {
    let pageNo = _.get(query, 'pageNo', '1');
    let pageSize = _.get(query, 'pageSize', '8');

    const pageNoVerify = valuesStructuresVerify.isIntNumString(pageNo, 'pageNo')
    if (pageNoVerify instanceof Error) return pageNoVerify
    pageNo = +pageNo

    const pageSizeVerify = valuesStructuresVerify.isIntNumString(pageSize, 'pageSize')
    if (pageSizeVerify instanceof Error) return pageSizeVerify
    pageSize = +pageSize

    const result = await service.getByPagination(pageNo, pageSize)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success({
        list: result.find,
        count: result.count,
    })
}

const getLongTermDetailById = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const result = await service.getById(id)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const addLongTerm = async ({ name }, responseHanle) => {
    const nameVerify = valuesStructuresVerify.isStringNil(name, 'name')
    if (nameVerify instanceof Error) return responseHanle.failure(nameVerify.message);

    const result = await service.addHandle(name)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editLongTerm = async ({ id, name, description }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const nameVerify = valuesStructuresVerify.isStringNil(name, 'name')
    if (nameVerify instanceof Error) return responseHanle.failure(nameVerify.message);
    const descriptionVerify = valuesStructuresVerify.isStringNil(description, 'description')
    if (descriptionVerify instanceof Error) description = ''

    const result = await service.editHandle(id, name, description)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const deleteLongTerm = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const result = await service.deleteHandle(id)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const setLongTermToTop = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const result = await service.setOperationalPositionById(id)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const LongTerm = {
    get_long_term_all: getAllLongTerm,
    get_long_term_pagination: getLongTermByPagination,

    get_long_term_id: getLongTermDetailById,

    post_long_term_add: addLongTerm,
    post_long_term_edit: editLongTerm,
    post_long_term_delete: deleteLongTerm,
    post_long_term_to_top: setLongTermToTop,
}

export default LongTerm