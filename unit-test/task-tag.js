import controller from './../controller/task-list/tag'

import utils from './utils'

const getTaskTags = responseHanle => controller.get_task_list_tags({}, responseHanle)

const taskTag = {
    getTaskTags: utils.resolveHandle(getTaskTags, { isShowResult: false }),
}

export default taskTag
