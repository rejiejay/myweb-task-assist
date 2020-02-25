window.onload = function () {
    initialization.main()
}

var CONST = {
    TARGET: {
        DEFAULTS: {
            id: '',
            name: '所有'
        },
        DEMO: {
            id: 'gwy',
            name: '公务员'
        }
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
    },

    REASON_TYPE: {
        NEW: {
            value: 'new',
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

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var self = this

        components.init()
        this.initDom()

        spiritual.init()
        add.init()
        operational.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        statistics.init()
        reason.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        spiritual.dom = document.getElementById('spiritual')
        add.dom = document.getElementById('add-edit')

        statistics.all_des_dom = document.getElementById('statistics-all')
        statistics.target_des_dom = document.getElementById('statistics-target')

        reason.title_dom = document.getElementById('reason-title')
        reason.new_dom = document.getElementById('reason-new')
        reason.related_dom = document.getElementById('reason-related')
        reason.random_dom = document.getElementById('reason-random')
        reason.load_dom = document.getElementById('reason-load')

        operational.todo_dom = document.getElementById('operational-todo')
        operational.plan_dom = document.getElementById('operational-plan')
    },
}

var components = {
    toast: null,
    serviceStorage: null,
    constHandle: null,
    jsonHandle: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
        this.constHandle = ConstHandle
        this.jsonHandle = JsonHandle
    }
}

var process = {
    target: CONST.TARGET.DEFAULTS,
    dom: null,

    init: function init() {
        var self = this

        return new Promise((resolve, reject) => {
            self.initProcessTarget(resolve, reject)
        })
    },

    initProcessTarget: function initProcessTarget(resolve, reject) {
        var self = this

        components.serviceStorage.getItem({
            key: 'processTarget'
        }).then(
            res => {
                self.target = res
                resolve()
            },
            error => reject()
        )
    }
}

var spiritual = {
    dom: null,
    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './spiritual/index.html'
        }
    }
}

var add = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './edit/index.html'
        }
    }
}

var statistics = {
    all_des_dom: null,
    target_des_dom: null,

    init: function init() {
        var targetId = process.target.id
        var statisticsAllString = window.localStorage['task-todo-statistics-all']
        var statisticsTargetString = window.localStorage[`task-todo-statistics-${targetId}`]

        if (!statisticsAllString || !statisticsTargetString) return this.getDate()

        var statisticsAllVerify = components.jsonHandle.verifyJSONString({
            jsonString: statisticsAllString
        })
        var statisticsTargetVerify = components.jsonHandle.verifyJSONString({
            jsonString: statisticsTargetString
        })

        if (!statisticsAllVerify.isCorrect || !statisticsTargetVerify.isCorrect) return this.getDate()

        var statisticsAll = statisticsAllVerify.data
        var statisticsTarget = statisticsTargetVerify.data
        
        /**
         * 含义: 现在时间 超过 过期时间, 就表示过期
         */
        var nowTimestamp = new Date().getTime()
        if (!statisticsAll || !statisticsAll.expireTimestamp || (nowTimestamp > +statisticsAll.expireTimestamp)) return this.getDate()
        if (!statisticsTarget || !statisticsTarget.expireTimestamp || (nowTimestamp > +statisticsAll.expireTimestamp)) return this.getDate()

        this.renderStatisticsAll(statisticsAll)
        this.renderStatisticsTarget(statisticsTarget)
    },

    getDate: function getDate() {
        var self = this
        /**
         * 含义: 统计一小时后过期
         * 初衷: 防止频繁调用统计接口
         */
        var expireTimestamp = new Date().getTime() + (1000 * 60 * 60)
        var targetId = process.target.id

        components.fetch.get({
            url: 'task/statistics',
            query: {}
        }).then(
            res => {
                var statistics = {
                    expireTimestamp,
                    ...res.data
                }
                window.localStorage.setItem(`task-todo-statistics-all`, JSON.stringify(statistics))
                self.renderStatisticsAll(statistics)
            },
            error => {}
        )

        components.fetch.get({
            url: 'task/statistics',
            query: {
                targetId
            }
        }).then(
            res => {
                var statistics = {
                    expireTimestamp,
                    ...res.data
                }
                window.localStorage.setItem(`task-todo-statistics-${targetId}`, JSON.stringify(statistics))
                self.renderStatisticsTarget(statistics)
            },
            error => {}
        )
    },

    handleStatistics: function handleStatistics({
        monthCount,
        twoWeekCount,
        oneWeekCount,
        threeDayCount,
        towDayCount,
        oneDayCount
    }) {
        var count = 0
        var time = '这个月'
        if (oneDayCount > 7) {
            count = oneDayCount
            time = '昨天'
        } else if (towDayCount > 7) {
            count = towDayCount
            time = '这两天'
        } else if (threeDayCount > 7) {
            count = threeDayCount
            time = '这三天'
        } else if (oneWeekCount > 7) {
            count = oneWeekCount
            time = '这星期'
        } else if (twoWeekCount > 7) {
            count = twoWeekCount
            time = '这两星期'
        } else {
            count = monthCount
            time = '这个月'
        }

        return {
            count,
            time
        }
    },

    renderStatisticsAll: function renderStatisticsAll(data) {
        var {
            count,
            time
        } = this.handleStatistics(data)

        this.all_des_dom.innerHTML = `${time}共完成<span>${count}</span>个任务`
    },

    renderStatisticsTarget: function renderStatisticsTarget(data) {
        var {
            count,
            time
        } = this.handleStatistics(data)

        this.target_des_dom.innerHTML = `其中${time}完成<span>${count}</span>个${process.target.name}任务`
    }
}

