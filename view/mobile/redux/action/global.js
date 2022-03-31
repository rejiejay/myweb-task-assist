/**
 * controller
 */
import { filterViewClassifys } from './../../const';

/**
 * 切换回忆方式
 * @param {string} type recently mostly
 * @returns 
 */
export const switchQuickRecallType = (type = 'recently') => ({
    type: 'switch_quick_recall_type',
    data: type
})

export const updateTaskDetailId = (id = '') => ({
    type: 'update_task_detail_id',
    data: id
})

export const updateClassifyFilter = (
    status = filterViewClassifys.unCategorized,
    minTimestamp = '',
    maxTimestamp = '',
) => ({
    type: 'update_classify_filter',
    data: {
        status,
        minTimestamp,
        maxTimestamp,
    },
})

export const updateTaskPreviewId = (id = '') => ({
    type: 'update_task_preview_id',
    data: id
})

export const updateLongTermViewId = (id = '') => ({
    type: 'update_long_term_view_id',
    data: id
})
