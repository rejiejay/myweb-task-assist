/**
 * SQLite 对外方法:
 * @doc https://github.com/ryan-codingintrigue/sql-wasm
 * 
 * @db SQLite的实例
 * @initDev 初始化开发环境方法
 * @initPro 初始化开发环境方法
 * @TableHandle SQLite的SQL字符串常用操作方法
 * @TableHandle SQLite的Table常用操作方法
 */
import SqliteJs from './sqlitejs.instantiate.js'
import TableHandle from './table-handle.js'
import SqlHandle from './sql-handle.js'
import initPro from './initPro.js'
import initDev from './initDev.js'

const SQLite = {
    db: SqliteJs.db,

    initDev,

    initPro,

    SqlHandle,

    TableHandle
}

export default SQLite
