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
        } catch (error) {
            console.error(`SqliteJs execute ${sql} error: `, error)
            return reject(consequencer.error(`${error}`))
        }

        resolve(consequencer.success(result))
    }).catch(error => error)

    find(id) {
        const self = this

        return new Promise(async (resolve, reject) => {
            if (!id) return reject(consequencer.error('id could not empty'))

            const queryInstance = await self.query(`SELECT * FROM ${self.table} WHERE id=${id}`)
            if (queryInstance.result !== 1) return reject(queryInstance)
            const query = queryInstance.data

            try {
                const data = query[0]
                const values = data.values
                if (values.length <= 0) return reject(consequencer.error(`could not find value where id=${id}`))
                resolve(consequencer.success(self.sqlHandle.mapperFindSQLtoObject({ columns: data.columns, values: values[0] })))
            } catch (error) {
                reject(consequencer.error(`${error}`))
            }
        }).catch(error => error)
    }

    list(filterSQL) {
        const self = this

        return new Promise(async (resolve, reject) => {
            const queryInstance = await self.query(`SELECT * FROM ${self.table} ${filterSQL}`)
            if (queryInstance.result !== 1) return reject(queryInstance)
            const query = queryInstance.data

            try {
                if (query.length <= 0) return resolve(consequencer.success([]))
                const data = query[0]
                const values = data.values
                if (values.length <= 0) return resolve(consequencer.success([]))
                resolve(consequencer.success(self.sqlHandle.mapperQuerySQLtoList(data)))
            } catch (error) {
                reject(consequencer.error(`${error}`))
            }
        }).catch(error => error)
    }

    /**
     * 目标: 校验数据是否正确, 防止出现非必填的情况
     * @param {*} data 
     */
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

        return new Promise(async (resolve, reject) => {
            const verifyInstance = self.verify(data)
            if (verifyInstance.result !== 1) return reject(verifyInstance)

            const queryInstance = await self.query(`INSERT INTO ${self.table} ${self.sqlHandle.dataToAddSql(data)}`)
            if (queryInstance.result !== 1) return reject(queryInstance)

            resolve(consequencer.success(data))
        }).catch(error => error)
    }

    del(id) {
        const self = this

        return new Promise(async (resolve, reject) => {
            const findInstance = await self.find(id)
            if (findInstance.result !== 1) return reject(findInstance)
            const find = queryInstance.data

            const deleteInstance = await self.query(`DELETE FROM ${self.table} WHERE id=${id}`)
            if (deleteInstance.result !== 1) return reject(deleteInstance)

            resolve(consequencer.success(find))
        }).catch(error => error)
    }

    updata(id, data) {
        const self = this

        return new Promise(async (resolve, reject) => {
            const findInstance = await self.find(id)
            if (findInstance.result !== 1) return reject(findInstance)
            const find = queryInstance.data

            const updateInstance = await self.query(`UPDATE ${self.table} SET ${self.sqlHandle.dataToUpdateSql({ oldVal: find, newVal: data })} WHERE id=${id}`)
            if (updateInstance.result !== 1) return reject(updateInstance)

            resolve(consequencer.success(data))
        }).catch(error => error)
    }
}

export default TableHandle
