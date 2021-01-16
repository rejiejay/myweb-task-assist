/**
 * controller模块对外方法: 目前和以后仅开放一个公共方法 Controller
 */
import Task from './task.js';

const controllerMethod = {
    ...Task
}

/**
 * “通用的失败方法”,因为controller对外开放的方法不存在
 */
const emptyMethod = (parameter, responseHanle, request) => responseHanle.failure('404: The method was not found~', 404)

class Controller {
    constructor(request) {
        const url = request.url
        const method = request.method
        const controllerName = `${method}${url.replace(new RegExp('/', 'g'), '_')}` // ${method}_${pathname}_${pathname}_${pathname}
        const requestMethod = controllerMethod[controllerName]

        if (requestMethod) {
            this.request = requestMethod
        } else {
            this.request = emptyMethod
        }
    }
}

export default Controller
