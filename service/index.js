/**
 * service 对外方法:
 * @task 数据库 task 模块里面各种操作方法
 */
import task from './task/index.js'
import tag from './tag/index.js'
import longTerm from './long-term'

const service = {
    task,
    tag,
    longTerm
}

export default service
