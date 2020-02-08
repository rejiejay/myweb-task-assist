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
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {}
}

var components = {
    init: function init() {}
}