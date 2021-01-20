/**
 * controller task 对外方法: 所有方法对外
 */
import service from './../../service/index.js'

const getTaskList = function getTaskList(parameter, responseHanle) {
    service.task.getList()
    .then(
        result => responseHanle.json(result),
        error => responseHanle.json(error)
    )
}

const Task = {
    get_task_list: getTaskList
}

export default Task

