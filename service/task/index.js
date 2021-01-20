import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

const getList = function getList() {
    return new Promise((resolve, reject) => {
        tableHandle.query(`SELECT * FROM ${self.table} WHERE id=${id}`)
        .then(
            query => {
                if (query.result !== 1) return reject(query)
                resolve(tableHandle.mapperQuerySQLtoList(query.data))
            },
            error => reject(error)
        )
    })
}

const task = {
    getList
}

export default task
