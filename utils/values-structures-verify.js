const MAX_INT = 2147483647
const MAX_TIMESTAMP = 100000000000000

const isIntNumString = function isIntNumString(num, fieldName = 'it') {
    var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
    if (regPos.test(num) || regNeg.test(num)) return +num
    return new Error(`${fieldName} is not Int Number`)
}

const isId = function isId(id, fieldName = 'id') {
    const data = +id

    const isIntNumStringInstance = this.isIntNumString(data, fieldName)
    if (isIntNumStringInstance instanceof Error) return isIntNumStringInstance

    if (data === 0) return new Error(`${fieldName} can·t 0`, 2317)
    if (data < 0) return new Error(`${fieldName} can·t < 0`, 2318)
    if (data > MAX_INT) return new Error(`${fieldName} is out of max range`, 5372)
    return data
}

const isArrayNil = function isArrayNil(obj, fieldName = 'it') {
    const isArrayInstance = this.isArray(obj)
    if (isArrayInstance instanceof Error) return isArrayInstance
    if (obj.length <= 0) return new Error(`${fieldName} is Nil Array`)
    return obj
}

const isArray = function isArray(obj, fieldName = 'it') {
    if (!obj) return new Error('Nil')
    if (!obj instanceof Array) return new Error(`${fieldName} is Not Array`)
    return obj
}

const isJSONString = function isJSONString(jsonString, fieldName = 'it') {
    if (!jsonString) return new Error(`${fieldName} is null`)

    const isIntNumStringInstance = this.isIntNumString(jsonString, fieldName)
    if (!(isIntNumStringInstance instanceof Error)) return new Error(`${fieldName} is Num string`)

    try {
        const obj = JSON.parse(jsonString)
        if (obj && typeof obj === 'object') return obj
        return new Error(`${fieldName} is not a object`)
    } catch (e) {
        return new Error(`parse ${fieldName} Error: ${e}`)
    }

}

const isArrayString = function isArrayString(arrayString, fieldName = 'it') {
    if (!arrayString) return new Error(`${fieldName} is Not array string`)

    const isIntNumStringInstance = this.isIntNumString(arrayString, fieldName)
    if (!(isIntNumStringInstance instanceof Error)) return new Error(`${fieldName} is Num string`)

    const isJSONStringInstance = this.isJSONString(arrayString, fieldName)
    if (isJSONStringInstance instanceof Error) return isJSONStringInstance

    const josn = isJSONStringInstance.data
    const isArrayInstance = this.isArray(josn, fieldName)
    if (isArrayInstance instanceof Error) return isArrayInstance

    return josn
}

const isArrayNilString = function isArrayNilString(arrayString, fieldName = 'it') {
    if (!arrayString) return new Error(`${fieldName} is Not array string`)

    const isJSONStringInstance = this.isJSONString(arrayString, fieldName)
    if (isJSONStringInstance instanceof Error) return isJSONStringInstance

    const josn = isJSONStringInstance.data
    const isArrayInstance = this.isArrayNil(josn, fieldName)
    if (isArrayInstance instanceof Error) return isArrayInstance

    return josn
}

const isTimestamp = function isTimestamp(timestamp, fieldName = 'it') {
    const isIntNumStringInstance = this.isIntNumString(timestamp, fieldName)
    if (isIntNumStringInstance instanceof Error) return isIntNumStringInstance

    if (timestamp > -MAX_TIMESTAMP && timestamp < MAX_TIMESTAMP) return +timestamp
    return new Error(`${fieldName} is Not timestamp`)
}

const isBooleanString = function isBooleanString(boolean, fieldName = 'it') {
    if (!boolean) return new Error(`${fieldName} is Not timestamp`)
    if (boolean === 'true' || boolean === 'false') return boolean === 'true'
    return new Error(`${fieldName} is Not boolean string`)
}

const isStringNil = function isStringNil(str, fieldName = 'it') {
    if (!str) return new Error(`${fieldName} is Nil`)
    if (Object.prototype.toString.call(str) !== '[object String]') return new Error(`${fieldName} is Not String`)
    return str
}

const isString = function isString(str, fieldName = 'it') {
    if (Object.prototype.toString.call(str) !== '[object String]') return new Error(`${fieldName} is Not String`)
    return str
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
                return new Error(`verify ${element.method}(${element.field}) Error: ${e}`)
            }
            if (verify instanceof Error) return verify
            verifyData[element.field] = verify
        }
    }

    return verifyData
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
