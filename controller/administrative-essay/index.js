import fse from 'fs-extra';

import service from './../../service/index.js'
import valuesStructuresVerify from './../../utils/values-structures-verify'
import FilesHelper from './../../utils/files-helper'
import config from './../../config'

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

const getRecordOneRandom = async function getRecordOneRandom({ }, responseHanle) {
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

const addRecordImage = async function addRecordImage({ id, base64 }, responseHanle) {
    if (!base64) return responseHanle.failure('base64 不能为空')
    const verifyInstance = valuesStructuresVerify.isId(id)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const getInstance = await service.AAEH.getById(id);
    if (getInstance.result !== 1) return responseHanle.json(getInstance)
    const record = getInstance.data;
    const imageString = record.images || '';
    const imageArray = imageString.split(',').filter(img => !!img);

    const fileId = `${new Date().getTime()}`
    const fileName = `${fileId}.png`
    const filePath = `${config.images.profixPath}${fileName}`;
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const base64Buffer = new Buffer(base64Data, 'base64');
    try {
        await FilesHelper.outputFile(filePath, base64Buffer);
    } catch (error) {
        return responseHanle.failure(`${error}`)
    }
    imageArray.push(fileId);

    const updateRecordImageInstance = await service.AAEH.updateRecordImage(id, {
        ...record,
        images: imageArray.join(',')
    });
    if (updateRecordImageInstance.result !== 1) return responseHanle.json(updateRecordImageInstance)

    return responseHanle.success(fileId)
}

const deleteRecordImage = async function deleteRecordImage({ id, imageId }, responseHanle) {
    if (!imageId) return responseHanle.failure('imageId 不能为空')
    const verifyInstance = valuesStructuresVerify.isId(id)
    if (verifyInstance.result !== 1) return responseHanle.json(verifyInstance)

    const getInstance = await service.AAEH.getById(id);
    if (getInstance.result !== 1) return responseHanle.json(getInstance)
    const record = getInstance.data;
    const imageString = record.images || '';
    const imageArray = imageString.split(',').filter(img => !!img);

    const fileName = `${imageId}.png`
    const filePath = `${config.images.profixPath}${fileName}`;

    const isFilePath = await FilesHelper.isFilePath(filePath)
    if (!(isFilePath instanceof Error)) {
        try {
            fse.removeSync(filePath)
        } catch (error) {
            return responseHanle.failure(`remove image ${path} failure`)
        }
    }

    const deleteimageArray = imageArray.filter(item => item !== imageId);

    const updateRecordImageInstance = await service.AAEH.updateRecordImage(id, {
        ...record,
        images: deleteimageArray.join(',')
    });
    if (updateRecordImageInstance.result !== 1) return responseHanle.json(updateRecordImageInstance)

    return responseHanle.success()
}

const AdministrativeAptitudeEssayHelper = {
    get_AAEH_list: getRecordList,
    get_AAEH_id: getRecordById,
    get_AAEH_random_one: getRecordOneRandom,
    post_AAEH_add: addRecord,
    post_AAEH_edit: editRecord,
    post_AAEH_delete: deleteRecord,
    post_AAEH_image_add: addRecordImage,
    post_AAEH_image_delete: deleteRecordImage,
}

export default AdministrativeAptitudeEssayHelper