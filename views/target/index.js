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
        REVIEW: {
            value: 'review',
            effect: 'What can be reviewed?',
            title: '有哪些可以复习?',
            url: './../conclusion/index.html'
        },
        ADD_TODO: {
            value: 'addTodo',
            effect: 'What new tasks are created?',
            title: '创建哪些新任务?',
            url: './../todo/edit/index.html'
        },
        ADD_OTHER: {
            value: 'addOther',
            effect: 'What inspiration is added?',
            title: '新增哪些灵感?',
            url: './../add-redirect/index.html'
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

        redirect.init()

        list.init()
        title.init()
        operat.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        list.dom = document.getElementById('target-list')
        operat.dom = document.getElementById('target-edit')
    }
}

var components = {
    loadPageVar: null,
    constHandle: null,
    fetch: null,
    jsonHandle: null,

    init: function init() {
        this.loadPageVar = LoadPageVar
        this.constHandle = ConstHandle
        this.fetch = Fetch.init()
        this.jsonHandle = JsonHandle
    }
}

var title = {
    init: function init() {
        var title = components.constHandle.findValueByValue({
            CONST: CONST.REDIRECT,
            supportKey: 'value',
            supportValue: redirect.data,
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
                redirect.navigate()
            }
        }
    }
}

var operat = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './json-config/index.html'
        }
    }
}

/**
 * 重定向
 */
var redirect = {
    data: CONST.REDIRECT.DEFAULTS.value,

    init: function init() {
        this.data = components.loadPageVar('redirect')

        this.initAutoNavigate()
    },

    navigate: function navigate() {
        var url = components.constHandle.findValueByValue({
            CONST: CONST.REDIRECT,
            supportKey: 'value',
            supportValue: redirect.data,
            targetKey: 'url'
        })
        window.location.replace(url)
    },

    initAutoNavigate: function initAutoNavigate() {
        var self = this

        components.fetch.get({
            url: 'map/get',
            query: {
                key: 'process'
            },
            hiddenError: true
        }).then(
            res => {
                var jsonString = res.data.value
                var verify = components.jsonHandle.verifyJSONString({
                    jsonString
                })

                if (verify.isCorrect) {
                    verify.data
                    self.navigate()
                }
            },
            error => {}
        )
    }
}