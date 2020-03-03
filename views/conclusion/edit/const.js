const CONST = {
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit'
    },
    TASK: {
        /** 作用: 判空 */
        DEFAULTS: {
            id: null,
            title: null,
            image: null,
            conclusion: null,
        },
        DEMO: {
            id: 1,
            targetId: 'not-null',
            title: 'not-null',
            content: null,
            conclusion: 'not-null',
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