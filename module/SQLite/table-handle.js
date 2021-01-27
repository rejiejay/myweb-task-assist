import SqliteJs from './sqlitejs.instantiate.js'
import SqlHandle from './sql-handle.js'
import consequencer from './../../utils/consequencer'

class TableHandle {
    constructor(table, dataAccessObject) {
        this.table = table /** 表的名称 */
        this.format = dataAccessObject /** 表的默认结构 */
        this.sqlHandle = new SqlHandle()
    }

    query = sql => new Promise((resolve, reject) => {
        let result = {}
        try {
            result = SqliteJs.db.exec(sql)
        } catch (err) {
            console.error('SqliteJs execute error', err)
            reject(consequencer.error(err))
        }

        resolve(consequencer.success(result))
    })

    mapperFindSQLtoObject({ columns, values }) {
        let object = {}
        columns.forEach((key, index) => {
            const value = values[index]
            object[key] = value
        })

        return object
    }

    find(id) {
        const self = this

        return new Promise((resolve, reject) => {
            if (!id) return reject(consequencer.error('id could not empty'))

            self.query(`SELECT * FROM ${self.table} WHERE id=${id}`)
                .then(
                    query => {
                        if (query.result !== 1) return reject(query)
                        const data = query.data[0]
                        const values = data.values
                        if (values.length <= 0) return reject(consequencer.error(`could not find value where id=${id}`))
                        resolve(consequencer.success(self.mapperFindSQLtoObject({ columns: data.columns, values: values[0] })))
                    },
                    error => reject(error)
                )
        })
    }

    list(filterSQL) {
        const self = this

        return new Promise((resolve, reject) => self.query(`SELECT * FROM ${self.table} ${filterSQL}`)
            .then(
                query => {
                    if (query.result !== 1) return reject(query)
                    const data = query.data[0]
                    const values = data.values
                    if (values.length <= 0) return resolve(consequencer.success([]))
                    resolve(consequencer.success(self.sqlHandle.mapperQuerySQLtoList(data)))
                },
                error => reject(error)
            )
        )
    }

    verify(data) {
        const format = this.format

        let check = consequencer.success(data)

        Object.keys(format).forEach(key => {
            const thisFormat = format[key]
            const value = data[key]
            if (thisFormat && thisFormat.isRequired) {
                if (!value) check = consequencer.error(`${key} is required`)
                // 因为SQL都是字符串，所以这里就不校验类型了、
                // if (typeof value !== thisFormat.type) check = consequencer.error(`${key} need ${thisFormat.type}`)
            }
        })

        return check
    }

    add(data) {
        const self = this

        return new Promise((resolve, reject) => {
            const verifyInstance = self.verify(data)
            if (verifyInstance.result !== 1) return reject(verifyInstance)

            self.query(`INSERT INTO ${self.table} ${self.sqlHandle.dataToAddSql(data)}`)
                .then(
                    result => resolve(consequencer.success(data)),
                    error => reject(error)
                ).catch(error => reject(consequencer.error(error)))
        })
    }

    del(id) {
        const self = this
        let promiseHandle = {}

        const findOneHandle = () => self.find(id)
            .then(
                result => deleteOneHandle(),
                error => promiseHandle.reject(error)
            ).catch(error => promiseHandle.reject(consequencer.error(error)))

        const deleteOneHandle = () => self.query(`DELETE FROM ${self.table} WHERE id=${id}`)
            .then(
                result => promiseHandle.resolve(result),
                error => promiseHandle.reject(error)
            ).catch(error => promiseHandle.reject(consequencer.error(error)))

        return new Promise((resolve, reject) => {
            promiseHandle = { resolve, reject }
            findOneHandle()
        })
    }

    updata(id, data) {
        const self = this
        let promiseHandle = {}

        const findOneHandle = () => self.find(id)
            .then(
                find => {
                    if (find.result !== 1) return promiseHandle.reject(find)
                    const data = find.data
                    updateOneHandle(data)
                },
                error => promiseHandle.reject(error)
            ).catch(error => promiseHandle.reject(consequencer.error(error)))

        const updateOneHandle = result => self.query(`UPDATE ${self.table} SET ${self.sqlHandle.dataToUpdateSql(data, data)} WHERE id=${id}`)
            .then(
                result => promiseHandle.resolve(consequencer.success(result)),
                error => promiseHandle.reject(error)
            ).catch(error => promiseHandle.reject(consequencer.error(error)))

        return new Promise((resolve, reject) => {
            promiseHandle = { resolve, reject }
            findOneHandle()
        })
    }
}

export default TableHandle
