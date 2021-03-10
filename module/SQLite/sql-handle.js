import CONST from './../../library/consts'
import valuesStructuresVerify from './../../utils/values-structures-verify'

class SqlHandle {
    constructor() {
        this.isFilter = false
        this.filterSql = ''

        this.isRandom = false
        this.randomSQL = ''

        this.isOrder = false
        this.orderSQL = ''

        this.isPagination = false
        this.paginationSQL = ''
    }

    dataToAddSql(data) {
        const keys = []
        const values = []
        Object.keys(data).forEach(key => {
            keys.push(key)
            let value = data[key]

            const isStringInstance = valuesStructuresVerify.isString(value)
            if (isStringInstance.result === 1) value = `'${value}'`

            values.push(value)
        })

        return `(${keys.join(',')}) VALUES (${values.join(',')})`
    }

    dataToUpdateSql({ oldVal, newVal }) {
        const sqls = []

        Object.keys(newVal).forEach(key => {
            if (newVal[key] !== oldVal[key]) {
                const value = newVal[key]
                let sql = `${key}=${value}`

                const isStringInstance = valuesStructuresVerify.isString(value)
                if (isStringInstance.result === 1) sql = `${key}='${value}'`
                if (value === 'null') sql = `${key}=null`

                sqls.push(sql)
            }
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

    tableToNodeTreeConver = (table, rootUniquelyIdentify = 'root') => {
        const findChildren = element => {
            element.children = table.reduce((nodes, value) => {
                if (element.uniquelyIdentify === value.parentUniquelyIdentify) nodes.push(findChildren(value))
                return nodes
            }, [])

            return element
        }

        const nodeTree = table.reduce((nodes, value) => {
            if (value.parentUniquelyIdentify === rootUniquelyIdentify) nodes.push(findChildren(value))
            return nodes
        }, [])

        return nodeTree
    }

    addAndFilterSql(sql) {
        this.isFilter = true

        if (!this.filterSql) return this.filterSql = sql
        this.filterSql += ` AND ${sql} `
    }

    addOrFilterSql(sql) {
        this.isFilter = true

        if (!this.filterSql) return this.filterSql = sql
        this.filterSql += ` OR ${sql} `
    }

    addOrderByRandom(limit = CONST.defaultPageSize) {
        this.isRandom = true
        this.randomSQL = ` ORDER BY RANDOM() LIMIT ${limit} `
    }

    addPagination(pageNo, pageSize) {
        const offset = (pageNo - 1) * pageSize
        const limit = pageSize
        this.isPagination = true
        this.paginationSQL = ` LIMIT ${limit} OFFSET ${offset} `
    }

    addOrder(column, isASC = true) {
        this.isOrder = true
        this.orderSQL = ` ORDER BY ${column} ${isASC ? 'ASC' : 'DESC'} `
    }

    toSqlString() {
        let sql = ''

        if (!!this.isFilter) sql += `WHERE ${this.filterSql || ''} `

        // random 会覆盖 pagination order
        if (!!this.isRandom) {
            sql += this.randomSQL
        } else {
            if (!!this.orderSQL) sql += this.orderSQL
            if (!!this.isPagination) sql += this.paginationSQL
        }

        return sql
    }
}

export default SqlHandle
