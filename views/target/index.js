window.onload = function () {
    initialization.main()
}

var CONST = {
    /**
     * 重定向页面
     */
    REDIRECT: {
        DEFAULTS: {
            value: null,
            effect: 'defaults value',
            title: '',
            url: null
        },
        NEED_TODO: {
            value: 'need_todo',
            effect: 'goto todo list',
            title: '有哪些可以做?',
            url: './../todo/list/index.html'
        },
        HOW_TODO: {
            value: 'how_todo',
            effect: 'How to make myself want to work?',
            title: '不想做下面这些事情怎么办?',
            url: './../why/index.html'
        },
        PLAN: {
            value: 'plan',
            effect: 'What is the plan and when will it be completed?',
            title: '计划是什么?何时能完成?',
            url: './../plan/index.html'
        },
        PLAN: {
            value: 'review',
            effect: 'What can be reviewed?',
            title: '有哪些可以复习?',
            url: './../conclusion/index.html'
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
var initialization = {
    redirect: CONST.REDIRECT.DEFAULTS.value,

    main: function main() {
        components.init()
        this.initDom()
        this.initRedirect()

        list.init()
        title.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        list.dom = document.getElementById('target-list')
    },

    /**
     * 重定向 初始化
     */
    initRedirect: function initRedirect() {
        this.redirect = components.loadPageVar('redirect')
    }
}

var components = {
    loadPageVar: null,
    constHandle: null,

    init: function init() {
        this.loadPageVar = LoadPageVar
        this.constHandle = ConstHandle
    }
}

var title = {
    init: function init() {
        var title = components.constHandle.findValueByValue({
            CONST: CONST.REDIRECT,
            supportKey: 'value',
            supportValue: initialization.redirect,
            targetKey: 'title'
        })

        if (!title) {
            return false
        }
        
        var node = document.createElement("div");
        node.setAttribute('id', 'target-title');
        node.innerHTML = title;
        document.body.insertBefore(node, list.dom)
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
        self.bindEvent()
    },

    bindEvent: function bindEvent() {
        var self = this
        var children_dom = this.dom.children

        for (var index = 0; index < children_dom.length; index++) {
            var element = children_dom[index];

            element.onclick = function () {
                var url = components.constHandle.findValueByValue({
                    CONST: CONST.REDIRECT,
                    supportKey: 'value',
                    supportValue: initialization.redirect,
                    targetKey: 'url'
                })
                window.location.href = url
            }
        }
    }
}