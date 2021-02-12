import CONSTS from './../../../library/consts'

const initStatusLable = value => {
    const description = CONSTS.utils.serviceValueToViewLable(CONSTS.task.status, value)
    return description
}
const initPriorityLable = value => {
    const description = CONSTS.utils.serviceValueToViewLable(CONSTS.task.priority, value)
    return description
}

const utils = {
    initStatusLable,
    initPriorityLable
}

export default utils