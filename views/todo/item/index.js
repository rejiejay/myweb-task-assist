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
            id: null // 作用: 判空
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
            completeTimestamp: null
        }
    }
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var slef = this

        this.initDom()
        components.init()

        /**
         * 为什么先加载缓存?
         * - 数据的加载方式依赖缓存内容
         */
        caching.init().then(() => {
            slef.stepTwo()
        })

        /**
         * 为什么不先加载缓存再执行下面方法?
         * - 因为以下方法不依赖数据的内容
         */
        edit.init()
        del.init()
        putoff.init()
        add.init()
        record.init()
        list.init()
        reason.init()
    },

    stepTwo: function stepTwo() {
        todo.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        caching.target_dom = document.getElementById('caching-target')
        caching.task_dom = document.getElementById('caching-task')
        edit.dom = document.getElementById('edit-todo')
        del.dom = document.getElementById('edit-delete')
        putoff.dom = document.getElementById('edit-putoff')
        add.dom = document.getElementById('add-todo')
        record.dom = document.getElementById('add-edit-record')
        list.dom = document.getElementById('other-todo')
        reason.dom = document.getElementById('reason-todo')
    }
}

var components = {
    fetch: null,
    toast: null,
    confirmPopUp: null,
    inputPopUp: null,
    serviceStorage: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.toast = Toast.init()
        this.confirmPopUp = ConfirmPopUp.init()
        this.inputPopUp = InputPopUp.init()
        this.serviceStorage = ServiceStorage.init()
    }
}

/**
 * 缓存
 */
var caching = {
    target: CONST.TARGET.DEFAULTS,
    target_dom: null,
    task: CONST.TASK.DEFAULTS,
    task_dom: null,

    init: function init() {
        this.initTarget()
        this.initDoing()

        return Promise.all([this.getTarget(), this.getDoing()])
    },

    getTarget: function getTarget() {
        var self = this
        return new Promise(function (resolve, reject) {
            components.serviceStorage.getItem({
                key: 'processTarget',
                hiddenError: true
            }).then(
                function (res) {
                    self.renderTarget(res, resolve)
                },
                error => resolve()
            )
        })
    },

    initTarget: function initTarget() {
        var self = this

        var delTargetHandle = function delTargetHandle() {
            components.serviceStorage.clearItem({
                key: 'processTarget'
            }).then(
                function res() {
                    self.renderTarget(CONST.TARGET.DEFAULTS)
                },
                error => {}
            )
        }

        var selectTargetHandle = function selectTargetHandle() {
            window.location.href = './../../target/index.html?redirect=select_todo_target'
        }

        this.target_dom.onclick = function () {
            if (self.target.id) {
                var parameter = {
                    title: `确认要解除锁定“${self.target.name}”?`,
                    succeedHandle: delTargetHandle
                }
                components.confirmPopUp(parameter)
            } else {
                var parameter = {
                    title: '你要选择目标范围?',
                    succeedHandle: selectTargetHandle
                }
                components.confirmPopUp(parameter)
            }
        }
    },

    renderTarget: function renderTarget({
        id,
        name
    }, resolve) {
        this.target = {
            id,
            name
        }

        this.target_dom.innerHTML = `范围: ${name}`

        resolve ? resolve() : null
    },

    getDoing: function getDoing() {
        var self = this
        return new Promise(function (resolve, reject) {
            components.serviceStorage.getItem({
                key: 'processTask',
                hiddenError: true
            }).then(
                function (res) {
                    self.task = res.data
                    resolve()
                },
                error => resolve()
            )
        })
    },

    initDoing: function initDoing() {
        var self = this

        var executeTask = function executeTask() {
            components.serviceStorage.setItem({
                key: 'processTask',
                value: todo.date
            }).then(
                res => {
                    self.task = JSON.parse(JSON.stringify(todo.date))
                    self.renderDoing()
                    components.toast.show('执行成功')
                },
                error => {}
            )
        }

        this.task_dom.onclick = function () {
            if (!todo.date.id || self.task.id !== todo.date.id) {
                var parameter = {
                    title: '确定执行此任务?',
                    succeedHandle: executeTask
                }
                components.confirmPopUp(parameter)
            }
        }
    },

    renderDoing: function renderDoing() {
        if (this.task.id && todo.date.id && this.task.id === todo.date.id) {
            this.task_dom.innerHTML = '正在执行中'
        } else {
            this.task_dom.innerHTML = '执行此任务?'
        }
    }
}

var edit = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            components.toast.show()
            window.location.href = './../edit/index.html'
            components.toast.destroy()
        }
    }
}

var del = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            var parameter = {
                title: '你确认要删除吗?',
                succeedHandle: self.handle
            }
            components.confirmPopUp(parameter)
        }
    },

    handle: function handle() {}
}

var putoff = {
    dom: null,
    datepicker: null,

    init: function init() {
        var self = this
        var nowYear = new Date().getFullYear()

        this.datepicker = new Rolldate({
            el: '#picka-date',
            format: 'YYYY-MM-DD hh:mm',
            beginYear: nowYear,
            endYear: nowYear + 10,
            lang: {
                title: '推迟到什么时候?'
            },
            confirm: function confirm(date) {
                var nowTime = new Date().getTime()
                var pickerTime = new Date(date.replace(/\-/g, "\/")).getTime()

                if (nowTime > pickerTime) {
                    components.toast.show('不能小于当前的日期')
                    return false;
                }

                self.handle(date)
            }
        })
        this.dom.onclick = function () {
            self.datepicker.show()
        }
    },

    handle: function handle(date) {
        console.log(date)
    }
}

var add = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            components.toast.show()
            window.location.href = './../edit/index.html'
            components.toast.destroy()
        }
    }
}

var record = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            var parameter = {
                title: '得出什么结论?记录什么?',
                handle: self.handle
            }

            components.inputPopUp.show(parameter)
        }
    },

    handle: function handle(input) {
        console.log(input)
        components.inputPopUp.hiden()
    }
}

var list = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            components.toast.show()
            window.location.href = './../list/index.html'
            components.toast.destroy()
        }
    }
}

var reason = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            components.toast.show()
            window.location.href = './../../why/index.html'
            components.toast.destroy()
        }
    }

}

var todo = {
    date: CONST.TASK.DEFAULTS,

    init: function init() {
        var self = this

        var query = {}
        if (caching.task.id) {
            query.taskId = caching.task.id
        } else if (caching.target.id) {
            query.targetId = caching.target.id
        }
        components.fetch.get({
            url: 'task/get/one',
            query
        }).then(
            res => {
                self.date = res.data
                self.render()
                caching.renderDoing()
            },
            error => {}
        )
    },

    render: function render() {

    }
}