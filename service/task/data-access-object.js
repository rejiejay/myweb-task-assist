const dataAccessObject = {
    id: { required: false },

    title: { required: true },
    content: { required: true },

    specific: { required: false },
    measurable: { required: false },
    attainable: { required: false },
    relevant: { required: false },
    timeBound: { required: false },

    longTermId: { required: false },
    longTermName: { required: false }, // for display
    longTermProgramId: { required: false }, // for categorized program

    deadlineTimestamp: { required: false },
    tag: { required: false },
    progress: { required: false },
    priority: { required: false },

    createTimestamp: { required: true }, // useless
    updateTimestamp: { required: true }, // for sort quick-recall recently
    updateTimestamp: { required: false }, // for sort quick-recall recently
    readCount: { required: true }, // for sort quick-recall recently
    operationalPosition: { required: true }, // for sort un-categorized
}

export default dataAccessObject
