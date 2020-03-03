const CONST = {
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit',
        SHOW: 'show'
    },
    PLAN: {
        DEFAULTS: {
            id: 0,
            program: null,
        },
        DEMO: {
            id: 0,
            targetId: 'not-null',
            program: null,
            according: null,
            sqlTimestamp: 'not-null',
        }
    }
}

export default CONST