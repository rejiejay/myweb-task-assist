import valuesStructuresVerify from './values-structures-verify'

const mapper = obj => {
    const keys = Object.keys(obj)
    const forEach = fun => {
        let newObj = {}
        keys.forEach(key => newObj[key] = fun(key, obj[key]))
        return newObj
    }

    return { forEach }
}

/**
 * 对象编辑的处理
 * 1, 新增
 * 2, 删除
 * 3, 修改
 */
const updataAttachHandle = (origin, target) => {
    let updata = {}

    for (const key in target) {
        const originVal = origin[key]
        const targetVal = target[key]

        if (!originVal && !!targetVal) {
            updata[key] = targetVal
            continue
        }

        if (!!originVal && !targetVal) {
            const isStrInstance = valuesStructuresVerify.isString(originVal)

            updata[key] = isStrInstance.result === 1 ? '' : 'null'
            continue
        }

        if (!!originVal && !!targetVal && originVal !== targetVal) {
            updata[key] = targetVal
            continue
        }
    }

    return updata
}

const ObjectHelper = {
    mapper,
    updataAttachHandle
}

export default ObjectHelper
