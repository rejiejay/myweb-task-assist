window.onload = function () {
    initialization.main()
}

var CONST = {
    PROCESS: {
        DEFAULTS: null,
        DEMO: {
            id: 'gwy',
            name: '公务员'
        }
    }
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var self = this
        this.initDom()

        components.init()

        Login.init().then(
            () => self.asyncMain(),
            () => self.asyncMain()
        )

    },

    asyncMain: function asyncMain() {
        process.init()
        button.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        button.dom = {
            todo: document.getElementById('todo'),
            howTodo: document.getElementById('how-todo'),
            needTodo: document.getElementById('need-todo'),
            plan: document.getElementById('plan'),
            review: document.getElementById('review'),
            addTodo: document.getElementById('add-todo'),
            addOther: document.getElementById('add-other')
        }

        process.container_dom = document.getElementById('process-task')
        process.description_dom = document.getElementById('process-description')
        process.unlock_dom = document.getElementById('process-unlock')
    }
}

/**
 * 组件
 */
var components = {
    toast: null,
    fetch: null,
    confirmPopUp: null,
    jsonHandle: null,

    init: function init() {
        this.toast = Toast.init()
        this.fetch = Fetch.init()
        this.confirmPopUp = ConfirmPopUp.init()
        this.jsonHandle = JsonHandle
    }
}

/**
 * 正在执行的任务
 */
var process = {
    value: CONST.PROCESS.DEFAULTS,
    container_dom: null,
    description_dom: null,
    unlock_dom: null,

    init: function init() {
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
                    self.value = verify.data
                    self.render()
                }
            },
            error => {}
        )
    },

    render: function render() {
        var self = this

        this.container_dom.style.display = 'block'
        this.description_dom.innerHTML = this.value.name

        process.unlock_dom.onclick = function () {
            var handle = function handle() {
                self.unlock()
            }

            var parameter = {
                title: '你确认要解除锁定吗?',
                succeedHandle: handle
            }
            components.confirmPopUp(parameter)
        }
    },

    unlock: function unlock() {
        var self = this
        
        components.fetch.get({
            url: 'map/clear',
            query: {
                key: 'process'
            },
        }).then(
            res => self.container_dom.style.display = 'none',
            error => {}
        )
    },
}

/**
 * 按钮
 */
var button = {
    dom: {
        todo: null,
        howTodo: null,
        needTodo: null,
        plan: null,
        review: null,
        addTodo: null,
        addOther: null
    },

    init: function init() {
        var self = this

        this.dom.todo.onclick = function () {
            components.toast.show()
            self.todoHandle()
            components.toast.destroy()
        }

        this.dom.howTodo.onclick = function () {
            components.toast.show()
            self.howTodoHandle()
            components.toast.destroy()
        }

        this.dom.needTodo.onclick = function () {
            components.toast.show()
            self.needTodoHandle()
            components.toast.destroy()
        }

        this.dom.plan.onclick = function () {
            components.toast.show()
            self.planHandle()
            components.toast.destroy()
        }

        this.dom.review.onclick = function () {
            components.toast.show()
            self.reviewHandle()
            components.toast.destroy()
        }

        this.dom.addTodo.onclick = function () {
            components.toast.show()
            self.addTodoHandle()
            components.toast.destroy()
        }

        this.dom.addOther.onclick = function () {
            components.toast.show()
            self.addOtherHandle()
            components.toast.destroy()
        }
    },

    /**
     * 我要做什么
     */
    todoHandle: function todoHandle() {
        window.location.href = './views/todo/item/index.html'
    },

    /**
     * 不想做
     */
    howTodoHandle: function howTodoHandle() {
        window.location.href = './views/target/index.html?redirect=how_todo'
    },

    /**
     * 有哪些可以做
     */
    needTodoHandle: function needTodoHandle() {
        window.location.href = './views/target/index.html?redirect=need_todo'
    },

    /**
     * 计划是什么;何时能完成
     */
    planHandle: function planHandle() {
        window.location.href = './views/target/index.html?redirect=plan'
    },

    /**
     * 有哪些可以复习
     */
    reviewHandle: function reviewHandle() {
        window.location.href = './views/target/index.html?redirect=review'
    },

    /**
     * 创建新任务
     */
    addTodoHandle: function addTodoHandle() {
        window.location.href = './views/target/index.html?redirect=addTodo'
    },

    /**
     * 新的灵感
     */
    addOtherHandle: function addOtherHandle() {
        window.location.href = './views/target/index.html?redirect=addOther'
    },
}