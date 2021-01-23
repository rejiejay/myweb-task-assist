import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('longTermTaskRelational', dataAccessObject)

const listAll = function listAll(id) {
    return tableHandle.list('')
}

const task = {
    listAll
}

export default task
