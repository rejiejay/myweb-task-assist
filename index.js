window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        this.initDom()

        components.init()

        // Login.init()

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
    }
}

/**
 * 组件
 */
var components = {
    toast: null,

    init: function init() {
        this.toast = Toast.init()
    }
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
        console.log('plan')
    },

    /**
     * 有哪些可以复习
     */
    reviewHandle: function reviewHandle() {
        console.log('review')
    },

    /**
     * 创建新任务
     */
    addTodoHandle: function addTodoHandle() {
        console.log('addTodo')
    },

    /**
     * 新的灵感
     */
    addOtherHandle: function addOtherHandle() {
        console.log('addOther')
    },
}