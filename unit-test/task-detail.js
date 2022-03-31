import controller from './../controller/task-detail'
import service from './../service/task/index'
import longTermService from './../service/long-term'

import utils from './utils'

let id = ''
const title = 'title'
const content = 'content'
const specific = 'specific'

const addTaskByDetail = responseHanle => controller.post_task_add({ title, content }, responseHanle)

const getTaskDetail = async responseHanle => {
    const result = await service.addTask({ title, content })
    if (result instanceof Error) {
        return responseHanle.failure(result.message)
    }
    id = result.id;

    controller.get_task_id({ id }, responseHanle)
}

const editTaskByDetail = responseHanle => controller.post_task_edit({
    id,
    title,
    content,
    specific
}, responseHanle)

const editTaskDeadline = responseHanle => controller.post_task_deadline({
    id,
    deadlineTimestamp: new Date().getTime(),
}, responseHanle)

const editTaskDeadlineToNil = responseHanle => controller.post_task_deadline({
    id,
    deadlineTimestamp: 'null',
}, responseHanle)

const editTaskLongTerm = async responseHanle => {
    const result = await longTermService.addHandle('editTaskLongTermId')
    if (result instanceof Error) return responseHanle.failure(result.message)
    controller.post_task_long_term({
        id,
        longTermId: result.id,
    }, responseHanle)
}

const editTaskTag = responseHanle => controller.post_task_tag({
    id,
    tag: 'tag',
}, responseHanle)

const editTaskPriority = responseHanle => controller.post_task_priority({
    id,
    priority: 'priority',
}, responseHanle)

const editTaskProgress = responseHanle => controller.post_task_progress({
    id,
    progress: 'progress',
}, responseHanle)

const completedTask = responseHanle => controller.post_task_completed({
    id,
}, responseHanle)

const setUnCategorizedTaskToTop = responseHanle => controller.post_task_to_top({
    id,
}, responseHanle)

const setTaskLongTermProgram = responseHanle => controller.post_task_long_term_program({
    id,
    longTermProgramId: 'editTaskLongTermId',
}, responseHanle)

const deleteTask = responseHanle => controller.post_task_delete({
    id,
}, responseHanle)

const moveUnCategorizedTaskUp = async responseHanle => {
    const add1 = await service.addTask({ title, content })
    if (add1 instanceof Error) return responseHanle.failure(add1.message)
    const add2 = await service.addTask({ title, content })
    if (add2 instanceof Error) return responseHanle.failure(add2.message)
    const add3 = await service.addTask({ title, content })
    if (add3 instanceof Error) return responseHanle.failure(add3.message)

    controller.post_task_move_up({
        id: add2.id,
    }, responseHanle)
}

const moveUnCategorizedTaskDown = async responseHanle => {
    const add1 = await service.addTask({ title, content })
    if (add1 instanceof Error) return responseHanle.failure(add1.message)
    const add2 = await service.addTask({ title, content })
    if (add2 instanceof Error) return responseHanle.failure(add2.message)
    const add3 = await service.addTask({ title, content })
    if (add3 instanceof Error) return responseHanle.failure(add3.message)

    controller.post_task_move_down({
        id: add2.id,
    }, responseHanle)
}

const taskDetail = {
    addTaskByDetail: utils.resolveHandle(addTaskByDetail, { isShowResult: false }),
    getTaskDetail: utils.resolveHandle(getTaskDetail, { isShowResult: false }),
    editTaskByDetail: utils.resolveHandle(editTaskByDetail, { isShowResult: false }),
    editTaskDeadline: utils.resolveHandle(editTaskDeadline, { isShowResult: false }),
    editTaskDeadlineToNil: utils.resolveHandle(editTaskDeadlineToNil, { isShowResult: false }),
    editTaskLongTerm: utils.resolveHandle(editTaskLongTerm, { isShowResult: false }),
    editTaskTag: utils.resolveHandle(editTaskTag, { isShowResult: false }),
    editTaskPriority: utils.resolveHandle(editTaskPriority, { isShowResult: false }),
    editTaskProgress: utils.resolveHandle(editTaskProgress, { isShowResult: false }),
    completedTask: utils.resolveHandle(completedTask, { isShowResult: false }),
    setUnCategorizedTaskToTop: utils.resolveHandle(setUnCategorizedTaskToTop, { isShowResult: false }),
    setTaskLongTermProgram: utils.resolveHandle(setTaskLongTermProgram, { isShowResult: false }),
    deleteTask: utils.resolveHandle(deleteTask, { isShowResult: false }),
    moveUnCategorizedTaskUp: utils.resolveHandle(moveUnCategorizedTaskUp, { isShowResult: false }),
    moveUnCategorizedTaskDown: utils.resolveHandle(moveUnCategorizedTaskDown, { isShowResult: false }),
}

export default taskDetail
