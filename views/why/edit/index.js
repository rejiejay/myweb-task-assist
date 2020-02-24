window.onload = function () {
    initialization.main()
}

var CONST = {
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit',
    },

    WHY: {
        DEFAULTS: {
            id: null, // 作用: 判空
            targetId: null, // 作用: 判空
            content: null, // 作用: 判空
        },
        DEMO: {
            id: 1,
            targetId: 'not-null',
            content: 'not-null',
            stickyTimestamp: null,
            sqlTimestamp: null
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
        var slef = this

        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        components.init()
        this.initDom()

        this.initPageStatus()

        confirm.init()
        del.init()
        reasonable.init()

        target.init().then(() => {
            slef.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        textarea.init()
    },

    initPageStatus: function initPageStatus() {
        var id = window.localStorage['task-why-edit-id']

        if (id) {
            window.localStorage['task-why-edit-id'] = ''
            textarea.data.id = id
            this.status = CONST.PAGE_STATUS.EDIT
        } else {
            this.status = CONST.PAGE_STATUS.ADD
        }
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        textarea.dom = document.getElementById('reason-input')

        reasonable.sticky_dom = document.getElementById('sticky-reason')
        reasonable.unpin_dom = document.getElementById('unpin-reason')
        confirm.dom = document.getElementById('confirm')
        del.dom = document.getElementById('delete')
    },
}

var components = {
    toast: null,
    fetch: null,
    serviceStorage: null,
    confirmPopUp: null,

    init: function init() {
        this.toast = Toast.init()
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
        this.confirmPopUp = ConfirmPopUp.init()
    }
}

var target = {
    id: null,

    init: function init() {
        var self = this
        return new Promise(function (resolve, reject) {
            components.serviceStorage.getItem({
                key: 'processTarget'
            }).then(
                res => {
                    self.id = res.id
                    resolve()
                },
                error => reject()
            )
        })
    }
}

var textarea = {
    dom: null,
    data: CONST.WHY.DEFAULTS,

    init: function init() {
        var self = this

        this.dom.style.height = `${initialization.clientHeight - 46}px`
        this.dom.oninput = function () {
            self.data.content = this.value
        }

        this.initDate()
    },

    initDate: function initDate() {
        var self = this

        if (initialization.status !== CONST.PAGE_STATUS.EDIT) return

        components.fetch.get({
            url: 'why/get/one',
            query: {
                id: this.data.id
            }
        }).then(
            res => {
                self.data = res.data
                self.data.content = res.data.content
                self.dom.value = res.data.content
            },
            error => {}
        )
    },
}

var reasonable = {
    dom: null,
    sticky_dom: null,
    unpin_dom: null,

    init: function init() {
        var self = this

        this.sticky_dom.onclick = function () {
            self.set({
                setToFullest: true
            })
        }
        this.unpin_dom.onclick = function () {
            self.set({
                setToFullest: false
            })
        }
    },

    set: function set({
        setToFullest
    }) {
        if (!textarea.data.id) return components.toast.show('无法置顶新增任务!');

        components.fetch.post({
            url: 'why/edit/reasonable',
            body: {
                id: textarea.data.id,
                setToFullest
            }
        }).then(
            res => {
                setTimeout(() => components.toast.show(setToFullest ? '成功顶置任务!' : '成功取消置顶!'), 200)
                textarea.initDate()
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
        var content = textarea.data.content

        if (!content) return components.toast.show('内容不能为空');

        if (initialization.status === CONST.PAGE_STATUS.EDIT) {
            this.editHandle()
        } else {
            this.addHandle()
        }
    },

    editHandle: function editHandle() {
        components.fetch.post({
            url: 'why/edit',
            body: {
                id: textarea.data.id,
                content: textarea.data.content
            }
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    },

    addHandle: function addHandle() {
        components.fetch.post({
            url: 'why/add',
            body: {
                targetId: target.id,
                content: textarea.data.content
            }
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    }
}

var del = {
    dom: null,

    init: function init() {
        var self = this

        this.dom.onclick = function () {
            var isDel = false
            var confirmMsg

            if (initialization.status === CONST.PAGE_STATUS.EDIT) {
                isDel = true
                confirmMsg = '你确认要删除吗?'
            } else {
                confirmMsg = '是否取消新增理由?'
            }
            var parameter = {
                title: confirmMsg,
                succeedHandle: () => isDel ? self.deleteHandle() : self.cancelHandle()
            }
            components.confirmPopUp(parameter)
        }
    },

    deleteHandle: function deleteHandle() {
        var self = this

        components.fetch.post({
            url: 'why/delete',
            body: {
                id: textarea.data.id
            }
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    },

    cancelHandle: function cancelHandle() {
        window.location.href = './../index.html'
    }
}