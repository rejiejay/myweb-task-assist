window.onload = function () {
    initialization.main()
}

var CONST = {
    TARGET: {
        DEFAULTS: {
            id: '',
            name: '所有'
        },
        DEMO: {
            id: 'gwy',
            name: '公务员'
        }
    },
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit',
        SHOW: 'show',
    },
    PLAN: {
        DEFAULTS: {
            id: 0,
            program: null,
        },
        DEMO: {
            id: 0,
            targetId: 'not-null',
            program: null,
            according: null,
            sqlTimestamp: 'not-null',
        }
    }
}

/**
 * 初始化方法
 */
var initialization = {
    status: CONST.PAGE_STATUS.DEFAULTS,
    clientWidth: 375,
    clientHeight: 667,

    main: function main() {
        var self = this

        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        components.init()
        this.initDom()

        this.initPageStatus()
        confirm.init()
        draft.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        textarea.init()
    },

    initPageStatus: function initPageStatus() {
        var editId = window.localStorage['task-plan-program-edit-id']
        var showId = window.localStorage['task-plan-program-show-id']

        if (editId) {
            textarea.data.id = editId
            this.status = CONST.PAGE_STATUS.EDIT
            confirm.dom.innerHTML = '编辑'
        }

        if (showId) {
            textarea.data.id = showId
            textarea.dom.setAttribute('disabled', 'disabled')
            this.status = CONST.PAGE_STATUS.SHOW
            confirm.dom.innerHTML = '<span style="text-decoration: line-through;">编辑</span>'
        }

        if (!editId && !showId) {
            this.status = CONST.PAGE_STATUS.ADD
            confirm.dom.innerHTML = '新增'
        }

        window.localStorage['task-plan-program-edit-id'] = ''
        window.localStorage['task-plan-program-show-id'] = ''
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        textarea.dom = document.getElementById('plan-input')

        confirm.dom = document.getElementById('confirm')
        draft.dom = document.getElementById('draft')
    }
}

var components = {
    toast: null,
    fetch: null,
    serviceStorage: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.toast = Toast.init()
        this.serviceStorage = ServiceStorage.init()
    }
}

var process = {
    target: CONST.TARGET.DEFAULTS,
    dom: null,

    init: function init() {
        var self = this

        return new Promise((resolve, reject) => {
            self.initProcessTarget(resolve, reject)
        })
    },

    initProcessTarget: function initProcessTarget(resolve, reject) {
        var self = this

        components.serviceStorage.getItem({
            key: 'processTarget'
        }).then(
            res => {
                self.target = res
                resolve()
            },
            error => reject()
        )
    }
}

var textarea = {
    dom: null,
    data: CONST.PLAN.DEFAULTS,

    init: function init() {
        var self = this

        this.dom.style.height = `${initialization.clientHeight - 46}px`
        this.dom.oninput = function () {
            self.data.program = this.value
        }

        this.initDate()
    },

    initDate: function initDate() {
        if (initialization.status === CONST.PAGE_STATUS.ADD) this.getDateByStorage();
        if (initialization.status === CONST.PAGE_STATUS.EDIT && initialization.status === CONST.PAGE_STATUS.SHOW) this.getDateByServer();
    },

    /**
     * 注意: 这是草稿功能
     */
    getDateByStorage: function getDateByStorage() {
        var self = this

        components.serviceStorage.getItem({
            key: 'draftPlanDesign'
        }).then(
            ({
                program
            }) => {
                self.data.program = program
                self.dom.value = program
            },
            error => {}
        )
    },

    getDateByServer: function getDateByServer() {
        var self = this
        components.fetch.get({
            url: 'plan/get/one',
            query: {
                id: this.data.id
            }
        }).then(
            res => {
                self.data = res.data
                self.data.program = res.data.program
                self.dom.value = res.data.program
            },
            error => {}
        )
    }
}

var confirm = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            self.verify()
        }
    },

    verify: function verify() {
        var content = textarea.data.program
        var status = initialization.status

        if (status === CONST.PAGE_STATUS.SHOW) return components.toast.show('禁止编辑');
        if (!content) return components.toast.show('内容不能为空');

        if (status === CONST.PAGE_STATUS.EDIT) {
            return this.editHandle()
        }

        if (status === CONST.PAGE_STATUS.ADD) {
            return this.addHandle()
        }
    },

    editHandle: function editHandle() {
        components.fetch.post({
            url: 'plan/program/edit',
            body: {
                id: textarea.data.id,
                program: textarea.data.program
            }
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    },

    addHandle: function addHandle() {
        components.fetch.post({
            url: 'plan/add',
            body: {
                targetId: process.target.id,
                program: textarea.data.program
            }
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    }
}

var draft = {
    dom: null,

    init: function init() {
        if (initialization.status !== CONST.PAGE_STATUS.ADD) return this.dom.style = 'display: none;'
        this.bindClick()
        this.initAutoStorage()
    },

    bindClick: function bindClick() {
        var self = this
        this.dom.onclick = function () {
            self.save()
        }
    },

    initAutoStorage: function initAutoStorage() {
        var self = this
        setInterval(() => {
            self.save()
        }, (1000 * 60 * 1));
    },

    save: function save() {
        components.serviceStorage.setItem({
            key: 'draftPlanDesign',
            value: {
                program: textarea.data.program
            }
        }).then(
            res => components.toast.show('保存草稿成功!'),
            error => {}
        )
    }
}