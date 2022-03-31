/**
 * controller
 */
import { pages, filterViewClassifys } from './../../const';
import { queryToHash } from './../../../utils/url-helper';
import { pushHistoryStack } from './../../routes';

import {
    updateTaskDetailId,
    updateClassifyFilter,
    updateTaskPreviewId,
    updateLongTermViewId,
} from './global';

export const stopHashChange = {
    type: 'stop_hash_change'
}

export const allowHashChange = {
    type: 'allow_hash_change'
}

export const getEffectivePage = (pageLocation) => {
    if (!pageLocation) {
        return pages.entryView;
    }

    const pagesList = Object.values(pages);
    if (!pagesList.includes(pageLocation)) {
        return pages.entryView;
    }

    return pageLocation;
}

export const hashchangeHandle = (pageLocation) => {
    pushHistoryStack(pageLocation);
    window.location.hash = queryToHash({ pageLocation });
}

export const updatePageLocationStatus = (pageLocation) => {
    return {
        type: 'update_page_location_status',
        data: getEffectivePage(pageLocation)
    }
}

export const goTaskDetailPage = ({ id }, dispatch) => {
    const pageLocation = pages.taskDetail;
    hashchangeHandle(pageLocation)

    dispatch(updatePageLocationStatus(pageLocation))
    dispatch(updateTaskDetailId(id))
}

export const goLongTermSelectPage = () => {
    const pageLocation = pages.longTermSelect;
    hashchangeHandle(pageLocation)

    return {
        type: 'update_page_location_status',
        data: getEffectivePage(pageLocation)
    }
}

export const goRandomlyListPage = () => {
    const pageLocation = pages.randomlyList;
    hashchangeHandle(pageLocation)

    return {
        type: 'update_page_location_status',
        data: getEffectivePage(pageLocation)
    }
}

export const goCompleteListPage = () => {
    const pageLocation = pages.taskCompletedView;
    hashchangeHandle(pageLocation)

    return {
        type: 'update_page_location_status',
        data: getEffectivePage(pageLocation)
    }
}

export const goUncategorizedView = (dispatch) => {
    const pageLocation = pages.classifyFilterView;
    hashchangeHandle(pageLocation)

    dispatch(updatePageLocationStatus(pageLocation))
    dispatch(updateClassifyFilter(filterViewClassifys.unCategorized))
}

export const goTaskPreview = (id, dispatch) => {
    const pageLocation = pages.taskPreview;
    hashchangeHandle(pageLocation)

    dispatch(updatePageLocationStatus(pageLocation))
    dispatch(updateTaskPreviewId(id))
}

export const goLongTermList = (id, dispatch) => {
    const pageLocation = pages.longTermList;
    hashchangeHandle(pageLocation)

    dispatch(updatePageLocationStatus(pageLocation))
    dispatch(updateLongTermViewId(id))
}

export const goQuickRecallView = (dispatch) => {
    const pageLocation = pages.classifyFilterView;
    hashchangeHandle(pageLocation)

    dispatch(updatePageLocationStatus(pageLocation))
    dispatch(updateClassifyFilter(filterViewClassifys.quickRecall))
}

export const goTimeClassifyView = (dispatch, minTimestamp, maxTimestamp) => {
    const pageLocation = pages.classifyFilterView;
    hashchangeHandle(pageLocation)

    dispatch(updatePageLocationStatus(pageLocation))
    dispatch(updateClassifyFilter(filterViewClassifys.deadline, minTimestamp, maxTimestamp))
}
