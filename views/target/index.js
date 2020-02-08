window.onload = function () {
    init.main()
}

var CONST = {
    /**
     * 重定向页面
     */
    REDIRECT: {
        DEFAULTS: {
            value: null,
            effect: 'defaults value'
        },
        NEED_TODO: {
            value: 'need_todo',
            effect: 'goto todo list'
        }
    },
}

/**
 * 初始化方法
 */
var init = {
    redirect: CONST.REDIRECT.DEFAULTS.value,

    main: function main() {
        components.init()
        this.initDom()
        this.initRedirect()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {},

    /**
     * 节点 初始化
     */
    initRedirect: function initRedirect() {
        this.redirect = components.loadPageVar('redirect')
    }
}

var components = {
    loadPageVar: null,

    init: function init() {
        this.loadPageVar = LoadPageVar
    }
}