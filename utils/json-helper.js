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
