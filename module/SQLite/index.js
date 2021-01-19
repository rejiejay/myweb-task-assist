/**
 * SQLite 对外方法:
 * @initDev 初始化开发环境方法
 * @initPro 初始化开发环境方法
 */
import SqliteJs from './sqlitejs.instantiate.js'
import localDatabaseSqlite from './local.database.sqlite.js'

const SQLite = {
    SqliteJs: SqliteJs.db,

    initDev: () => {
        SqliteJs.init()
            .then(instantiate => {
                console.log('create SQLite service successful')
                localDatabaseSqlite.init(instantiate)
            })
    },

    initPro: () => { } // TODO
}

export default SQLite
