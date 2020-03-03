const CONST = {
    SORT: {
        TIME: {
            value: 'time',
            lable: '时间排序',
            description: 'sort by time New to Old'
        },
        RANDOM: {
            value: 'random',
            lable: '随机排序',
            description: 'sort by random'
        }
    },

    STATISTICS: {
        DEFAULTS: {
            count: 0,
            expiredTimestamp: new Date().getTime()
        },
        DEMO: {
            count: 0,
            expiredTimestamp: 0
        }
    },

    CONCLUSION: {
        DEFAULTS: {
            id: null, // 作用: 判空
            conclusion: null, // 作用: 判空
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

    BASE_IMAGE_URL: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/'

}

export default CONST