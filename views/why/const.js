const CONST = {

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
    },

    REASON_TYPE: {
        NEWEST: {
            value: 'newest',
            url: 'why/get/three',
            dom: 'new_dom',
            des: '最新理由',
        },
        RELATED: {
            value: 'related',
            url: 'why/get/reasonable',
            dom: 'related_dom',
            des: '最大理由',
        },
        RANDOM: {
            value: 'random',
            url: 'why/get/random',
            dom: 'random_dom',
            des: '任何理由',
        }
    },

    STATISTICS: {
        DEFAULTS: {
            monthCount: 0,
            twoWeekCount: 0,
            oneWeekCount: 0,
            threeDayCount: 0,
            towDayCount: 0,
            oneDayCount: 0,
            expireTimestamp: new Date().getTime()
        },
        DEMO: {
            monthCount: 0,
            twoWeekCount: 0,
            oneWeekCount: 0,
            threeDayCount: 0,
            towDayCount: 0,
            oneDayCount: 0,
            expireTimestamp: new Date().getTime()
        }
    }
}

export default CONST