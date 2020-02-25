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
        EDIT: 'edit'
    },
    PLAN: {
        DEFAULTS: {
            id: 0,
            program: null
        },
        DEMO: {
            id: 0,
            targetId: 'not-null',
            program: null,
            according: null,
            sqlTimestamp: 'not-null'
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
        del.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        textarea.init()
    },

    initPageStatus: function initPageStatus() {
        var id = window.localStorage['task-plan-according-id']

        if (id) {
            textarea.data.id = id
            this.status = CONST.PAGE_STATUS.EDIT
            confirm.dom.innerHTML = '编辑'
        }

        window.localStorage['task-plan-according-id'] = ''
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        textarea.dom = document.getElementById('according-input')
        confirm.dom = document.getElementById('confirm')
        del.dom = document.getElementById('delete')
    },
}

var components = {
    fetch: null,
    serviceStorage: null,
    confirmPopUp: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
        this.confirmPopUp = ConfirmPopUp.init()
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
        textarea.dom.style.height = `${initialization.clientHeight - 46}px`

        this.dom.oninput = function () {
            self.data.according = this.value
        }

        if (initialization.status === CONST.PAGE_STATUS.EDIT) this.initDate();
    },


    initDate: function initDate() {
        var self = this
        components.fetch.get({
            url: 'plan/get/one',
            query: {
                id: this.data.id
            }
        }).then(
            res => {
                self.data = res.data
                self.data.according = res.data.according
                self.dom.value = res.data.according
            },
            error => {}
        )
    },

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
        var content = textarea.data.according
        var status = initialization.status

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
            url: 'plan/according/edit',
            body: {
                id: textarea.data.id,
                according: textarea.data.according
            }
        }).then(
            res => window.location.href = './../according-list/index.html',
            error => {}
        )
    },

    addHandle: function addHandle() {
        components.fetch.post({
            url: 'plan/add',
            body: {
                targetId: process.target.id,
                according: textarea.data.according
            }
        }).then(
            res => window.location.href = './../according-list/index.html',
            error => {}
        )
    }
}

var del = {
    dom: null,

    init: function init() {
        var self = this
        var isDeling = false

        if (status === CONST.PAGE_STATUS.ADD) return this.dom.style = 'display: none;';
        this.dom.onclick = function () {
            if (isDeling) return
            isDeling = true

            var parameter = {
                title: `确认要删除?`,
                succeedHandle: () => self.delHandle
            }
            components.confirmPopUp(parameter)
        }
    },

    delHandle: function delHandle() {
        components.fetch.post({
            url: 'plan/del',
            body: {
                id: textarea.data.id,
            }
        }).then(
            res => window.location.href = './../according-list/index.html',
            error => {}
        )
    }
}