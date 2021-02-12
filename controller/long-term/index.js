/**
 * controller long term 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'

const listAllLongTermTaskRelational = async function listAllLongTermTaskRelational(parameter, responseHanle) {
    const result = await service.longTerm.listAll()
    responseHanle.json(result)
}

const getLongTermTaskRelational = async function getLongTermTaskRelational({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id, 'LongTermId')
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const result = await service.longTerm.getOne(id)
    responseHanle.json(result)
}

const longTerm = {
    get_longTerm_all: listAllLongTermTaskRelational,
    get_longTerm_id: getLongTermTaskRelational
}

export default longTerm

