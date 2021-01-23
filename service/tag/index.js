import SQLite from './../../module/SQLite/index.js'
import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('taskTagRelational', dataAccessObject)

const findOne = function findOne(id) {
    return tableHandle.find(id)
}

const alterTableDescription = function alterTableDescription() {
    return new Promise((resolve, reject) => {
        // tableHandle.query('PRAGMA table_info([longTermTaskRelational])')
        tableHandle.query(`select * from sqlite_master where type="table" and name="longTermTaskRelational"`)
        .then(
            query => {
                if (query.result !== 1) return reject(query)
                const data = query.data[0]
                console.log('columns', data.columns)
                console.log('values', data.values)
                // console.log('query', query)
                resolve(query)
            },
            error => reject(error)
        )
    })
}

const task = {
    findOne,
    alterTableDescription
}

export default task
