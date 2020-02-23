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
    TASK: {
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
    }
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var self = this

        this.initDom()

        components.init()

        process.init().then(() => {
            self.stepTwo()
        })

        putoff.init()
        complete.init()
        add.init()
    },

    stepTwo: function stepTwo() {
        executable.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        executable.dom = document.getElementById('executable-task')

        process.description_dom = document.getElementById('process-description')
        process.unlock_dom = document.getElementById('process-unlock')

        putoff.handle_dom = document.getElementById('show-putoff')
        putoff.render_dom = document.getElementById('putoff-task')

        complete.handle_show_dom = document.getElementById('show-complete')
        complete.handle_show_more_dom = document.getElementById('show-more')
        complete.container_show_more_dom = document.getElementById('show-more-container')
        complete.render_dom = document.getElementById('complete-task')

        add.dom = document.getElementById('add-todo')
    }
}

var components = {
    toast: null,
    fetch: null,
    serviceStorage: null,
    confirmPopUp: null,
    timeTransformers: null,

    init: function init() {
        this.toast = Toast.init()
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
        this.confirmPopUp = ConfirmPopUp.init()
        this.timeTransformers = TimeTransformers
    }
}

var process = {
    target: CONST.TARGET.DEFAULTS,
    description_dom: null,
    unlock_dom: null,

    init: function init() {
        var self = this

        this.initUnlockHandle()

        return new Promise((resolve) => {
            self.initProcessTarget(resolve)
        })
    },

    initUnlockHandle: function initUnlockHandle() {
        var self = this
        this.unlock_dom.onclick = function () {
            if (!self.target.id) return

            var handle = function handle() {
                self.unlock()
            }

            var parameter = {
                title: '你确认要解除锁定吗?',
                succeedHandle: handle
            }
            components.confirmPopUp(parameter)
        }
    },

    initProcessTarget: function initProcessTarget(resolve) {
        var self = this

        components.serviceStorage.getItem({
            key: 'processTarget',
            hiddenError: true
        }).then(
            res => {
                self.target = res
                self.render()
                resolve()
            },
            error => resolve()
        )
    },

    unlock: function unlock() {
        var self = this

        components.serviceStorage.clearItem({
            key: 'processTarget'
        }).then(
            res => {
                self.target = CONST.TARGET.DEFAULTS
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        this.description_dom.innerHTML = `范围: ${this.target.name}`
    },
}

var executable = {
    list: [ /** CONST.TASK.DEMO */ ],
    dom: null,

    init: function init() {
        var self = this

        var targetId = process.target.id
        var query = targetId ? {
            targetId
        } : {}

        components.fetch.get({
            url: 'task/get/list/executable',
            query
        }).then(
            res => {
                self.list = res.data
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        var self = this

        if (this.list.length === 0) return this.dom.innerHTML = '已经完成所有任务'

        this.dom.innerHTML = this.list.map(({
            id,
            targetId,
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate,
            image,
            putoffTimestamp,
            completeTimestamp,
            sqlTimestamp
        }) => `
            <div class="list-item">
                <div class="list-item-container">
                    <div class="list-item-title">${title}</div>
                </div>
            </div>
        `).join('')

        var children_dom = this.dom.children
        for (var index = 0; index < children_dom.length; index++) {
            (function (index) {
                var element = children_dom[index];
                var targetItem = self.list[index];

                element.onclick = function () {
                    self.executeTask(targetItem)
                }
            })(index)
        }
    },

    executeTask: function executeTask(task) {
        components.serviceStorage.setItem({
            key: 'processTask',
            value: task
        }).then(
            res => window.location.href = './../item/index.html',
            error => {}
        )
    }
}

var putoff = {
    list: [ /** CONST.TASK.DEMO */ ],
    handle_dom: null,
    render_dom: null,

    init: function init() {
        var self = this

        this.handle_dom.onclick = function () {
            self.getPutoffTask()
        }
    },

    getPutoffTask: function getPutoffTask() {
        var self = this
        var targetId = process.target.id
        var query = targetId ? {
            targetId
        } : {}

        components.fetch.get({
            url: 'task/get/list/putoff',
            query
        }).then(({
                data
            }) => {
                if (data.length > 0) {
                    self.list = data
                    self.render()
                } else {
                    components.toast.show('没有更多的任务了')
                }
            },
            error => {}
        )
    },

    render: function render() {
        var self = this

        if (this.list.length === 0) return this.render_dom.innerHTML = '已经完成所有任务'

        this.handle_dom.style = 'display: none;'
        this.render_dom.style = 'display: block;'
        this.render_dom.innerHTML = this.list.map(({
            id,
            targetId,
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate,
            image,
            putoffTimestamp,
            completeTimestamp,
            sqlTimestamp
        }) => `
            <div class="list-item">
                <div class="list-item-container">
                    <div class="list-item-title">${title}</div>
                    <div class="list-item-time">推迟: ${components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+putoffTimestamp))}</div>
                </div>
            </div>
        `).join('')

        var children_dom = this.render_dom.children
        for (var index = 0; index < children_dom.length; index++) {
            (function (index) {
                var element = children_dom[index];
                var targetItem = self.list[index];

                element.onclick = function () {
                    self.executeTask(targetItem)
                }
            })(index)
        }
    },

    executeTask: function executeTask(task) {
        components.serviceStorage.setItem({
            key: 'processTask',
            value: task
        }).then(
            res => window.location.href = './../item/index.html',
            error => {}
        )
    }
}

var complete = {
    list: [ /** CONST.TASK.DEMO */ ],
    pageNo: 1,
    count: 0,
    handle_show_dom: null,
    handle_show_more_dom: null,
    container_show_more_dom: null,
    render_dom: null,

    init: function init() {
        var self = this

        this.handle_show_dom.onclick = function () {
            self.getCompleteTask()
        }

        this.handle_show_more_dom.onclick = function () {
            if ((self.pageNo * 10) > self.count) return components.toast.show('已经加载所有完成任务')

            self.pageNo++
            self.getCompleteTask()
        }
    },

    getCompleteTask: function getCompleteTask() {
        var self = this
        var pageNo = this.pageNo
        var query = {
            pageNo
        }
        var targetId = process.target.id
        targetId ? query.targetId = targetId : null

        components.fetch.get({
            url: 'task/get/list/complete',
            query
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
        var self = this

        this.handle_show_dom.style = 'display: none;'
        this.render_dom.style = 'display: block;'
        this.handle_show_more_dom.style = 'display: block;'
        this.container_show_more_dom.style = 'display: block;'

        var {count, pageNo} = this
        var diff = count - (10 * pageNo)
        this.handle_show_more_dom.innerHTML = `显示更多(剩余: ${diff > 0 ? diff : 0})`

        if (this.list.length === 0) return this.render_dom.innerHTML = '已经完成所有任务'

        this.render_dom.innerHTML = this.list.map(({
            id,
            targetId,
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate,
            image,
            putoffTimestamp,
            completeTimestamp,
            sqlTimestamp
        }) => `
            <div class="list-item">
                <div class="list-item-container">
                    <div class="list-item-title">${title}</div>
                    <div class="list-item-time">完成: ${components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+completeTimestamp))}</div>
                </div>
            </div>
        `).join('')

        var children_dom = this.render_dom.children
        for (var index = 0; index < children_dom.length; index++) {
            (function (index) {
                var element = children_dom[index];
                var targetItem = self.list[index];

                element.onclick = function () {
                    self.executeTask(targetItem)
                }
            })(index)
        }
    },

    executeTask: function executeTask(task) {
        components.serviceStorage.setItem({
            key: 'processTask',
            value: task
        }).then(
            res => window.location.href = './../item/index.html',
            error => {}
        )
    }
}

var add = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.localStorage['task-todo-edit-id'] = ''
            if (process.target.id) {
                window.location.href = './../edit/index.html'
            } else {
                window.location.href = './../../target/index.html?redirect=addTodo'
            }
        }
    }
}