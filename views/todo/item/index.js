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
        complete.init()
        putoff.init()
        add.init()
        other.init()
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
        complete.dom = document.getElementById('edit-complete')
        putoff.dom = document.getElementById('edit-putoff')
        add.dom = document.getElementById('add-todo')
        other.dom = document.getElementById('todo-other')
        record.dom = document.getElementById('add-edit-record')
        list.dom = document.getElementById('other-todo')
        reason.dom = document.getElementById('reason-todo')

        todo.dom = {
            title: document.getElementById('todo-title'),
            specific: document.getElementById('todo-specific'),
            complete: document.getElementById('todo-complete'),
            putoff: document.getElementById('todo-putoff'),
            detailHandle: document.getElementById('details-handle'),
            details: document.getElementById('todo-details'),
            conclusionHandle: document.getElementById('conclusion-handle'),
            conclusions: document.getElementById('todo-conclusions'),
            measure: document.getElementById('todo-measure'),
            span: document.getElementById('todo-span'),
            aspects: document.getElementById('todo-aspects'),
            worth: document.getElementById('todo-worth'),
            estimate: document.getElementById('todo-time'),
        }
    }
}

var components = {
    fetch: null,
    toast: null,
    confirmPopUp: null,
    inputPopUp: null,
    serviceStorage: null,
    timeTransformers: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.toast = Toast.init()
        this.confirmPopUp = ConfirmPopUp.init()
        this.inputPopUp = InputPopUp.init()
        this.serviceStorage = ServiceStorage.init()
        this.timeTransformers = TimeTransformers
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
            window.location.href = './../../target/index.html?redirect=selectTodoTarget'
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
                    self.task = res
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
                value: todo.data
            }).then(
                res => {
                    self.task = JSON.parse(JSON.stringify(todo.data))
                    self.renderDoing()
                    components.toast.show('执行成功')
                },
                error => {}
            )
        }

        this.task_dom.onclick = function () {
            if (!todo.data.id || self.task.id !== todo.data.id) {
                var parameter = {
                    title: '确定执行此任务?',
                    succeedHandle: executeTask
                }
                components.confirmPopUp(parameter)
            }
        }
    },

    renderDoing: function renderDoing() {
        if (this.task.id && todo.data.id && this.task.id === todo.data.id) {
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
            var id = todo.data.id
            if (!id) return

            window.localStorage.setItem('task-todo-edit-id', id)
            if (caching.target.id) {
                window.location.href = './../edit/index.html'
            } else {
                window.location.href = './../../target/index.html?redirect=addTodo'
            }
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

    handle: function handle() {
        components.fetch.post({
            url: 'task/delete',
            body: {
                id: todo.data.id
            }
        }).then(
            res => {
                var query = {}
                if(caching.target.id) {
                    query.targetId = caching.target.id
                }
                todo.initData(query)
            },
            error => {}
        )
    }
}

var complete = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            var {
                completeTimestamp
            } = todo.data

            if (completeTimestamp) return components.toast.show('任务已被完成');

            var parameter = {
                title: `确认要完成此任务??`,
                succeedHandle: () => self.handle()
            }
            components.confirmPopUp(parameter)
        }
    },

    handle: function handle() {
        components.fetch.post({
            url: 'task/complete',
            body: {
                id: todo.data.id
            }
        }).then(
            res => {
                todo.data = res.data
                todo.render()
            },
            error => {}
        )
    }
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

    handle: function handle(data) {
        var body = JSON.parse(JSON.stringify(todo.data))
        body.putoffTimestamp = components.timeTransformers.YYYYmmDDhhMMToTimestamp(data)
        components.fetch.post({
            url: 'task/update',
            body
        }).then(
            res => {
                todo.data = res.data
                todo.render()
            },
            error => {}
        )
    }
}

var add = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.localStorage['task-todo-edit-id'] = ''
            if (caching.target.id) {
                window.location.href = './../edit/index.html'
            } else {
                window.location.href = './../../target/index.html?redirect=addTodo'
            }
        }
    }
}

