window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
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