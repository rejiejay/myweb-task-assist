const CONST = {
    PROCESS_TARGET: {
        DEFAULTS: {
            id: null,
            name: '所有'
        },
        DEMO: {
            id: 'gwy',
            name: '公务员'
        }
    },
    PAGE_STATUS: {
        DEFAULTS: 'list',
        LIST: 'list',
        SEARCH: 'search',
        EDIT: 'edit'
    },
    TASK: {
        DEFAULTS: {
            id: null,
            title: null,
            conclusion: null
        },
        DEMO: {
            id: 1,
            targetId: 'not-null',
            title: 'not-null',
            content: '',
            conclusion: null,
            measure: null,
            span: null,
            aspects: null,
            worth: null,
            estimate: null,
            image: null,
            putoffTimestamp: null,
            completeTimestamp: null,
            sqlTimestamp: null
        }
    },
}

export default CONST