const longTermTaskRelational = {
    id: { required: false },
    title: { required: true },
    record: { required: false },
    spreadZoomIdentify: { required: false },
    spreadZoomDepth: { required: false },
    detailCategoryIdentify: { required: true }
}

const longTermRecordDetail = {
    id: { required: false },
    categoryIdentify: { required: true },
    uniquelyIdentify: { required: true },
    parentUniquelyIdentify: { required: true },
    detail: { required: true }
}

const dataAccessObject = {
    longTermTaskRelational,
    longTermRecordDetail
}

export default dataAccessObject
