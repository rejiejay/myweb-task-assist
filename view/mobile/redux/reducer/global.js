import store from './../store/global';

/**
 * service
 */
function global(state = store, action) {
    switch (action.type) {
        case 'switch_quick_recall_type':
            return { ...state, quickRecallType: action.data }

        case 'update_task_detail_id':
            return { ...state, taskDetailId: action.data }

        case 'update_classify_filter':
            return {
                ...state,
                classifyFilterViewStatus: action.data.status,
                classifyFilterViewMinTimestamp: action.data.minTimestamp,
                classifyFilterViewMaxTimestamp: action.data.maxTimestamp,
            }

        case 'update_task_preview_id':
            return { ...state, taskPreviewId: action.data }

        case 'update_long_term_view_id':
            return { ...state, taskLongTermViewId: action.data }

        default:
            return state
    }
}

export default global
