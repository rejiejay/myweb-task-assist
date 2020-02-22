window.onload = function () {
    initialization.main()
}

var CONST = {
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit',
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
            completeTimestamp: null
        }
    }
}

/**
 * 初始化方法
 */
var initialization = {
    status: CONST.PAGE_STATUS.DEFAULTS,

    main: function main() {
        var slef = this

        this.initDom()
        this.initPageStatus()

        components.init()

        target.init().then(() => {
            slef.stepTwo()
        }, error => {})

        putoff.init()
        complete.init()
    },

    initPageStatus: function initPageStatus() {
        var id = window.localStorage['task-todo-edit-id']

        if (id) {
            window.localStorage['task-todo-edit-id'] = ''
            form.data.id = id
            this.status = CONST.PAGE_STATUS.EDIT
        } else {
            this.status = CONST.PAGE_STATUS.ADD
        }
    },

    stepTwo: function stepTwo() {
        form.init()
        confirm.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        putoff.clear_dom = document.getElementById('picka-clear')
        putoff.picker_dom = document.getElementById('picka-date')
        complete.dom = document.getElementById('edit-complete')
        confirm.dom = document.getElementById('edit-confirm')

        form.dom.title = document.getElementById('edit-title')
        form.dom.content = document.getElementById('edit-content')
        form.dom.conclusion = document.getElementById('edit-conclusion')
        form.dom.measure = document.getElementById('edit-measure')
        form.dom.span = document.getElementById('edit-span')
        form.dom.aspects = document.getElementById('edit-aspects')
        form.dom.worth = document.getElementById('edit-worth')
        form.dom.estimate = document.getElementById('edit-estimate')
    }
}

var components = {
    toast: null,
    datepicker: null,
    fetch: null,
    serviceStorage: null,
    timeTransformers: null,

    init: function init() {
        var self = this

        this.toast = Toast.init()
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
        this.timeTransformers = TimeTransformers

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
                    self.toast.show('不能小于当前的日期')
                    return false;
                }

                putoff.handle(date)
            }
        })
    }
}

var putoff = {
    clear_dom: null,
    picker_dom: null,
    value: null,

    init: function init() {
        var self = this

        this.clear_dom.onclick = function () {
            self.value = null
            self.picker_dom.value = ''
        }
    },

    initDate: function initDate(timestamp) {
        this.picker_dom.value = components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+timestamp))
    },

    handle: function handle(date) {
        this.value = date
    }
}

var target = {
    id: null,

    init: function init() {
        var self = this
        return new Promise(function (resolve, reject) {
            components.serviceStorage.getItem({
                key: 'processTarget'
            }).then(
                res => {
                    self.id = res.id
                    resolve()
                },
                error => reject()
            )
        })
    }
}

var form = {
    dom: {
        title: null,
        content: null,
        conclusion: null,
        measure: null,
        span: null,
        aspects: null,
        worth: null,
        estimate: null
    },
    data: CONST.TASK.DEFAULTS,
    init: function init() {
        this.initDate()
        this.initHandle()
    },
    initHandle: function initHandle() {
        var self = this
        this.dom.title.oninput = function () {
            self.data.title = this.value
        }
        this.dom.content.oninput = function () {
            self.data.content = this.value
        }
        this.dom.conclusion.oninput = function () {
            self.data.conclusion = this.value
        }
        this.dom.measure.oninput = function () {
            self.data.measure = this.value
        }
        this.dom.span.oninput = function () {
            self.data.span = this.value
        }
        this.dom.aspects.oninput = function () {
            self.data.aspects = this.value
        }
        this.dom.worth.oninput = function () {
            self.data.worth = this.value
        }
        this.dom.estimate.oninput = function () {
            self.data.estimate = this.value
        }
    },

    initDate: function initDate() {
        var self = this

        if (initialization.status !== CONST.PAGE_STATUS.EDIT) return

        components.fetch.get({
            url: 'task/get/one',
            query: {
                taskId: this.data.id
            }
        }).then(
            res => {
                self.data = res.data
                self.renderDom()
            },
            error => {}
        )
    },

    renderDom: function renderDom() {
        var {
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate,
            putoffTimestamp,
            conclusion
        } = this.data

        this.dom.title.value = title
        this.dom.content.value = content
        this.dom.conclusion.value = conclusion
        this.dom.measure.value = measure
        this.dom.span.value = span
        this.dom.aspects.value = aspects
        this.dom.worth.value = worth
        this.dom.estimate.value = estimate
        if (putoffTimestamp) {
            putoff.initDate(putoffTimestamp)
            putoff.handle(components.timeTransformers.dateToYYYYmmDDhhMM(new Date(+putoffTimestamp)))
        }
    }
}

var confirm = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            self.verify()
        }
    },

    verify: function verify() {
        var {
            title,
            content
        } = form.data

        if (!title) return components.toast.show('标题不能为空');
        if (!content) return components.toast.show('内容不能为空');

        if (initialization.status === CONST.PAGE_STATUS.EDIT) {
            this.editHandle()
        } else {
            this.addHandle()
        }
    },

    editHandle: function editHandle() {
        var self = this
        var {
            id,
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = form.data
        var putoffTimestamp = putoff.value ? components.timeTransformers.YYYYmmDDhhMMToTimestamp(putoff.value) : null

        components.fetch.post({
            url: 'task/update',
            body: {
                id,
                title,
                content,
                conclusion,
                measure,
                span,
                aspects,
                worth,
                estimate,
                putoffTimestamp
            }
        }).then(
            res => self.executeTask(res.data),
            error => {}
        )
    },

    addHandle: function addHandle() {
        var self = this
        var {
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = form.data
        var putoffTimestamp = putoff.value ? components.timeTransformers.YYYYmmDDhhMMToTimestamp(putoff.value) : null

        components.fetch.post({
            url: 'task/add',
            body: {
                targetId: target.id,
                title,
                content,
                conclusion,
                measure,
                span,
                aspects,
                worth,
                estimate,
                putoffTimestamp
            }
        }).then(
            res => self.executeTask(res.data),
            error => {}
        )
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
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            if (initialization.status !== CONST.PAGE_STATUS.EDIT) return components.toast.show('无法完成新增任务');

            var {
                completeTimestamp
            } = form.data
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
                id: form.data.id
            }
        }).then(
            res => {
                form.data = res.data
                confirm.executeTask(res.data)
            },
            error => {}
        )
    }
}