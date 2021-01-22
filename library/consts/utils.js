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

const utils = {
    findValueByValue,
    toDownSelectFormat,
    serviceValueToViewLable
}

export default utils