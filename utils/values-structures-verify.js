import consequencer from './consequencer';

const MAX_INT = 2147483647
const MAX_TIMESTAMP = 100000000000000

const isIntNumString = function isIntNumString(num, fieldName = 'it') {
    var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
    if (regPos.test(num) || regNeg.test(num)) return consequencer.success(+num)
    return consequencer.error(`${fieldName} is not Int Number`)
}

const isId = function isId(id, fieldName = 'id') {
    const data = +id

    const isIntNumStringInstance = this.isIntNumString(data, fieldName)
    if (isIntNumStringInstance.result !== 1) return isIntNumStringInstance

    if (data === 0) return consequencer.error(`${fieldName} can·t 0`, 2317)
    if (data < 0) return consequencer.error(`${fieldName} can·t < 0`, 2318)
    if (data > MAX_INT) return consequencer.error(`${fieldName} is out of max range`, 5372)
    return consequencer.success(data)
}

const isArrayNil = function isArrayNil(obj, fieldName = 'it') {
    const isArrayInstance = this.isArray(obj)
    if (isArrayInstance.result !== 1) return isArrayInstance
    if (obj.length <= 0) return consequencer.error(`${fieldName} is Nil Array`)
    return consequencer.success(obj)
}

const isArray = function isArray(obj, fieldName = 'it') {
    if (!obj) return consequencer.error('Nil')
    if (!obj instanceof Array) return consequencer.error(`${fieldName} is Not Array`)
    return consequencer.success(obj)
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

    return consequencer.success(josn)
}

const isArrayNilString = function isArrayNilString(arrayString, fieldName = 'it') {
    if (!arrayString) return consequencer.error(`${fieldName} is Not array string`)

    const isJSONStringInstance = this.isJSONString(arrayString, fieldName)
    if (isJSONStringInstance.result !== 1) return isJSONStringInstance

    const josn = isJSONStringInstance.data
    const isArrayInstance = this.isArrayNil(josn, fieldName)
    if (isArrayInstance.result !== 1) return isArrayInstance

    return consequencer.success(josn)
}

const isTimestamp = function isTimestamp(timestamp, fieldName = 'it') {
    const isIntNumStringInstance = this.isIntNumString(timestamp, fieldName)
    if (isIntNumStringInstance.result !== 1) return isIntNumStringInstance

    if (timestamp > -MAX_TIMESTAMP && timestamp < MAX_TIMESTAMP) return consequencer.success(+timestamp)
    return consequencer.error(`${fieldName} is Not timestamp`)
}

const isBooleanString = function isBooleanString(boolean, fieldName = 'it') {
    if (!boolean) return consequencer.error(`${fieldName} is Not timestamp`)
    if (boolean === 'true' || boolean === 'false') return consequencer.success(boolean === 'true')
    return consequencer.error(`${fieldName} is Not boolean string`)
}

const isStringNil = function isStringNil(str, fieldName = 'it') {
    if (!str) return consequencer.error(`${fieldName} is Nil`)
    if (Object.prototype.toString.call(str) !== '[object String]') return consequencer.error(`${fieldName} is Not String`)
    return consequencer.success(str)
}

const isString = function isString(str, fieldName = 'it') {
    if (Object.prototype.toString.call(str) !== '[object String]') return consequencer.error(`${fieldName} is Not String`)
    return consequencer.success(str)
}

/**
 * Group verification packaging method
 */
const group = function group(verifys) {
    const self = this
    let verifyData = {}
    for (let index = 0; index < verifys.length; index++) {
        const element = verifys[index];

        if (!!element.value) {
            let verify
            try {
                verify = self[element.method](element.value, element.field)
            } catch (e) {
                return consequencer.error(`verify ${element.method}(${element.field}) Error: ${e}`)
            }
            if (verify.result !== 1) return verify
            verifyData[element.field] = verify.data
        }
    }

    return consequencer.success(verifyData)
}

const valuesStructuresVerify = {
    isIntNumString,
    isId,
    isArray,
    isArrayNil,
    isJSONString,
    isArrayString,
    isArrayNilString,
    isTimestamp,
    isBooleanString,
    isStringNil,
    isString,
    group
}

export default valuesStructuresVerify
