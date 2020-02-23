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

        textarea.init()
        confirm.init()

        target.init().then(() => {
            slef.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {},

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
        confirm.dom = document.getElementById('confirm')
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

    editHandle: function editHandle() {},

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