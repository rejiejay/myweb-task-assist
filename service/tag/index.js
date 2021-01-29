import dataAccessObject from './data-access-object'

import SQLite from './../../module/SQLite/index.js'
import consequencer from './../../utils/consequencer'

const tableHandle = new SQLite.TableHandle('taskTagRelational', dataAccessObject)

const findOne = function findOne(id) {
    return tableHandle.find(id)
}

const alterTableDescription = function alterTableDescription() {
    return new Promise((resolve, reject) => {
        tableHandle.query('PRAGMA table_info(taskTagRelational)')
            .then(
                query => {
                    if (query.result !== 1) return reject(query)
                    const data = query.data[0]
                    const values = data.values
                    const columns = values.reduce((total, columnInfor) => {
                        const column = columnInfor[1]
                        if (column === 'id' || column === 'taskId') return total
                        total.push(column)
                        return total
                    }, [])

                    resolve(consequencer.success(columns))
                },
                error => reject(error)
            )
    })
    .catch(error => consequencer.error(`${error}`))
}

const findTaskIdsByField = async function findTaskIdsByField(tagFields) {
    const sqlHandle = new SQLite.SqlHandle()

    tagFields.forEach(field => sqlHandle.addOrFilterSql(`${field} = 1`))

    return tableHandle.list(sqlHandle.toSqlString())
}

const tag = {
    findOne,
    alterTableDescription,
    findTaskIdsByField
}

export default tag
