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
}

const task = {
    findOne,
    alterTableDescription
}

export default task
