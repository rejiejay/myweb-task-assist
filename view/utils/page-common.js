/**
 * 页面通用的工具方法
 */
import CONSTS from './../../library/consts'
import { loadPageVar, queryToUrl } from './url-helper'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import service from './../service'

const initStatusLable = value => {
    const description = CONSTS.utils.serviceValueToViewLable(CONSTS.task.status, value)
    return description
}

const initPriorityLable = value => {
    const description = CONSTS.utils.serviceValueToViewLable(CONSTS.task.priority, value)
    return description
}

const pageSplitVarString = '|[-]|'

const pageVarToFilter = async() => {
    let longTerm = { id: null, title: '' }
    let tags = []
    let multipleStatus = []
    let multiplePriority = []

    const longTermId = loadPageVar('longTermId')
    const tagsPageVar = loadPageVar('tags')
    const minEffectTimestamp = loadPageVar('minEffectTimestamp')
    const maxEffectTimestamp = loadPageVar('maxEffectTimestamp')
    const multipleStatusPageVar = loadPageVar('multipleStatus')
    const multiplePriorityPageVar = loadPageVar('multiplePriority')
    const statusPageVar = loadPageVar('status')
    const priorityPageVar = loadPageVar('priority')

    const pageVarToQueryArray = pageVar => pageVar.split(pageSplitVarString).reduce((accumulator, currentValue) => {
        const verifyInstance = valuesStructuresVerify.isJSONString(currentValue)
        if (verifyInstance.result === 1) accumulator.push(verifyInstance.data)
        return accumulator
    }, [])

    if (!!longTermId) {
        const longTermTaskInstance = await service.getLongTermTask(longTermId)
        if (longTermTaskInstance.result === 1) longTerm = longTermTaskInstance.data
    }

    if (!!tagsPageVar) tags = pageVarToQueryArray(tagsPageVar)

    if (!!multipleStatusPageVar) multipleStatus = pageVarToQueryArray(multipleStatusPageVar)

    if (!!multiplePriorityPageVar) multiplePriority = pageVarToQueryArray(multiplePriorityPageVar)

    let status = { value: null, label: null }
    if (!!statusPageVar && statusPageVar !== 'null') {
        const verifyInstance = valuesStructuresVerify.isJSONString(statusPageVar)
        if (verifyInstance.result === 1) status = verifyInstance.data
    }

    let priority = { value: null, label: null }
    if (!!priorityPageVar && priorityPageVar !== 'null') {
        const verifyInstance = valuesStructuresVerify.isJSONString(priorityPageVar)
        if (verifyInstance.result === 1) priority = verifyInstance.data
    }

    const filter = {
        longTerm,
        tags,
        minEffectTimestamp: +minEffectTimestamp || null,
        maxEffectTimestamp: +maxEffectTimestamp || null,
        multipleStatus,
        multiplePriority,
        status,
        priority
    }

    return filter
}

const filterToUrlQuery = ({ longTerm, tags, minEffectTimestamp, effectTimestampRange, maxEffectTimestamp, multipleStatus, multiplePriority, status, priority }) => {
    let query = {}

    const arrayToQueryString = array => array.map(item => JSON.stringify(item)).join(pageSplitVarString)
    if (longTerm && longTerm.id) query.longTermId = longTerm.id
    if (tags && tags.length > 0) query.tags = arrayToQueryString(tags)
    if (minEffectTimestamp) query.minEffectTimestamp = minEffectTimestamp
    if (maxEffectTimestamp) query.maxEffectTimestamp = maxEffectTimestamp
    if (effectTimestampRange) {
        const effectTimestampRangeTimestamp = CONSTS.utils.viewValueToServiceView(CONSTS.task.effectTimestampRange, effectTimestampRange)
        query.minEffectTimestamp = new Date().getTime()
        query.maxEffectTimestamp = minEffectTimestamp + effectTimestampRangeTimestamp
    }
    if (multipleStatus && multipleStatus.length > 0) query.multipleStatus = arrayToQueryString(multipleStatus)
    if (multiplePriority && multiplePriority.length > 0) query.multiplePriority = arrayToQueryString(multiplePriority)
    if (status) query.status = JSON.stringify(status)
    if (priority) query.priority = JSON.stringify(priority)

    return queryToUrl(query)
}



const PageCommonUtils = {
    initStatusLable,
    initPriorityLable,
    pageVarToFilter,
    filterToUrlQuery
}

export default PageCommonUtils