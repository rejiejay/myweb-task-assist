window.onload = function () {
    init.go()
}

/**
 * 初始化方法
 */
var init = {
    go: function go() {
        this.initDom()

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
        var toast = Toast.init()

        this.dom.todo.onclick = function () {
            toast.show()
            self.todoHandle()
        }

        this.dom.howtodo.onclick = function () {
            toast.show()
            self.howtodoHandle()
        }

        this.dom.needtodo.onclick = function () {
            toast.show()
            self.needtodoHandle()
        }

        this.dom.plan.onclick = function () {
            toast.show()
            self.planHandle()
        }

        this.dom.review.onclick = function () {
            toast.show()
            self.reviewHandle()
        }

        this.dom.addtodo.onclick = function () {
            toast.show()
            self.addtodoHandle()
        }

        this.dom.addother.onclick = function () {
            toast.show()
            self.addotherHandle()
        }
    },

    /**
     * 我要做什么
     */
    todoHandle: function todoHandle() {
        console.log('todo')
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