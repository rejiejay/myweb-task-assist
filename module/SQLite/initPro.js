import schedule from 'node-schedule'
import service from './../../service/sql'
import SqliteJs from './sqlitejs.instantiate.js'
import localDatabaseSqlite from './local.database.sqlite.js'

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
            consequencer.error(error)
        }
    }

    /**
     * 每天早上3点执行
     * crontab执行时间计算- 在线工具： https://tool.lu/crontab/
     */
    schedule.scheduleJob('0 3 * * *', cacheExportHandle)
}

const initPro = async function initPro() {
    let filebuffer = null

    const filebufferInstance = await service.getSqliteJsFileBuffer()
    if (filebufferInstance.result === 1) filebuffer = filebufferInstance.data

    const initInstance = await SqliteJs.init(filebuffer)
    const instantiate = initInstance.data
    if (filebufferInstance.result !== 1) localDatabaseSqlite.initTable(instantiate)

    this.db = instantiate
    initSchedule(instantiate)
    console.log('create SQLite service successful')
}

export default initPro