var other = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            var cachingTarget = caching.target.id
            todo.initData(cachingTarget ? {
                targetId: cachingTarget
            } : {})
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
        components.inputPopUp.hiden()
        var body = JSON.parse(JSON.stringify(todo.data))
        body.conclusion += `\n${input}`
        components.fetch.post({
            url: 'task/update',
            body
        }).then(
            res => {
                todo.data = res.data
                todo.render()
            },
            error => {}
        )
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
    data: CONST.TASK.DEFAULTS,
    dom: {
        title: null,
        specific: null,
        putoff: null,
        complete: null,
    },
    isShowDetails: false,
    isShowConclusions: false,

    init: function init() {
        var query = {}
        if (caching.task.id) {
            query.taskId = caching.task.id
        } else if (caching.target.id) {
            query.targetId = caching.target.id
        }
        this.initData(query)

        this.initDetails()
        this.initConclusions()
    },

    initData: function initData(query) {
        var self = this

        components.fetch.get({
            url: 'task/get/one',
            query
        }).then(
            res => {
                self.data = res.data
                self.render()
                caching.renderDoing()
            },
            error => {}
        )
    },

    render: function render() {
        var {
            title,
            content,
            completeTimestamp,
            putoffTimestamp,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate,
        } = this.data

        this.dom.title.innerHTML = title
        this.dom.specific.innerHTML = content ? content : `结论: ${conclusion}`

        var nowTimestamp = new Date().getTime()
        if (completeTimestamp) {
            this.dom.complete.style = 'display: flex;'
            this.dom.putoff.style = 'display: none;'
            this.dom.complete.innerHTML = `完成时间: ${components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+completeTimestamp))}`
        } else if (putoffTimestamp && putoffTimestamp > nowTimestamp) {
            this.dom.putoff.style = 'display: flex;'
            this.dom.complete.style = 'display: none;'
            this.dom.putoff.innerHTML = `推迟: ${components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+putoffTimestamp))}`
        } else {
            this.dom.putoff.style = 'display: none;'
            this.dom.complete.style = 'display: none;'
        }

        this.dom.measure.innerHTML = measure ? `<span>衡量任务完成的标准?</span>- ${measure}` : '衡量任务完成的标准?'
        this.dom.span.innerHTML = span ? `<span>长时间跨度下这任务的意义?</span>- ${span}` : '长时间跨度下这任务的意义?'
        this.dom.aspects.innerHTML = aspects ? `<span>任务影响涉及到哪些方面?</span>- ${aspects}` : '任务影响涉及到哪些方面?'
        this.dom.worth.innerHTML = worth ? `<span>任务的本质是为了什么?</span>- ${worth}` : '任务的本质是为了什么?'
        this.dom.estimate.innerHTML = estimate ? `<span>是否必须完成?何时?</span>- ${estimate}` : '是否必须完成?何时?'
        this.showDetail(false)

        /**
         * 需要解决换行问题
         */
        this.dom.conclusions.innerHTML = conclusion ? conclusion.replace(/\n/g, "<br>") : ''
        this.showConclusions(false)
    },

    showDetail: function showDetail(isShow) {
        if (isShow) {
            this.isShowDetails = true
            this.dom.details.style = 'display: block;'
        } else {
            this.isShowDetails = false
            this.dom.details.style = 'display: none;'
        }
    },

    initDetails: function initDetails() {
        var self = this

        this.dom.detailHandle.onclick = function () {
            self.showDetail(!self.isShowDetails)
        }
    },

    showConclusions: function showConclusions(isShow) {
        if (this.data.conclusion && isShow) {
            this.isShowConclusions = true
            this.dom.conclusions.style = 'display: block;'
        } else {
            this.isShowConclusions = false
            this.dom.conclusions.style = 'display: none;'
        }
    },

    initConclusions: function initConclusions() {
        var self = this

        this.dom.conclusionHandle.onclick = function () {
            self.showConclusions(!self.isShowConclusions)
        }
    }
}