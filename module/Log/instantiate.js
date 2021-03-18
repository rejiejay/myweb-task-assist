import signale from 'signale'
import FilesHelper from './../../utils/files-helper'
import TimeHelper from './../../utils/time-helper'

const outPutHandle = (message, logType) => {
    const now = new Date()
    const nowDate = now.getDate()
    const fileName = `./output/log/${nowDate}.${logType}.json`

    try {
        const key = TimeHelper.transformers.dateToMMssMilliseconds(now)
        let data = {}
        data[key] = message
        FilesHelper.accumulateJSON(fileName, data)
    } catch (error) {
        FilesHelper.outputFile(`./output/log/${now.getTime()}.log-failure.json`, message)
    }
}

const logHandle = (message, logType) => {
    const logMethod = signale[logType]
    if (!!logMethod && typeof logMethod === "function") {
        logMethod(message)
    } else {
        console.log(message)
    }
}

const messageConver = (message = '') => {
    if (Object.prototype.toString.call(message) === '[object Object]') {
        return JSON.stringify(message)
    }

    return `${message}`
}

const instantiate = (message, logType = 'success') => {
    const msg = messageConver(message)
    logHandle(msg, logType)
    outPutHandle(msg, logType)
}

export default instantiate