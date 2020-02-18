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
        id: 'gwy',
        name: '公务员'
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
    toast: null,
    fetch: null,
    loadPageVar: null,
    constHandle: null,
    jsonHandle: null,

    init: function init() {
        this.toast = Toast.init()
        this.fetch = Fetch.init()

        this.loadPageVar = LoadPageVar
        this.constHandle = ConstHandle
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
        document.body.insertBefore(node, list.dom);
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
        var self = this

        components.fetch.get({
            url: 'map/get',
            query: {
                key: 'target'
            },
            hiddenError: true
        }).then(
            res => {
                var jsonString = res.data.value
                var verify = components.jsonHandle.verifyJSONString({
                    jsonString,
                    isArray: true
                })

                if (verify.isCorrect) {
                    self.data = verify.data
                    self.render()
                } else {
                    components.toast.show('数据有误, 请编辑数据!');
                }
            },
            error => {
                components.toast.show('数据有误, 请编辑数据!');
            }
        )
    },

    render: function render() {
        var self = this
        var node_content = this.data.map(function (val) {
            return `
                <div class="list-item">
                    <div class="list-item-container">${val.name}</div>
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
            (function (index) {
                var element = children_dom[index];
                var targetItem = self.data[index];

                element.onclick = function () {
                    self.keepTarget(targetItem)
                }
            })(index)
        }
    },

    keepTarget: function keepTarget({
        id,
        name
    }) {
        components.fetch.post({
            url: 'map/set',
            body: {
                key: 'process',
                value: JSON.stringify({
                    id,
                    name
                })
            }
        }).then(
            res => redirect.navigate(id),
            error => {}
        )
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

    navigate: function navigate(targetId) {
        var url = components.constHandle.findValueByValue({
            CONST: CONST.REDIRECT,
            supportKey: 'value',
            supportValue: redirect.data,
            targetKey: 'url'
        })
        window.location.replace(`${url}?targetId=${targetId}`)
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
                    var targetId = verify.data.id
                    self.navigate(targetId)
                }
            },
            error => {}
        )
    }
}