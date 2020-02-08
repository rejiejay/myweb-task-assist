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

    /**
     * 列表数据结构
     */
    LIST: [{
        title: '大目标一'
    }, {
        title: '大目标二'
    }]
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

        list.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        list.dom = document.getElementById('target-list')
    },

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

var list = {
    dom: null,
    data: CONST.LIST,

    init: function init() {
        this.getTargetList()
    },

    /**
     * 获取数据
     */
    getTargetList: function getTargetList() {
        this.render()
    },

    render: function render() {
        var self = this
        var node_content = this.data.map(function (val) {
            return `
                <div class="list-item">
                    <div class="list-item-container">${val.title}</div>
                </div>
            `
        }).join('')

        self.dom.innerHTML = node_content;
    }
}