/**
 * 作用: 请求参数 转换为 url
 */
export const queryToUrl = query => {
    if (!query) return ''

    const isKeepStay = val => {
        if (val === 0) return true
        if (!!val) return true
        return false
    }

    const keys = Object.keys(query).filter(key => isKeepStay(query[key]))
    if (keys.length <= 0) return ''

    let url = '?'
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        const value = query[key]
        url += `${key}=${value}`
        url += index !== (keys.length - 1) ? '&' : ''
    }

    return url
}

export const loadPageVar = sVar => decodeURI(
    window.location.search.replace(
        new RegExp(
            `^(?:.*[&\\?]${encodeURI(sVar).replace(/[\.\+\*]/g, '\\$&')}(?:\\=([^&]*))?)?.*$`,
            'i'
        ), '$1'
    )
)

export const queryToHash = query => {
    if (!query) return ''

    let hash = ''
    try {
        hash = encodeURIComponent(JSON.stringify(query));
    } catch (error) {
        console.warn('query to hash failure');
        console.error(error);
    }

    return hash
}

export const addQueryToPageHash = (query = {}) => {
    const pageQuery = loadPageHash()

    if (pageQuery) {
        query = {
            ...pageQuery,
            ...query
        }
    }

    return queryToHash(query);
}

export const loadPageHash = () => {
    const locationHash = window.location.hash.replace('#', '');
    if (!locationHash) return null

    let query = {}
    try {
        query = JSON.parse(decodeURIComponent(locationHash));
    } catch (error) {
        console.warn('load page hash failure')
        console.error(error);
        return null
    }

    return query
}

export const loadPageHashVar = sVar => {
    if (!sVar) return null

    const query = loadPageHash()

    if (!query) return null

    const value = query[sVar]
    if (!value) return null

    return value
}
