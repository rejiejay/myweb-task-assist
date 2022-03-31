const josnToString = (json, defaultString = '{}') => {
    let str
    try {
        str = JSON.stringify(json)
    } catch (error) {
        console.error(error);
        str = defaultString;
    }

    return str
}

const stringToJson = (str, isArray = false) => {
    let json = isArray ? [] : {};

    if (str === '') return json

    var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
    if (regPos.test(str) || regNeg.test(str)) return json

    try {
        json = JSON.parse(str)
    } catch (error) {
        console.error(error);
    }

    return json
}


const JsonHelper = {
    josnToString,
    stringToJson
}

export default JsonHelper