/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import CONST from './../../library/consts'

const getTaskList = async function getTaskList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom, pageNo, pageSize }, responseHanle) {
    const verifys = [
        { value: longTermId, field: 'longTermId', method: 'isId' },
        { value: tags, field: 'tags', method: 'isArrayNilString' },
        { value: minEffectTimestamp, field: 'minEffectTimestamp', method: 'isTimestamp' },
        { value: maxEffectTimestamp, field: 'maxEffectTimestamp', method: 'isTimestamp' },
        { value: status, field: 'status', method: 'isArrayNilString' },
        { value: prioritys, field: 'prioritys', method: 'isArrayNilString' },
        { value: isRandom, field: 'isRandom', method: 'isBooleanString' },
        { value: pageNo, field: 'pageNo', method: 'isIntNumString' },
        { value: pageSize, field: 'pageSize', method: 'isIntNumString' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    let parameter = verifyInstance.data
    if ((!!isRandom && !pageSize) || (!!pageNo && !pageSize)) parameter.pageSize = CONST.defaultPageSize

    const result = await service.task.getList(parameter)

    responseHanle.json(result)
}

const Task = {
    get_task_list: getTaskList
}

export default Task

