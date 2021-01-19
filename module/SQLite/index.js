/**
 * SQLite 对外方法:
 * @initDev 初始化开发环境方法
 * @initPro 初始化开发环境方法
 */
import SqliteJs from './sqlitejs.instantiate.js'
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

    initPro: () => { } // TODO
}

export default SQLite
