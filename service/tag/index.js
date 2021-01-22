import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('taskTagRelational', dataAccessObject)

const findOne = function findOne(id) {
    return tableHandle.find(id)
}

const task = {
    findOne
}

export default task
