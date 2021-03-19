import Log from './../Log'
import TimeHelper from './../../utils/time-helper'
import fse from 'fs-extra';

/**
 * 清除日志
 * 每天早上3点23分执行
 */
const clearLog = async() => {
    Log.pending('开始执行清除日志定时器任务')

    const lastMonthInstance = new Date(new Date().getTime() - TimeHelper.monthTimestamp)
    const lastMonth = lastMonthInstance.getMonth() + 1
    const lastDate = lastMonthInstance.getDate()
    const logTypes = ['success', 'error', 'pending', 'debug', 'watch']
    const fileNames = logTypes.map(logType => `./output/log/${lastMonth}-${lastDate}.${logType}.text`)

    for (let index = 0; index < fileNames.length; index++) {
        const fileName = fileNames[index]
        const exists = await fse.pathExists(fileName)
        Log.pending(`删除日志${fileName}`)

        if (exists) {
            try {
                await fse.remove(fileName)
                Log.success(`成功删除日志${fileName}`)
            } catch (err) {
                Log.error(`删除日志${fileName}失败, 原因: ${JSON.stringify(err)}`)
            }
        }
    }

    Log.success('---> \n执行清除日志schedule定时器任务完成 ---> \n')
}

export default clearLog