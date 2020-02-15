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

        according.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        according.dom = document.getElementById('according-add')
    },
}

var components = {
    init: function init() {}
}

var according = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './../according-edit/index.html'
        }
    }
}