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

    PROGRAM: {
        DEMO: {
            id: 1,
            targetId: "not-null",
            according: null,
            program: null,
            sqlTimestamp: 'not-null'
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

        edit.init()
        according.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        program.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        edit.dom = document.getElementById('edit-add')
        according.add_dom = document.getElementById('according-add')
        according.list_dom = document.getElementById('according-list')
        program.latest_dom = document.getElementById('plan-latest')
        program.list_dom = document.getElementById('plan-list')
        program.handle_show_more_dom = document.getElementById('add-more')
    },
}

var components = {
    fetch: null,
    serviceStorage: null,
    timeTransformers: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
        this.timeTransformers = TimeTransformers
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

var edit = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './edit/index.html'
        }
    }
}

var according = {
    add_dom: null,
    list_dom: null,

    init: function init() {
        this.add_dom.onclick = function () {
            window.location.href = './according-edit/index.html'
        }
        this.list_dom.onclick = function () {
            window.location.href = './according-list/index.html'
        }
    }
}

var program = {
    latest_dom: null,
    list_dom: null,
    handle_show_more_dom: null,

    list: [
        /** CONST.PROGRAM.DEMO */
    ],
    count: 0,
    pageNo: 1,

    init: function init() {
        this.initData()
        this.initShowMore()
    },

    initShowMore: function initShowMore() {
        var self = this
        this.handle_show_more_dom.onclick = function () {
            var {
                pageNo,
                count
            } = self

            var diff = count - (10 * pageNo)
            if (diff > 0) {
                self.pageNo++
                self.initData()
            }
        }
    },

    initData: function initData() {
        var self = this

        components.fetch.get({
            url: 'plan/get/program/list',
            query: {
                pageNo: this.pageNo,
                targetId: process.target.id
            }
        }).then(({
                data: {
                    list,
                    count
                }
            }) => {
                if (list.length === 0) return

                /**
                 * 含义: 判断是否新增
                 */
                if (self.list.length > 0 && self.pageNo > 1 && self.count > 1) {
                    self.list = self.list.concat(list)
                } else {
                    self.list = list
                }
                self.count = count
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        var {
            list,
            latest_dom,
            list_dom,
            pageNo,
            count
        } = this

        var diff = count - (10 * pageNo)
        this.handle_show_more_dom.innerHTML = `显示更多(剩余: ${diff > 0 ? diff : 0})`
        var latest = JSON.parse(JSON.stringify(list[0]))
        
        var otherList = list.filter((program, index) => index === 0);

        latest_dom.innerHTML = `
            <div class="content-container">
                <div class="content-title">方案${count}</div>
                <div class="content-description">${latest.program}</div>
            </div>
        `

        var renderItem = function renderItem(number, time) {
            return `<div class="plan-other flex-start-center">方案${number}（${time}）</div>`
        }

        list_dom.innerHTML = `<div class="list-container">
            ${otherList.map(({
                id,
                targetId,
                according,
                program,
                sqlTimestamp
            }, key) => renderItem(count - (key + 1), components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+sqlTimestamp))))}
        </div>`

        this.bindEvent({
            latest,
            otherList
        })
    },

    bindEvent: function bindEvent({
        latest,
        otherList
    }) {
        this.latest_dom.onclick = function () {
            /**
             * 注意: 可以编辑, 不可删除
             */
            window.localStorage.setItem('task-plan-program-edit-id', latest.id)
            window.location.href = './edit/index.html'
        }

        var children_dom = this.list_dom.children
        for (var index = 0; index < children_dom.length; index++) {
            (function (index) {
                var element = children_dom[index];
                var targetItem = otherList[index];

                element.onclick = function () {
                    /**
                     * 注意: 不可编辑, 仅能查看, 不可删除
                     */
                    window.localStorage.setItem('task-plan-program-show-id', targetItem.id)
                    window.location.href = './edit/index.html'
                }
            })(index)
        }
    },
}