window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    clientWidth: 375,
    clientHeight: 667,

    main: function main() {
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        components.init()
        this.initDom()

        textarea.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        textarea.dom = document.getElementById('reason-input')
    },
}

var components = {
    init: function init() {}
}

var textarea = {
    dom: null,

    init: function init() {
        textarea.dom.style.height = `${initialization.clientHeight - 46}px`
    }
}