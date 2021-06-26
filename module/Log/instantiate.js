import signale from 'signale'
import FilesHelper from './../../utils/files-helper'
import TimeHelper from './../../utils/time-helper'
import WaitStackInterval from './wait-stack-interval.js'

const outPutHandle = (message, logType, { resolve, reject }) => {
    const now = new Date()
    const nowMonth = now.getMonth() + 1
    const nowDate = now.getDate()
    const fileName = `./output/log/${nowMonth}-${nowDate}.${logType}.text`
    const time = TimeHelper.transformers.dateToMMssMilliseconds(now)
    const text = `${time}: ${message}`

    return new Promise(async(resolveHandle, rejectHandle) => {
        try {
            await FilesHelper.accumulateText(fileName, text)
            resolveHandle()
            return resolve()
        } catch (error) {
            console.error('accumulateText', error)
        }

        try {
            await FilesHelper.outputFile(`./output/log/${now.getTime()}.log-failure.text`, text)
            resolveHandle()
            resolve()
        } catch (error) {
            console.error('outputFile', error)
            rejectHandle()
            reject()
        }
    }).catch(error => error);
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

    try {
        WaitStackInterval({ message: msg, logType, method: outPutHandle })
    } catch (error) {
        console.error(error)
    }
}

export default instantiate