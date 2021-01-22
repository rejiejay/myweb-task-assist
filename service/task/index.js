import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

/**
 * 注意: 这里需要防止SQL注入, 因为是字符串, 所以必须要考虑到这层因素.
 */
const getList = function getList() {
    return tableHandle.list('')
}

const task = {
    getList
}

export default task
