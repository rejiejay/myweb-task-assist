import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'

const getRecordList = async function getRecordList({
    categorys,
    isRandom,
    pageNo,
}, responseHanle) {
    const verifys = [
        { value: categorys, field: 'categorys', method: 'isArrayNilString' },
        { value: isRandom, field: 'isRandom', method: 'isBooleanString' },
        { value: pageNo, field: 'pageNo', method: 'isIntNumString' }
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)
    let parameter = verifyInstance.data

    if (!pageNo) parameter.pageNo = 1;
    if (isRandom) delete parameter.pageNo;

    const listInstance = await service.AAEH.getList(parameter);
    if (listInstance.result !== 1) return responseHanle.json(listInstance)
    const list = listInstance.data

    const countInstance = await service.AAEH.getCount(parameter);
    if (countInstance.result !== 1) return responseHanle.json(countInstance)
    const count = countInstance.data

    responseHanle.success({
        list,
        count,
        pageNo: parameter.pageNo || 0,
    });
}

const getRecordById = async function getRecordById({
    id,
}, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const getInstance = await service.AAEH.getById(id);
    responseHanle.json(getInstance)
}

const getRecordOneRandom = async function getRecordOneRandom({}, responseHanle) {
    const getInstance = await service.AAEH.getOneRandom();
    responseHanle.json(getInstance)
}

const addRecord = async function addRecord({ title, content, category }, responseHanle) {
    const verifys = [
        { value: title, field: 'title', method: 'isStringNil' },
        { value: content, field: 'content', method: 'isStringNil' },
        { value: category, field: 'category', method: 'isStringNil' },
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const getInstance = await service.AAEH.addRecord({ title, content, category })
    responseHanle.json(getInstance)
}

const editRecord = async function editRecord({ id, title, content, category }, responseHanle) {
    const verifys = [
        { value: id, field: 'id', method: 'isId' },
        { value: title, field: 'title', method: 'isStringNil' },
        { value: content, field: 'content', method: 'isStringNil' },
        { value: category, field: 'category', method: 'isStringNil' },
    ]
    const verifyInstance = valuesStructuresVerify.group(verifys)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const getInstance = await service.AAEH.editRecord({ id, title, content, category })
    responseHanle.json(getInstance)
}

const deleteRecord = async function deleteRecord({ id }, responseHanle) {
    const verifyInstance = valuesStructuresVerify.isId(id)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const deleteInstance = await service.AAEH.deleteRecord(id)
    responseHanle.json(deleteInstance)
}

const AdministrativeAptitudeEssayHelper = {
    get_AAEH_list: getRecordList,
    get_AAEH_id: getRecordById,
    get_AAEH_random_one: getRecordOneRandom,
    post_AAEH_add: addRecord,
    post_AAEH_edit: editRecord,
    post_AAEH_delete: deleteRecord,
}

export default AdministrativeAptitudeEssayHelper