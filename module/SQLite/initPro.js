import schedule from 'node-schedule'
import service from './../../service'

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
    const cacheExportHandle = async () => {
        const binaryArray = instantiate.export()
        await service.sql.exportSqliteJsFileBuffer(binaryArray)
    }

    /**
     * 每天早上3点执行
     * crontab执行时间计算- 在线工具： https://tool.lu/crontab/
     */
    schedule.scheduleJob('0 3 * * *', cacheExportHandle)
}

const initPro = async function initPro() {
    const filebufferInstance = await service.sql.getSqliteJsFileBuffer()
    const filebuffer = filebufferInstance.data

    const initInstance = await SqliteJs.init(filebuffer)
    const instantiate = initInstance.data
    this.db = instantiate

    initSchedule(instantiate)
    console.log('create SQLite service successful')
}

export default initPro
