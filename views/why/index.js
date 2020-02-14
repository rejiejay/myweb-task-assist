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

        spiritual.init()
        edit.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        spiritual.dom = document.getElementById('spiritual')
        edit.dom = document.getElementById('add-edit')
    },
}

var components = {
    init: function init() {}
}

var spiritual = {
    dom: null,
    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './spiritual/index.html'
        }
    }
}

var edit = {
    dom: null,
    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './edit/index.html'
        }
    }
}