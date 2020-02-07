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
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        edit.dom = document.getElementById('edit-todo')
    }
}

var components = {
    toast: null,

    init: function init() {
        this.toast = Toast.init()
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