/**
 * 常量值对外常用转换工具方法
 */

// 作用: 通过CONST值找到值
const findValueByValue = ({
    CONST,
    supportKey,
    supportValue,
    targetKey
}) => {
    let targetValue = null

    Object.keys(CONST).forEach(function (thisKey) {
        const obj = CONST[thisKey]

        if (obj[supportKey] == supportValue) {
            targetValue = obj[targetKey]
        }
    })

    return targetValue
}

// 作用: 通过CONST 转换为 downSelect 格式
function toDefaultDownSelectFormat(CONST) {
    return this.toDownSelectFormat({
        CONST,
        valueName: 'viewValue',
        labelName: 'viewLable',
    })
}

const toDownSelectFormat = ({ CONST, valueName, labelName }) => Object.keys(CONST).map(key => ({
    value: CONST[key][valueName],
    label: CONST[key][labelName]
}))

function serviceValueToViewLable(CONST, supportValue) {
    return this.findValueByValue({
        CONST,
        supportKey: 'serviceValue',
        supportValue,
        targetKey: 'viewLable',
    })
}

function viewValueToViewLable(CONST, supportValue) {
    return this.findValueByValue({
        CONST,
        supportKey: 'viewValue',
        supportValue,
        targetKey: 'viewLable',
    })
}

function viewValueToServiceView(CONST, supportValue) {
    return this.findValueByValue({
        CONST,
        supportKey: 'viewValue',
        supportValue,
        targetKey: 'serviceValue',
    })
}

const utils = {
    findValueByValue,
    toDownSelectFormat,
    serviceValueToViewLable,
    toDefaultDownSelectFormat,
    viewValueToViewLable,
    viewValueToServiceView
}

export default utils