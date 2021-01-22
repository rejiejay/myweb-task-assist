const dataAccessObject = {
    id: { required: false },
    title: { required: true },
    content: { required: true },
    createTimestamp: { required: true },
    taskTagId: { required: false },
    longTermId: { required: false },
    specific: { required: false },
    measurable: { required: false },
    attainable: { required: false },
    relevant: { required: false },
    timeBound: { required: false },
    minEffectTimestamp: { required: false },
    maxEffectTimestamp: { required: false },
    status: { required: false },
    priority: { required: false }
}

export default dataAccessObject
