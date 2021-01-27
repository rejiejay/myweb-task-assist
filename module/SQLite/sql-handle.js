class SqlHandle {
    constructor(sql) {
        this.sql = sql ? sql : ''
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
        if (!this.sql) return this.sql = sql
        this.sql += `AND ${sql}`
    }

    toWhereString() {
        if (!this.sql) return ''
        return `WHERE ${this.sql}`
    }
}

export default SqlHandle
