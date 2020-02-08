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
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        edit.dom = document.getElementById('edit-todo')
        del.dom = document.getElementById('edit-delete')
    }
}

var components = {
    toast: null,
    confirmPopUp: null,

    init: function init() {
        this.toast = Toast.init()
        this.confirmPopUp = ConfirmPopUp.init()
    }
}

var edit = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            components.toast.show()
            window.location.href = './edit/index.html'
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

    handle: function handle() {
    }
}