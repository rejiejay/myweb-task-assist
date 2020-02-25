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
    SORT: {
        TIME: {
            value: 'time',
            lable: '时间排序',
            description: 'sort by time New to Old'
        },
        RANDOM: {
            value: 'random',
            lable: '随机排序',
            description: 'sort by random'
        }
    }
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var self = this

        this.initDom()
        components.init()

        sort.init()
        edit.init()

        process.init().then(() => {
            self.stepTwo()
        })
    },

    stepTwo: function stepTwo() {},

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        sort.dom = document.getElementById('sort')
        edit.dom = document.getElementById('conclusion-add')

        process.description_dom = document.getElementById('process-description')
        process.unlock_dom = document.getElementById('process-unlock')
    }
}

var components = {
    constHandle: null,
    fetch: null,
    serviceStorage: null,

    init: function init() {
        this.constHandle = ConstHandle
        this.fetch = Fetch.init()
        this.serviceStorage = ServiceStorage.init()
    }
}


var process = {
    target: CONST.TARGET.DEFAULTS,
    description_dom: null,
    unlock_dom: null,

    init: function init() {
        var self = this

        this.initUnlockHandle()

        return new Promise((resolve) => {
            self.initProcessTarget(resolve)
        })
    },

    initUnlockHandle: function initUnlockHandle() {
        var self = this
        this.unlock_dom.onclick = function () {
            if (!self.target.id) return

            var handle = function handle() {
                self.unlock()
            }

            var parameter = {
                title: '你确认要解除锁定吗?',
                succeedHandle: handle
            }
            components.confirmPopUp(parameter)
        }
    },

    initProcessTarget: function initProcessTarget(resolve) {
        var self = this

        components.serviceStorage.getItem({
            key: 'processTarget',
            hiddenError: true
        }).then(
            res => {
                self.target = res
                self.render()
                resolve()
            },
            error => resolve()
        )
    },

    unlock: function unlock() {
        var self = this

        components.serviceStorage.clearItem({
            key: 'processTarget'
        }).then(
            res => {
                self.target = CONST.TARGET.DEFAULTS
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        this.description_dom.innerHTML = `范围: ${this.target.name}`
    },
}

var sort = {
    dom: null,
    type: CONST.SORT.TIME.value,

    init: function init() {
        var self = this
        var myType = window.localStorage.getItem('task-conclusion-list-sort-type')

        this.initValue(myType ? myType : this.type)

        this.dom.onclick = function () {
            self.switchType()
        }
    },

    initValue: function switchType(type) {
        if (!type || type === 'null') return
        this.type = type
        window.localStorage.setItem('task-conclusion-list-sort-type', type)
        this.dom.innerHTML = components.constHandle.findValueByValue({
            CONST: CONST.SORT,
            supportKey: 'value',
            supportValue: type,
            targetKey: 'lable'
        })
    },

    switchType: function switchType() {
        var newType = this.type === CONST.SORT.TIME.value ? CONST.SORT.RANDOM.value : CONST.SORT.TIME.value
        this.initValue(newType)
    }
}

/**
 * 图片处理
 * 作用: 放大图片
 */
var imageHandle = function imageHandle(imageUrl) {
    previewImage.start({
        urls: [imageUrl],
        current: imageUrl
    })
}

var edit = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './edit/index.html'
        }
    }
}