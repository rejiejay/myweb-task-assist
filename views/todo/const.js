const CONST = {
    PROCESS_TARGET: {
        DEFAULTS: null,
        DEMO: {
            id: 'gwy',
            name: '公务员'
        }
    },
    TASK: {
        /** 作用: 判空 */
        DEFAULTS: {
            id: null,
            conclusion: null,
            title: null,
            content: null,
            completeTimestamp: null,
            putoffTimestamp: null,
            conclusion: null,
            measure: null,
            span: null,
            aspects: null,
            worth: null,
            estimate: null,
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
    }
}

export default CONST