import CONST from './../../library/consts'

class SqlHandle {
    constructor() {
        this.filterSql = ''
        this.isFilter = false
        this.ilmit = false
        this.isRandom = false
        this.randomLimit = 15
    }

    dataToAddSql(data) {
        const keys = []
        const values = []
        Object.keys(data).forEach(key => {
            keys.push(key)
            values.push(data[key])
        })

        return `(${keys.join(',')}) VALUES (${values.join(',')})`
    }

    dataToUpdateSql(oldVal, newVal) {
        const sqls = []

        Object.keys(newVal).forEach(key => {
            if (newVal[key] !== oldVal[key]) sqls.push(`${key}=${newVal[key]}`)
        })

        return sqls.join(',')
    }

    mapperQuerySQLtoList(result) {
        const columns = result.columns
        const values = result.values

        return values.map(val => this.mapperFindSQLtoObject({ columns, values: val }))
    }

    mapperFindSQLtoObject({ columns, values }) {
        let object = {}
        columns.forEach((key, index) => {
            const value = values[index]
            object[key] = value
        })

        return object
    }

    addAndFilterSql(sql) {
        this.isFilter = true

        if (!this.filterSql) return this.filterSql = sql
        this.filterSql += `AND ${sql}`
    }

    addOrderByRandom(limit = CONST.defaultPageSize) {
        this.isRandom = true
        this.randomLimit = limit
    }

    addPagination(pageNo, pageSize) {
        const offset = pageNo * pageSize
        this.limit = { limit: pageSize, offset }
    }

    toSqlString() {
        let sql = ''

        if (this.isFilter) sql += `WHERE ${this.sql}`

        if (this.isRandom) sql += `RANDOM() LIMIT ${this.randomLimit}`

        if (!this.isRandom && !!this.limit) {
            const { limit, offset } = this.limit
            sql += `LIMIT ${limit} OFFSET ${offset}`
        }

        return sql
    }
}

export default SqlHandle
