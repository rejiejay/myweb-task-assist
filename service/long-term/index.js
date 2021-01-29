import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('longTermTaskRelational', dataAccessObject)

const listAll = function listAll() {
    return tableHandle.list('')
}

const getOne = function getOne(id) {
    return tableHandle.find(+id)
}

const longTerm = {
    listAll,
    getOne
}

export default longTerm
