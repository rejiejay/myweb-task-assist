/**
 * SQLite 对外方法:
 * @db SQLite的实例
 * @initDev 初始化开发环境方法
 * @initPro 初始化开发环境方法
 * @TableHandle SQLite的SQL字符串常用操作方法
 * @TableHandle SQLite的Table常用操作方法
 */
import SqliteJs from './sqlitejs.instantiate.js'
import TableHandle from './table-handle.js'
import SqlHandle from './sql-handle.js'
import localDatabaseSqlite from './local.database.sqlite.js'

function initDev() {
    const self = this

    SqliteJs.init()
        .then(instantiate => {
            console.log('create SQLite service successful')
            self.db = instantiate
            localDatabaseSqlite.init(instantiate)
        }).catch(error => console.error('initSqlJs error', error))
}

const SQLite = {
    db: SqliteJs.db,

    initDev,

    initPro: () => { }, // TODO

    SqlHandle,
    TableHandle
}

export default SQLite
