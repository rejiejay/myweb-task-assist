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
    ACCIORDING: {
        DEMO: {
            id: 1,
            targetId: "not-null",
            according: null,
            program: null,
            sqlTimestamp: 'not-null'
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

        add.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        list.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        add.dom = document.getElementById('according-add')
        list.list_dom = document.getElementById('according-list')
        list.handle_show_more_dom = document.getElementById('show-more')
    },
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

var add = {
    dom: null,

    init: function init() {
        this.dom.onclick = function () {
            window.location.href = './../according-edit/index.html'
        }
    }
}

var list = {
    list_dom: null,
    handle_show_more_dom: null,
    data: [
        /** CONST.ACCIORDING.DEMO */
    ],
    count: 0,

    init: function init() {
        this.initData()
        this.initShowMore()
    },

    initShowMore: function initShowMore() {
        var self = this
        this.handle_show_more_dom.onclick = function () {
            if (self.count === self.data.length) return components.toast.show('已加载完成所有数据!')

            self.initData()
        }
    },

    initData: function initData() {
        var self = this

        /**
         * 含义: 去重
         */
        var duplicateBySet = function duplicateBySet(list) {
            return Array.from(list.reduce((mySet, according) => {
                mySet.add(JSON.stringify(according))
                return mySet
            }, new Set())).map(accordingString => JSON.parse(accordingString))
        }
        var duplicate = function duplicate(list) {
            var filters = new Set()
            return list.filter(according => {
                var isRepeat = !Array.from(filters).includes(according.id)
                filters.add(according.id)
                return isRepeat
            })
        }

        components.fetch.get({
            url: 'plan/get/according/random',
            query: {
                targetId: process.target.id
            }
        }).then(
            ({
                data: {
                    random,
                    count
                }
            }) => {
                if (random.length === 0) return components.toast.show('已加载完成所有数据!')

                /**
                 * 含义: 每次组合时, 都需要去重一次;
                 */
                self.data = duplicate(self.data.concat(random))
                self.count = +count
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        var {
            data,
            list_dom,
            handle_show_more_dom,
            count
        } = this

        var diff = count - data.length
        handle_show_more_dom.innerHTML = `显示更多(剩余: ${diff > 0 ? diff : 0})`

        list_dom.innerHTML = data.map(({
            according
        }) => `<div class="according-item">${according}</div>`).join('')

        var children_dom = list_dom.children
        for (var index = 0; index < children_dom.length; index++) {
            (function (index) {
                var element = children_dom[index];
                var targetItem = data[index];

                element.onclick = function () {
                    window.localStorage.setItem('task-plan-according-id', targetItem.id)
                    window.location.href = './../according-edit/index.html'
                }
            })(index)
        }
    }
}