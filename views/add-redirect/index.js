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

        button.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        button.dom = {
            conclusion: document.getElementById('conclusion'),
            reason: document.getElementById('reason'),
            plan: document.getElementById('plan'),
            according: document.getElementById('according')
        }
    },
}

var components = {
    init: function init() {}
}

/**
 * 按钮
 */
var button = {
    dom: {
        conclusion: null,
        reason: null,
        plan: null,
        according: null
    },

    init: function init() {
        var self = this

        this.dom.conclusion.onclick = function () {
            window.location.href = './../conclusion/edit/index.html'
        }

        this.dom.reason.onclick = function () {
            window.location.href = './../why/edit/index.html'
        }

        this.dom.plan.onclick = function () {
            window.location.href = './../plan/edit/index.html'
        }

        this.dom.according.onclick = function () {
            window.location.href = './../plan/according-edit/index.html'
        }
    }
}