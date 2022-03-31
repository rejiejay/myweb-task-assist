import valuesStructuresVerify from './../../utils/values-structures-verify'

import service from './../../service/long-term-program'

const getAllLongTermProgram = async ({ longTermId }, responseHanle) => {
    const longTermIdVerify = valuesStructuresVerify.isStringNil(longTermId, 'longTermId')
    if (longTermIdVerify instanceof Error) return responseHanle.failure(longTermIdVerify.message);

    const result = await service.getByLongTermId(longTermId)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const addLongTermProgram = async ({ longTermId, name }, responseHanle) => {
    const longTermIdVerify = valuesStructuresVerify.isStringNil(longTermId, 'longTermId')
    if (longTermIdVerify instanceof Error) return responseHanle.failure(longTermIdVerify.message);
    const nameVerify = valuesStructuresVerify.isStringNil(name, 'name')
    if (nameVerify instanceof Error) return responseHanle.failure(nameVerify.message);

    const result = await service.addHandle(longTermId, name)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editLongTermProgram = async ({ id, name }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const nameVerify = valuesStructuresVerify.isStringNil(name, 'name')
    if (nameVerify instanceof Error) return responseHanle.failure(nameVerify.message);

    const result = await service.editHandle(id, name)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const deleteLongTermProgram = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const result = await service.deleteHandle(id)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const setLongTermProgramToTop = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const result = await service.setOperationalPositionById(id)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const longTermProgram = {
    get_long_term_program_list: getAllLongTermProgram,

    post_long_term_program_add: addLongTermProgram,
    post_long_term_program_edit: editLongTermProgram,
    post_long_term_program_delete: deleteLongTermProgram,
    post_long_term_program_to_top: setLongTermProgramToTop,
}

export default longTermProgram