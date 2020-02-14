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

        todo.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        todo.dom = document.getElementById('todo')
    },
}

var components = {
    init: function init() {}
}

/**
 * 我要做什么
 * Mark: 后续会有改动, 需要添加跳转条件
 */
var todo = {
    dom: null,
    
    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './../../todo/item/index.html'
        }
    }
}