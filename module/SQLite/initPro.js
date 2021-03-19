import service from './../../service/sql'
import SqliteJs from './sqlitejs.instantiate.js'
import localDatabaseSqlite from './local.database.sqlite.js'
import Log from './../Log'

const initPro = async function initPro() {
    let filebuffer = null

    const filebufferInstance = await service.getSqliteJsFileBuffer()
    if (filebufferInstance.result === 1) {
        filebuffer = filebufferInstance.data
    }

    const initInstance = await SqliteJs.init(filebuffer)
    const instantiate = initInstance.data
    if (filebufferInstance.result !== 1) {
        Log.error(`获取SqliteJs文件失败使用备选方案 localDatabaseSqlite, 原因: ${filebufferInstance.message}`)
        localDatabaseSqlite.initTable(instantiate)
    }

    this.db = instantiate
    Log.success('create SQLite service successful')
}

export default initPro
