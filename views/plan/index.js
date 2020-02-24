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
    }
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var self = this

        components.init()
        this.initDom()

        edit.init()
        according.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {},

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        edit.dom = document.getElementById('edit-add')
        according.add_dom = document.getElementById('according-add')
        according.list_dom = document.getElementById('according-list')
    },
}

var components = {
    toast: null,
    serviceStorage: null,

    init: function init() {
        this.fetch = Fetch.init()
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

var edit = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './edit/index.html'
        }
    }
}

var according = {
    add_dom: null,
    list_dom: null,

    init: function init() {
        this.add_dom.onclick = function () {
            window.location.href = './according-edit/index.html'
        }
        this.list_dom.onclick = function () {
            window.location.href = './according-list/index.html'
        }
    }
}