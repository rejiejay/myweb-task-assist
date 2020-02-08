window.onload = function () {
    init.main()
}

/**
 * 初始化方法
 */
var init = {
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