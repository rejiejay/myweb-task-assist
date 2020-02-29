const CONST = {
    /**
     * 重定向页面
     */
    REDIRECT: {
        DEFAULTS: {
            value: null,
            effect: 'defaults value',
            title: '有哪些可以做?',
            url: null
        },
        NEED_TODO: {
            value: 'needTodo',
            effect: 'goto todo list',
            title: '有哪些可以做?',
            url: './../todo/list/index.html'
        },
        HOW_TODO: {
            value: 'howTodo',
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
        },
        SELECT_TODO_TARGET: {
            value: 'selectTodoTarget',
            effect: 'goto todo item',
            title: '选择目标范围?',
            url: './../todo/item/index.html'
        }
    },

    /**
     * 列表数据结构
     */
    LIST: [
        // {
        //     id: 'gwy',
        //     name: '公务员'
        // }
    ]
}

export default CONST