/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'

/**
 * 注意: 这里需要防止SQL注入, 因为是字符串, 所以必须要考虑到这层因素.
 */
const getTaskList = function getTaskList(parameter, responseHanle) {
    service.task.getList({})
        .then(
            result => responseHanle.json(result),
            error => responseHanle.json(error)
        )
}

const Task = {
    get_task_list: getTaskList
}

export default Task

