const josnToString = json => {
    let str
    try {
        str = JSON.stringify(json)
    } catch (error) {
        console.error(error);
        str = '{}'
    }

    return str
}

const stringToJson = str => {
    let json = {}
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
