/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'

const getTaskList = async function getTaskList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom, pageNo, pageSize }, responseHanle) {
    const verifys = [
        { value: longTermId, field: 'longTermId', method: 'isId' },
        { value: tags, field: 'tags', method: 'isArrayNilString' },
        { value: minEffectTimestamp, field: 'minEffectTimestamp', method: 'isTimestamp' },
        { value: maxEffectTimestamp, field: 'maxEffectTimestamp', method: 'isTimestamp' },
        { value: status, field: 'status', method: 'isArrayNilString' },
        { value: prioritys, field: 'prioritys', method: 'isArrayNilString' },
        { value: isRandom, field: 'isRandom', method: 'isBooleanString' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    if (!!longTermId) longTermId = +longTermId
    if (!!tags) tags = JSON.parse(tags)
    if (!!minEffectTimestamp) minEffectTimestamp = +minEffectTimestamp
    if (!!maxEffectTimestamp) maxEffectTimestamp = +maxEffectTimestamp
    if (!!status) status = JSON.parse(status)
    if (!!prioritys) prioritys = JSON.parse(prioritys)
    if (!!isRandom) isRandom = isRandom === 'true'
    const result = await service.task.getList({ longTermId, tags, minEffectTimestamp, maxEffectTimestamp, status, prioritys, isRandom })

    responseHanle.json(result)
}

const Task = {
    get_task_list: getTaskList
}

export default Task