var reason = {
    title_dom: null,
    new_dom: null,
    related_dom: null,
    random_dom: null,
    load_dom: null,
    data: {
        new: [ /** CONST.WHY.DEMO */ ],
        related: [ /** CONST.WHY.DEMO */ ],
        random: [ /** CONST.WHY.DEMO */ ]
    },

    init: function init() {
        var self = this

        this.renderTitle()
        this.getBy('new')
        this.getBy('related')
        this.getBy('random', 2)

        this.load_dom.onclick = function () {
            self.getBy('random', 5)
        }
    },

    renderTitle: function renderTitle() {
        this.title_dom.innerHTML = `为什么要“${process.target.name}”?`
    },

    getBy: function getBy(type, count) {
        var self = this

        var url = components.constHandle.findValueByValue({
            CONST: CONST.REASON_TYPE,
            supportKey: 'value',
            supportValue: type,
            targetKey: 'url'
        })

        var query = {
            targetId: process.target.id
        }

        count ? query.count = count : null

        components.fetch.get({
            url,
            query
        }).then(
            res => {
                self.data[type] = res.data
                self.renderBy(type)
            },
            error => {}
        )
    },

    renderBy: function renderBy(type) {
        var self = this
        var list = this.data[type]

        var dom = components.constHandle.findValueByValue({
            CONST: CONST.REASON_TYPE,
            supportKey: 'value',
            supportValue: type,
            targetKey: 'dom'
        })

        var des = components.constHandle.findValueByValue({
            CONST: CONST.REASON_TYPE,
            supportKey: 'value',
            supportValue: type,
            targetKey: 'des'
        })

        if (list.length === 0) return this[dom].innerHTML = `<div class="reason-item">${des}为空</div>`

        this[dom].innerHTML = list.map(({
            id,
            targetId,
            content,
            stickyTimestamp,
            sqlTimestamp
        }) => `
            <div class="reason-item">
                <div class="item-container">${content.replace(/\n/g, "<br>")}</div>
            </div>
        `).join('')

        var children_dom = this[dom].children
        for (var index = 0; index < children_dom.length; index++) {
            (function (index) {
                var element = children_dom[index];
                var targetItem = list[index];

                element.onclick = function () {
                    self.editWhy(targetItem)
                }
            })(index)
        }
    },

    editWhy: function editWhy({
        id,
        targetId,
        content,
        stickyTimestamp,
        sqlTimestamp
    }) {
        window.localStorage.setItem('task-why-edit-id', id)
        window.location.href = './edit/index.html'
    }
}

var operational = {
    todo_dom: null,
    plan_dom: null,

    init: function init() {
        this.todo_dom.onclick = function () {
            window.location.href = './../todo/list/index.html'
        }
        this.plan_dom.onclick = function () {
            window.location.href = './../plan/index.html'
        }
    }
}