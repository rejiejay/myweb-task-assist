import signale from 'signale'
import FilesHelper from './../../utils/files-helper'
import TimeHelper from './../../utils/time-helper'

const outPutHandle = (message, logType) => {
    const now = new Date()
    const nowDate = now.getDate()
    const fileName = `./output/log/${nowDate}.${logType}.text`
    const time = TimeHelper.transformers.dateToMMssMilliseconds(now)
    const text = `${time}: ${message}`

    try {
        FilesHelper.accumulateText(fileName, text)
    } catch (error) {
        FilesHelper.outputFile(`./output/log/${now.getTime()}.log-failure.text`, text)
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