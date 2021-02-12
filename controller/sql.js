import SqliteJs from './../module/SQLite'

const getOutPutSql = async function getOutPutSql({ sql }, responseHanle) {
    if (!sql) return responseHanle.failure('sql can`t Nil')

    let result = {}
    try {
        result = SqliteJs.db.exec(sql)
    } catch (error) {
        return responseHanle.failure(`SqliteJs execute ${sql} error: ${error}`)
    }

    responseHanle.success(result)
}

const SQL = {
    post_sql_test: getOutPutSql
}

export default SQL
