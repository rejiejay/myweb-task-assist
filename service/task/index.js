import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

const getList = function getList() {
    return tableHandle.list('')
}

const task = {
    getList
}

export default task
