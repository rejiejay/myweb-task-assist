import SqliteJs from './sqlitejs.instantiate.js'
import SqlHandle from './sql-handle.js'
import Log from './../Log'
import FilesHelper from './../../utils/files-helper'
import { projectRelativePath } from './../../utils/path-handle.js';

const backup = () => {
    const binaryArray = SqliteJs.db.export()
    const arrayBuffer = binaryArray.buffer
    const buffer = Buffer.from(arrayBuffer)

    FilesHelper.outputFile(
        projectRelativePath(`./output/SQLite/${new Date().getDate()}.database.sqlite`),
        buffer,
        {},
        err => Log.error(`SqliteJs.db.backup: ${err.message}`)
    )
}

class TableHandle {
    constructor(table, dataAccessObject) {
        this.table = table /** 表的名称 */
        this.format = dataAccessObject /** 表的默认结构 */
        this.sqlHandle = new SqlHandle()
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            let result = {}
            try {
                result = SqliteJs.db.exec(sql)
            } catch (error) {
                Log.error(`SqliteJs.db.error: ${error.message}`)
                return reject(error)
            }

            Log.success(`SqliteJs.db.success: ${sql}`)
            resolve(result)
        }).catch(error => error)
    }

    find(id) {
        const self = this

        return new Promise(async (resolve, reject) => {
            if (!id) return reject(new Error('id could not empty'))

            const query = await self.query(`SELECT * FROM ${self.table} WHERE id=\"${id}\"`)
            if (query instanceof Error) reject(query)

            try {
                const data = query[0]
                const values = data.values
                if (values.length <= 0) return reject(new Error(`could not find value where id=${id}`))
                resolve(self.sqlHandle.mapperFindSQLtoObject({ columns: data.columns, values: values[0] }))
            } catch (error) {
                reject(error)
            }
        }).catch(error => error)
    }

    list(filterSQL = '') {
        const self = this

        return new Promise(async (resolve, reject) => {
            const query = await self.query(`SELECT * FROM ${self.table} ${filterSQL}`)
            if (query instanceof Error) reject(query)

            try {
                if (query.length <= 0) return resolve([])
                const data = query[0]
                const values = data.values
                if (values.length <= 0) return resolve([])
                resolve(self.sqlHandle.mapperQuerySQLtoList(data))
            } catch (error) {
                reject(error)
            }
        }).catch(error => error)
    }

    /**
     * 目标: 校验数据是否正确, 防止出现非必填的情况
     * @param {*} data 
     */
    verify(data) {
        const format = this.format

        let check = data

        Object.keys(format).forEach(key => {
            const thisFormat = format[key]
            const value = data[key]
            if (thisFormat && thisFormat.isRequired) {
                if (!value) check = new Error(`${key} is required`)
            }
        })

        return check
    }

    add(data) {
        const self = this

        return new Promise(async (resolve, reject) => {
            const verifyInstance = self.verify(data)
            if (verifyInstance instanceof Error) reject(verifyInstance)

            const query = await self.query(`INSERT INTO ${self.table} ${self.sqlHandle.dataToAddSql(data)}`)
            if (query instanceof Error) reject(query)

            backup()
            resolve(data)
        }).catch(error => error)
    }

    del(id) {
        const self = this

        return new Promise(async (resolve, reject) => {
            const find = await self.find(id)
            if (find instanceof Error) reject(find)

            const query = await self.query(`DELETE FROM ${self.table} WHERE id=\"${id}\"`)
            if (query instanceof Error) reject(query)

            backup()
            resolve(find)
        }).catch(error => error)
    }

    updata(id, update) {
        const self = this

        return new Promise(async (resolve, reject) => {
            const find = await self.find(id)
            if (find instanceof Error) reject(find)

            if (update.key) return new Error(`can\'t update key`)
            if (update.id) return new Error(`can\'t update id`)

            const effectiveFields = Object.keys(find)
            const updateFields = Object.keys(update)
            const isEffectiveField = updateFields.reduce((isEffective, field) => {
                /**
                 * 不存在 update 的值不更新
                 */
                if (!update[field]) {
                    return false
                }
                if (!effectiveFields.includes(field)) {
                    return false
                }

                return isEffective
            }, true)

            if (!isEffectiveField) return new Error(`you can\'t update nonexistent field`)

            const query = await self.query(
                `UPDATE ${self.table
                } SET ${self.sqlHandle.dataToUpdateSql({
                    oldVal: find,
                    newVal: update
                })
                } WHERE id=\"${id}\"`
            )
            if (query instanceof Error) reject(query)

            const updated = await self.find(id)
            if (updated instanceof Error) reject(updated)
            backup()
            resolve(updated)
        }).catch(error => error)
    }

    count(filterSql = '') {
        const self = this

        return new Promise(async (resolve, reject) => {

            const select = await self.query(`SELECT COUNT(id) FROM ${self.table} ${filterSql}`)
            if (select instanceof Error) reject(select)

            let result
            try {
                const query = select[0]
                const count = query.values[0][0]
                result = count
            } catch (error) {
                return reject(error)
            }
            resolve(result)
        }).catch(error => error)
    }
}

export default TableHandle
