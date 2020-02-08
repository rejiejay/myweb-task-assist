window.onload = function () {
    init.go()
}

/**
 * 初始化方法
 */
var init = {
    go: function go() {
        this.initDom()

        components.init()
        edit.init()
        del.init()
        putoff.init()
        add.init()
        record.init()
        list.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        edit.dom = document.getElementById('edit-todo')
        del.dom = document.getElementById('edit-delete')
        putoff.dom = document.getElementById('edit-putoff')
        add.dom = document.getElementById('add-todo')
        record.dom = document.getElementById('add-edit-record')
        list.dom = document.getElementById('other-todo')
    }
}

var components = {
    toast: null,
    confirmPopUp: null,
    inputPopUp: null,

    init: function init() {
        this.toast = Toast.init()
        this.confirmPopUp = ConfirmPopUp.init()
        this.inputPopUp = InputPopUp.init()
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