const getClien = (field, defaultValue) => {
    if (window.document.body && window.document.body[`offset${field}`]) return window.document.body[`offset${field}`]
    if (window.document.documentElement && window.document.documentElement[`client${field}`]) return window.document.documentElement[`client${field}`]
    if (window.document[`inner${field}`]) return window.document[`inner${field}`]
    return defaultValue
}

const client = {
    height: () => getClien('Height', 667),
    width: () => getClien('Width', 375),
    heightPercentagePx: (percentage) => `${Math.floor(getClien('Height', 667) * percentage / 100)}px`,
    widthPercentagePx: (percentage) => `${Math.floor(getClien('Width', 375) * percentage / 100)}px`,
    heightPx: () => `${getClien('Height', 667)}px`,
    widthPx: () => `${getClien('Width', 375)}px`
}

export default client
