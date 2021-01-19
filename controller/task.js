import service from './../service/index.js'

const get_task_list = function get_task_list(parameter, responseHanle) {
    const list = service.task.getList()
    responseHanle.success(list)
}

const Task = {
    get_task_list
}

export default Task
