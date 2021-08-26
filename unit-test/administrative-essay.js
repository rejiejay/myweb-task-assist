import controller from './../controller/administrative-essay'
import { essay } from './../view/components/page/mind-category-tag/essay'
import JsonHelper from './../utils/json-helper'

import utils from './utils'

const getRecordListWithDefault = responseHanle => controller.get_AAEH_list({}, responseHanle)
const getRecordListWithPage2 = responseHanle => controller.get_AAEH_list({ pageNo: 2 }, responseHanle)

const getRecordListWithCategoryEssay = responseHanle => {
    const categorys = JsonHelper.josnToString(essay.map(({ id }) => id))
    return controller.get_AAEH_list({ categorys }, responseHanle)
}

const getRecordListWithRandom = responseHanle => controller.get_AAEH_list({ isRandom: 'true' }, responseHanle)

const getRecordWithId = responseHanle => controller.get_AAEH_id({ id: 1 }, responseHanle)

const getRecordWithRandom = responseHanle => controller.get_AAEH_random_one({ }, responseHanle)

const addRecord = responseHanle => controller.post_AAEH_add({
    title: 'title',
    content: 'content',
    category: 'category',
}, responseHanle)

const editRecord = responseHanle => controller.post_AAEH_edit({
    id: 1,
    title: 'title',
    content: 'content',
    category: 'category',
}, responseHanle)

const deleteRecord = responseHanle => controller.post_AAEH_delete({
    id: 1,
}, responseHanle)

const AdministrativeAptitudeEssayHelper = {
    getRecordListWithDefault: utils.resolveHandle(getRecordListWithDefault, { isShowResult: false }),
    getRecordListWithPage2: utils.resolveHandle(getRecordListWithPage2, { isShowResult: false }),
    getRecordListWithCategoryEssay: utils.resolveHandle(getRecordListWithCategoryEssay, { isShowResult: false }),
    getRecordListWithRandom: utils.resolveHandle(getRecordListWithRandom, { isShowResult: false }),
    getRecordWithId: utils.resolveHandle(getRecordWithId, { isShowResult: false }),
    getRecordWithRandom: utils.resolveHandle(getRecordWithRandom, { isShowResult: false }),
    addRecord: utils.resolveHandle(addRecord, { isShowResult: false }),
    editRecord: utils.resolveHandle(editRecord, { isShowResult: false }),
    deleteRecord: utils.resolveHandle(deleteRecord, { isShowResult: true }),
}

export default AdministrativeAptitudeEssayHelper
