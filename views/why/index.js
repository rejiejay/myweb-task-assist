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
    },
}

var components = {
    toast: null,
    serviceStorage: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
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
        var self = this

        components.fetch.get({
            url: 'task/statistics',
            query: {}
        }).then(
            res => self.renderStatisticsAll(res.data),
            error => {}
        )

        components.fetch.get({
            url: 'task/statistics',
            query: {
                targetId: process.target.id
            }
        }).then(
            res => self.renderStatisticsTarget(res.data),
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

    init: function init() {
        this.renderTitle()
    },

    renderTitle: function renderTitle() {
        this.title_dom.innerHTML = `为什么要“${process.target.name}”?`
    }
}