window.onload = function () {
    init.go()
}

/**
 * 初始化方法
 */
var init = {
    go: function go() {
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
            howtodo: document.getElementById('howtodo'),
            needtodo: document.getElementById('needtodo'),
            plan: document.getElementById('plan'),
            review: document.getElementById('review'),
            addtodo: document.getElementById('addtodo'),
            addother: document.getElementById('addother')
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
        howtodo: null,
        needtodo: null,
        plan: null,
        review: null,
        addtodo: null,
        addother: null
    },

    init: function init() {
        var self = this

        this.dom.todo.onclick = function () {
            components.toast.show()
            self.todoHandle()
            components.toast.destroy()
        }

        this.dom.howtodo.onclick = function () {
            components.toast.show()
            self.howtodoHandle()
            components.toast.destroy()
        }

        this.dom.needtodo.onclick = function () {
            components.toast.show()
            self.needtodoHandle()
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

        this.dom.addtodo.onclick = function () {
            components.toast.show()
            self.addtodoHandle()
            components.toast.destroy()
        }

        this.dom.addother.onclick = function () {
            components.toast.show()
            self.addotherHandle()
            components.toast.destroy()
        }
    },

    /**
     * 我要做什么
     */
    todoHandle: function todoHandle() {
        window.location.href = './views/todo/index.html'
    },

    /**
     * 不想做
     */
    howtodoHandle: function howtodoHandle() {
        console.log('howtodo')
    },

    /**
     * 有哪些可以做
     */
    needtodoHandle: function needtodoHandle() {
        console.log('needtodo')
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
    addtodoHandle: function addtodoHandle() {
        console.log('addtodo')
    },

    /**
     * 新的灵感
     */
    addotherHandle: function addotherHandle() {
        console.log('addother')
    },
}