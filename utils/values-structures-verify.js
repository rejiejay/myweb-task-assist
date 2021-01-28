import consequencer from './consequencer';

const MAX_INT = 2147483647
const MAX_TIMESTAMP = 100000000000000

const isId = function isId(id, fieldName = 'id') {
    const data = +id
    if (data === 0) return consequencer.error(`${fieldName} can·t 0`, 2317)

    // todo isNumber
    if (!data) return consequencer.error(`${fieldName} is NaN, Not String`, 6439)

    if (data < 0 && data > MAX_INT) return consequencer.error(`${fieldName} is out of max range`, 5372)
    return consequencer.success()
}

const isNumber = function isNumber(num, fieldName = 'id') {
}

const isNumberString = function isNumberString(num, fieldName = 'id') {
}

/**
 * 判断字段为数组并且数据大于0
 */
const isArrayNil = function isArrayNil(obj, fieldName = 'it') {
    const isArrayInstance = this.isArray(obj)
    if (isArrayInstance.result !== 1) return isArrayInstance
    if (obj.length <= 0) return consequencer.error(`${fieldName} is Nil Array`)
    return consequencer.success()
}

const isArray = function isArray(obj, fieldName = 'it') {
    if (!obj) return consequencer.error('Nil')
    if (!obj instanceof Array) return consequencer.error(`${fieldName} is Not Array`)
    return consequencer.success()
}

const isJSONString = function isJSONString(jsonString, fieldName = 'it') {
    if (!jsonString) return consequencer.error(`${fieldName} is null`)
    
    try {
        const obj = JSON.parse(jsonString)
        if (obj && typeof obj === 'object') return consequencer.success(obj)
        return consequencer.error(`${fieldName} is not a object`)
    } catch (e) {
        return consequencer.error(`parse ${fieldName} Error: ${e}`)
    }
    
}

const isArrayString = function isArrayString(arrayString, fieldName = 'it') {
    if (!arrayString) return consequencer.error(`${fieldName} is Not array string`)
    
    const isJSONStringInstance = this.isJSONString(arrayString, fieldName)
    if (isJSONStringInstance.result !== 1) return isJSONStringInstance
    
    const josn = isJSONStringInstance.data
    const isArrayInstance = this.isArray(josn, fieldName)
    if (isArrayInstance.result !== 1) return isArrayInstance

    return consequencer.success()
}

const isArrayNilString = function isArrayNilString(arrayString, fieldName = 'it') {
    if (!arrayString) return consequencer.error(`${fieldName} is Not array string`)
    
    const isJSONStringInstance = this.isJSONString(arrayString, fieldName)
    if (isJSONStringInstance.result !== 1) return isJSONStringInstance
    
    const josn = isJSONStringInstance.data
    const isArrayInstance = this.isArrayNil(josn, fieldName)
    if (isArrayInstance.result !== 1) return isArrayInstance

    return consequencer.success()
}

const isTimestamp = function isTimestamp(timestamp, fieldName = 'it') {
    if (!timestamp && timestamp !== 0) return consequencer.error(`${fieldName} is Not timestamp`)
    // todo isNumber
    if (typeof timestamp !== 'number') return consequencer.error(`${fieldName} is Not Number`)
    if (isNaN(timestamp)) return consequencer.error(`${fieldName} is NaN`)
    if (timestamp > -MAX_TIMESTAMP && timestamp < MAX_TIMESTAMP) return consequencer.success()
    return consequencer.error(`${fieldName} is Not timestamp`)
}

const isBooleanString = function isBooleanString(boolean, fieldName = 'it') {
    if (!boolean) return consequencer.error(`${fieldName} is Not timestamp`)
    if (boolean === 'true' || boolean === 'false') return consequencer.success()
    return consequencer.error(`${fieldName} is Not boolean string`)
}

/**
 * Group verification packaging method
 */
const group = function group(verifys) {
    const self = this
    for (let index = 0; index < verifys.length; index++) {
        const element = verifys[index];

        if (!!element.value) {
            let verify = consequencer.success()
            try {
                verify = self[element.method](element.value, element.field)
            } catch (e) {
                return consequencer.error(`verify ${element.method}(${element.field}) Error: ${e}`)
            }
            if (verify.result !== 1) return verify
        }
    }

    return consequencer.success()
}
    

const valuesStructuresVerify = {
    isId,
    isArray,
    isArrayNil,
    isJSONString,
    isArrayString,
    isArrayNilString,
    isTimestamp,
    isBooleanString,
    group
}

export default valuesStructuresVerify
