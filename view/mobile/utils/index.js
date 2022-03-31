import timeTransformers from '../../../utils/time-transformers';

export const renderDeadlineTime = (deadlineTimestamp) => {
    const nowTimestamp = new Date().getTime()
    if (!deadlineTimestamp) {
        return ''
    }

    let deadlineTime = ''
    try {
        deadlineTime = `${timeTransformers.dateToTaskDetail(new Date(deadlineTimestamp))}截止`
    } catch (error) {
        deadlineTime = ''
    }

    if (deadlineTimestamp < nowTimestamp) {
        return deadlineTime
    }

    const daysTimestamp = 86400000;
    if (deadlineTimestamp < (nowTimestamp + daysTimestamp)) {
        return '一天内截止'
    }

    const threeDaysTimestamp = daysTimestamp * 3;
    if (deadlineTimestamp < (nowTimestamp + threeDaysTimestamp)) {
        return '三天内截止'
    }

    const weekTimestamp = daysTimestamp * 7;
    if (deadlineTimestamp < (nowTimestamp + weekTimestamp)) {
        return '一周内截止'
    }

    const monthTimestamp = daysTimestamp * 31;
    if (deadlineTimestamp < (nowTimestamp + monthTimestamp)) {
        return '一月内截止'
    }

    const seasonTimestamp = monthTimestamp * 3;
    if (deadlineTimestamp < (nowTimestamp + seasonTimestamp)) {
        return '一季度内截止'
    }

    const halfYearTimestamp = daysTimestamp * 182;
    if (deadlineTimestamp < (nowTimestamp + halfYearTimestamp)) {
        return '半年内截止'
    }

    const yearTimestamp = daysTimestamp * 365;
    if (deadlineTimestamp < (nowTimestamp + yearTimestamp)) {
        return '一年内截止'
    }

    return deadlineTime
}
