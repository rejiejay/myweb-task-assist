import service from './../../service/task/tag'

const getTaskTags = async ({ }, responseHanle) => {
    const result = await service.getTaskTags()
    if (result instanceof Error) return responseHanle.failure(result.message);

    responseHanle.success(result)
}

const taskListTag = {
    get_task_list_tags: getTaskTags,
}

export default taskListTag
