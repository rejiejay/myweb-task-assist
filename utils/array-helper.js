
/**
 * 含义: 根据Key值去重
 */
const uniqueDeduplicationByKey = ({ array, key }) => {
    const filters = new Set()

    return array.filter(item => {
        const isRepeat = !Array.from(filters).includes(item[key])
        filters.add(item[key])
        return isRepeat
    })
}

const ArrayHelper = {
    uniqueDeduplicationByKey
}

export default ArrayHelper
