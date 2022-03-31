/**
 * service 对外方法:
 * @task 数据库 task 模块里面各种操作方法
 */
import auth from './auth'
import task from './task/index.js'
import sql from './sql'

const service = {
    auth,
    task,
    sql
}

export default service
