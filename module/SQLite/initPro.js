import schedule from 'node-schedule'
import service from './../../service/sql'
import SqliteJs from './sqlitejs.instantiate.js'
import localDatabaseSqlite from './local.database.sqlite.js'
import Log from './../Log'

/**
 * The cron format consists of:
 * *    *    *    *    *    *
 * ┬    ┬    ┬    ┬    ┬    ┬
 * │    │    │    │    │    │
 * │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 * │    │    │    │    └───── month (1 - 12)
 * │    │    │    └────────── day of month (1 - 31)
 * │    │    └─────────────── hour (0 - 23)
 * │    └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, OPTIONAL)
 */
const initSchedule = function initSchedule(instantiate) {
    const cacheExportHandle = async() => {
        const binaryArray = instantiate.export()
        const arrayBuffer = binaryArray.buffer
        const buffer = Buffer.from(arrayBuffer)

        try {
            await service.exportSqliteJsFileBuffer(buffer)
        } catch (error) {
            return Log.error(`执行schedule定时器任务失败, 原因: ${JSON.stringify(error)}`)
        }
        Log.success('---> \n执行schedule定时器任务完成 ---> \n')
    }

    /**
     * 每天早上3点执行
     * crontab执行时间计算- 在线工具： https://tool.lu/crontab/
     */
    schedule.scheduleJob('0 3 * * *', () => {
        Log.pending('开始执行schedule定时器任务')
        try {
            cacheExportHandle()
        } catch (error) {
            Log.error(`执行schedule定时器任务失败, 原因: ${JSON.stringify(error)}`)
        }
    })
}

const initPro = async function initPro() {
    let filebuffer = null

    const filebufferInstance = await service.getSqliteJsFileBuffer()
    if (filebufferInstance.result === 1) {
        Log.error(`获取SqliteJs文件失败, 原因: ${filebufferInstance.message}`)
        filebuffer = filebufferInstance.data
    }

    const initInstance = await SqliteJs.init(filebuffer)
    const instantiate = initInstance.data
    if (filebufferInstance.result !== 1) {
        Log.error('获取SqliteJs文件失败, 使用备选方案 localDatabaseSqlite')
        localDatabaseSqlite.initTable(instantiate)
    }

    this.db = instantiate
    initSchedule(instantiate)
    console.log('create SQLite service successful')
}

export default initPro
