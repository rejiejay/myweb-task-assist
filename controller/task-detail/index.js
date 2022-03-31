/**
 * controller task 对外方法: 所有方法对外
 */
import valuesStructuresVerify from './../../utils/values-structures-verify'

import task from './../../service/task/index'
import longTerm from './../../service/long-term'

import verify from './verify.js'

const getTaskDetail = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const find = await task.getTask(id)
    if (find instanceof Error) return responseHanle.failure(find.message);

    const readCount = (find.readCount + 1) || 1
    const result = await task.editTaskByField(id, { readCount })

    responseHanle.success(result)
}

const addTaskByDetail = async ({
    title,
    content,

    specific = '',
    measurable = '',
    attainable = '',
    relevant = '',
    timeBound = '',
}, responseHanle) => {
    const verifyInstance = verify.saveQueryHandle({ title, content })
    if (verifyInstance instanceof Error) return responseHanle.failure(verifyInstance.message);

    const result = await task.addTask({ title, content, specific, measurable, attainable, relevant, timeBound })

    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editTaskByDetail = async ({
    id,

    title,
    content,

    specific,
    measurable,
    attainable,
    relevant,
    timeBound,
}, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const verifyInstance = verify.saveQueryHandle({ title, content })
    if (verifyInstance instanceof Error) return responseHanle.failure(verifyInstance.message);

    const find = await task.getTask(id)
    if (find instanceof Error) return responseHanle.failure(find.message);

    let update = {
        title,
        content,
        updateTimestamp: new Date().getTime()
    }
    if (specific) update.specific = specific
    if (measurable) update.measurable = measurable
    if (attainable) update.attainable = attainable
    if (relevant) update.relevant = relevant
    if (timeBound) update.timeBound = timeBound
    const result = await task.editTaskByField(id, update)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editTaskDeadline = async ({
    id,

    deadlineTimestamp,
}, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    if (!deadlineTimestamp) {
        return responseHanle.failure('deadlineTimestamp can\`t nil');
    }

    const result = await task.editTaskByField(id, {
        deadlineTimestamp,
        updateTimestamp: new Date().getTime()
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editTaskLongTerm = async ({
    id,

    longTermId,
}, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const longTermIdVerify = valuesStructuresVerify.isStringNil(longTermId, 'longTermId')
    if (longTermIdVerify instanceof Error) return responseHanle.failure(longTermIdVerify.message);

    let longTermName = 'null'
    if (longTermId !== 'null') {
        const find = await longTerm.getById(longTermId)
        if (find instanceof Error) return responseHanle.failure(find.message);
        longTermId = find.id
        longTermName = find.name
    }

    const result = await task.editTaskByField(id, {
        longTermId,
        longTermName,
        updateTimestamp: new Date().getTime()
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editTaskTag = async ({
    id,

    tag,
}, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const tagVerify = valuesStructuresVerify.isStringNil(tag, 'tag')
    if (tagVerify instanceof Error) return responseHanle.failure(tagVerify.message);

    const result = await task.editTaskByField(id, {
        tag,
        updateTimestamp: new Date().getTime()
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editTaskPriority = async ({
    id,

    priority,
}, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const priorityVerify = valuesStructuresVerify.isStringNil(priority, 'priority')
    if (priorityVerify instanceof Error) return responseHanle.failure(priorityVerify.message);

    const result = await task.editTaskByField(id, {
        priority,
        updateTimestamp: new Date().getTime()
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const editTaskProgress = async ({
    id,

    progress,
}, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const progressVerify = valuesStructuresVerify.isStringNil(progress, 'progress')
    if (progressVerify instanceof Error) return responseHanle.failure(progressVerify.message);

    const find = await task.getTask(id)
    if (find instanceof Error) return responseHanle.failure(find.message);

    let update = {
        progress,
        updateTimestamp: new Date().getTime()
    }

    if (find.completedTimestamp) {
        update.completedTimestamp = 'null'
    }

    const result = await task.editTaskByField(id, update)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const completedTask = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const nowTimestamp = new Date().getTime()

    const result = await task.editTaskByField(id, {
        progress: 'done',
        updateTimestamp: nowTimestamp,
        completedTimestamp: nowTimestamp,
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const deleteTask = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);

    const result = await task.deleteTask(id)
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const setUnCategorizedTaskToTop = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const find = await task.getTask(id)
    if (find instanceof Error) return responseHanle.failure(find.message);

    const result = await task.editTaskByField(id, {
        operationalPosition: new Date().getTime()
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const moveUnCategorizedTaskUp = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const find = await task.getTask(id)
    if (find instanceof Error) return responseHanle.failure(find.message);

    const behindTasks = await task.findBehindTask({
        operationalPosition: find.operationalPosition,
        isUp: true
    })
    if (behindTasks instanceof Error) return responseHanle.failure(behindTasks.message);

    if (behindTasks.length <= 0) return responseHanle.failure('can\'t find up task');
    const behindTask = behindTasks[0]

    const result = await task.editTaskByField(id, {
        operationalPosition: behindTask.operationalPosition + 1
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const moveUnCategorizedTaskDown = async ({ id }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const find = await task.getTask(id)
    if (find instanceof Error) return responseHanle.failure(find.message);

    const behindTasks = await task.findBehindTask({
        operationalPosition: find.operationalPosition,
        isUp: false
    })
    if (behindTasks instanceof Error) return responseHanle.failure(behindTasks.message);

    if (behindTasks.length <= 0) return responseHanle.failure('can\'t find down task');
    const behindTask = behindTasks[0]

    const result = await task.editTaskByField(id, {
        operationalPosition: behindTask.operationalPosition - 1
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const setTaskLongTermProgram = async ({ id, longTermProgramId }, responseHanle) => {
    const idVerify = valuesStructuresVerify.isStringNil(id, 'id')
    if (idVerify instanceof Error) return responseHanle.failure(idVerify.message);
    const longTermProgramIdVerify = valuesStructuresVerify.isStringNil(longTermProgramId, 'longTermProgramId')
    if (longTermProgramIdVerify instanceof Error) return responseHanle.failure(longTermProgramIdVerify.message);

    const result = await task.editTaskByField(id, {
        longTermProgramId
    })
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const TaskDetail = {
    get_task_id: getTaskDetail,
    post_task_add: addTaskByDetail,
    post_task_edit: editTaskByDetail,
    post_task_deadline: editTaskDeadline,
    post_task_long_term: editTaskLongTerm,
    post_task_tag: editTaskTag,
    post_task_priority: editTaskPriority,
    post_task_progress: editTaskProgress,
    post_task_completed: completedTask,
    post_task_delete: deleteTask,

    post_task_to_top: setUnCategorizedTaskToTop,
    post_task_move_up: moveUnCategorizedTaskUp,
    post_task_move_down: moveUnCategorizedTaskDown,

    post_task_long_term_program: setTaskLongTermProgram,
}

export default TaskDetail
