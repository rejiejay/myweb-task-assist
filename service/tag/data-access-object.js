const taskTagRelational = {
    id: { required: false },
    taskId: { required: true },
    tagId: { required: true }
}

const taskTags = {
    id: { required: false },
    name: { required: true }
}

const dataAccessObject = {
    taskTagRelational,
    taskTags
}

export default dataAccessObject
