window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        components.init()
        this.initDom()

        edit.init()
        according.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        edit.dom = document.getElementById('edit-add')
        according.add_dom = document.getElementById('according-add')
        according.list_dom = document.getElementById('according-list')
    },
}

var components = {
    init: function init() {}
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