const CONST = {
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit',
    },
    WHY: {
        DEFAULTS: {
            id: null, // 作用: 判空
            targetId: null, // 作用: 判空
            content: null, // 作用: 判空
        },
        DEMO: {
            id: 1,
            targetId: 'not-null',
            content: 'not-null',
            stickyTimestamp: null,
            sqlTimestamp: null
        }
    }
}

export default CONST