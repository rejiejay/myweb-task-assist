/**
 * database
 */
import { filterViewClassifys, quickRecalls } from './../../const';

const global = {

    taskPreviewId: '',

    taskDetailId: '',

    taskLongTermViewId: '',

    /**
     * @param {'un-categorized'} 1. !longTermId 2. !deadlineTimestamp 3. operationalPosition
     * @param {'quick-recall'} 1. count 2. update time
     * @param {'deadline'} 1. !longTermId 2. deadlineTimestamp
     */
    classifyFilterViewStatus: filterViewClassifys.unCategorized,
    classifyFilterViewMinTimestamp: 0,
    classifyFilterViewMaxTimestamp: new Date().getTime(),
    quickRecallType: quickRecalls.recently,
}

export default global
