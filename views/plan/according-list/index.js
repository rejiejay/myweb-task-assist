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
        according.dom = document.getElementById('according-add')
    },
}

var components = {
    fetch: null,
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

var according = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './../according-edit/index.html'
        }
    }
}