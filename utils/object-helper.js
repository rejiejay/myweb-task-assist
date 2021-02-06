const mapper = obj => {
    const keys = Object.keys(obj)
    const forEach = fun => {
        let newObj = {}
        keys.forEach(key => newObj[key] = fun(key, obj[key]))
        return newObj
    }

    return { forEach }
}

const ObjectHelper = {
    mapper
}

export default ObjectHelper
