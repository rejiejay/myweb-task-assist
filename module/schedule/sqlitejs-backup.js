import service from './../../service/sql'
import Log from './../Log'
import SqliteJs from './../SQLite'

/**
 * 备份sqlitejs数据库数据
 * 每天早上2点23分执行
 */
const sqlitejsBackup = async() => {
    Log.pending('开始执行备份sqlitejs数据库数据schedule定时器任务')

    let binaryArray
    try {
        binaryArray = SqliteJs.db.export()
    } catch (error) {
        return Log.error(`执行schedule定时器任务失败, 原因: ${JSON.stringify(error)}`)
    }
    const arrayBuffer = binaryArray.buffer
    const buffer = Buffer.from(arrayBuffer)

    try {
        await service.exportSqliteJsFileBuffer(buffer)
    } catch (error) {
        return Log.error(`执行schedule定时器任务失败, 原因: ${JSON.stringify(error)}`)
    }
    Log.success('---> \n执行备份sqlitejs数据库数据schedule定时器任务完成 ---> \n')
}

export default sqlitejsBackup