import valuesStructuresVerify from './../../../utils/values-structures-verify'
const storageKey = 'task-list-filter-storage'

const getHandle = () => {
    const storageString = window.localStorage.getItem(storageKey)
    const storageInstance = valuesStructuresVerify.isJSONString(storageString)

    if (storageInstance.result === 1) return storageInstance.data

    return {
        tags: [],
        minEffectTimestamp: null,
        maxEffectTimestamp: null,
        multipleStatus: [],
        multiplePriority: [],
        longTerm: { id: null, title: '' }
    }
}

const setHandle = (tags = [], minEffectTimestamp, maxEffectTimestamp, multipleStatus = [], multiplePriority = [], longTerm = { id: null, title: '' }) => {
    const storage = { tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority, longTerm }
    window.localStorage.setItem(storageKey, JSON.stringify(storage))
}

const filter = {
    getHandle,
    setHandle
}

export default filter