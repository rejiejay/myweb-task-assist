window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var slef = this

        this.initDom()

        components.init()

        target.init().then(() => {
            slef.stepTwo()
        }, error => {})

        putoff.init()
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

    init: function init() {
        var self = this

        this.toast = Toast.init()
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()

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
    data: {
        title: null,
        content: null,
        conclusion: null,
        measure: null,
        span: null,
        aspects: null,
        worth: null,
        estimate: null
    },
    init: function init() {
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
    }
}

var confirm = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            self.handle()
        }
    },

    handle: function handle() {
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

        if (!title) return components.toast.show('标题不能为空');
        if (!content) return components.toast.show('内容不能为空');

        components.fetch.post({
            url: 'task/add',
            body: {
                targetId: target.id,
                ...form.data
            }
        }).then(
            res => {
                self.executeTask(res.data)
                window.location.href = './../item/index.html'
            },
            error => {}
        )
    },

    executeTask: function executeTask(task) {
        components.serviceStorage.setItem({
            key: 'processTask',
            value: task
        }).then(
            res => {
                window.location.href = './../item/index.html'
            },
            error => {}
        )
    }
}