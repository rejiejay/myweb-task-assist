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
    },

    STATISTICS: {
        DEFAULTS: {
            count: 0,
            expiredTimestamp: new Date().getTime()
        },
        DEMO: {
            count: 0,
            expiredTimestamp: 0
        }
    },

    CONCLUSION: {
        DEFAULTS: {
            id: null, // 作用: 判空
            conclusion: null, // 作用: 判空
        },
        DEMO: {
            id: 1,
            targetId: 'not-null',
            title: 'not-null',
            content: '',
            conclusion: null,
            measure: null,
            span: null,
            aspects: null,
            worth: null,
            estimate: null,
            image: null,
            putoffTimestamp: null,
            completeTimestamp: null,
            sqlTimestamp: null
        }
    },

    BASE_IMAGE_URL: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/'
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        var self = this

        this.initDom()
        components.init()

        edit.init()

        process.init().then(() => {
            self.stepTwo()
        })
    },

    stepTwo: function stepTwo() {
        sort.init()
        list.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        sort.dom = document.getElementById('sort')
        edit.dom = document.getElementById('conclusion-add')

        process.description_dom = document.getElementById('process-description')
        process.unlock_dom = document.getElementById('process-unlock')
        list.list_dom = document.getElementById('list')
        list.handle_show_more_dom = document.getElementById('show-more')
    }
}

var components = {
    constHandle: null,
    fetch: null,
    serviceStorage: null,
    confirmPopUp: null,
    jsonHandle: null,
    toast: null,


    init: function init() {
        this.constHandle = ConstHandle
        this.fetch = Fetch.init()
        this.toast = Toast.init()
        this.serviceStorage = ServiceStorage.init()
        this.confirmPopUp = ConfirmPopUp.init()
        this.jsonHandle = JsonHandle
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
                list.initDataAll({
                    isForce: true
                })
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

    switchType: function switchType() {
        var newType = this.type === CONST.SORT.TIME.value ? CONST.SORT.RANDOM.value : CONST.SORT.TIME.value
        this.initValue(newType)
        list.initDataAll({
            isForce: true
        })
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

var list = {
    list_dom: null,
    handle_show_more_dom: null,
    data: [
        /** CONST.ACCIORDING.DEMO */
    ],
    pageNo: 1,
    count: 0,

    init: function init() {
        this.initDataAll({
            isForce: true
        })
        this.initShowMore()
    },

    initShowMore: function initShowMore() {
        var self = this

        this.handle_show_more_dom.onclick = function () {
            if (sort.type === CONST.SORT.TIME.value && self.count === self.data.length) return components.toast.show('已加载完成所有数据!')

            self.initDataAll({
                isForce: false
            })
        }
    },

    initDataAll: function initDataAll({
        isForce
    }) {
        var self = this
        this.initStatistics(isForce).then(() => {
            if (sort.type === CONST.SORT.TIME.value) {
                self.initDataByTime(isForce)
            }
            if (sort.type === CONST.SORT.RANDOM.value) {
                self.initDataByRandom(isForce)
            }
        })
    },

    /**
     * 初衷: 避免消耗太多SQL性能
     * 定义: 1分钟刷新一次
     */
    initStatistics: function initStatistics(isForce) {
        var self = this

        var statistic = CONST.STATISTICS.DEFAULTS
        var nowTimestamp = new Date().getTime()
        var targetId = process.target.id

        var query = targetId ? {
            targetId
        } : {}

        return new Promise(resolve => {
            /**
             * 含义: 强制刷新
             */
            if (!isForce) {
                var statisticString = window.localStorage['task-conclusion-list-statistics']
                var verify = statisticString ? components.jsonHandle.verifyJSONString({
                    jsonString: statisticString,
                    isArray: true
                }) : {
                    isCorrect: false
                }

                /**
                 * 含义: 解析缓存失败情况
                 */
                if (verify.isCorrect) {
                    statistic = verify.data
                    /**
                     * 含义: 未过期不执行
                     * 注意: 当前时间 超过 过期时间, 表示过期
                     */
                    if (nowTimestamp > +statistic.expiredTimestamp) {
                        self.count = +statistic.count
                        return resolve()
                    }
                }
            }

            components.fetch.get({
                url: 'task/conclusion/statistics',
                query
            }).then(
                ({
                    data
                }) => {
                    self.count = +data
                    statistic = {
                        expiredTimestamp: (nowTimestamp + (1000 * 60 * 1)),
                        count: +data
                    }
                    window.localStorage.setItem('task-conclusion-list-statistics', JSON.stringify(statistic))
                    resolve()
                },
                error => resolve()
            )
        })
    },

    initDataByTime: function initDataByTime(isForce) {
        var self = this
        isForce ? this.pageNo = 1 : null
        var pageNo = this.pageNo
        var targetId = process.target.id
        var query = {
            pageNo
        }
        targetId ? query.targetId = targetId : null

        components.fetch.get({
            url: 'task/conclusion/list',
            query
        }).then(
            ({
                data
            }) => {
                if (data.length === 0) return components.toast.show('已加载完成所有数据!')

                if (isForce) {
                    /** 含义: 强制刷新 */
                    self.data = data

                } else if (self.data.length > 0 && self.pageNo > 1 && self.count > 1) {
                    /** 含义: 判断是否新增 */
                    self.data = self.data.concat(data)
                } else {
                    self.data = data
                }

                self.pageNo++
                self.render()
            },
            error => {}
        )
    },

    initDataByRandom: function initDataByRandom(isForce) {
        var self = this
        var targetId = process.target.id
        var query = targetId ? {
            targetId
        } : {}

        var duplicate = function duplicate(list) {
            var filters = new Set()
            return list.filter(according => {
                var isRepeat = !Array.from(filters).includes(according.id)
                filters.add(according.id)
                return isRepeat
            })
        }

        this.pageNo = 1
        components.fetch.get({
            url: 'task/conclusion/random',
            query
        }).then(
            ({
                data
            }) => {
                if (data.length === 0) return components.toast.show('已加载完成所有数据!')

                if (isForce) {
                    /** 含义: 强制刷新 */
                    self.data = data
                } else {
                    /** 含义: 每次组合时, 都需要去重一次; */
                    self.data = duplicate(self.data.concat(data))
                }
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        var {
            data,
            handle_show_more_dom,
            list_dom,
            count
        } = this
        var diff = count - data.length
        handle_show_more_dom.innerHTML = `显示更多(剩余: ${diff > 0 ? diff : 0})`

        var renderImage = function renderImage(image) {
            return image ? `<div class="item-image">
                <img id="image" src="${CONST.BASE_IMAGE_URL}${image}" alt="image">
            </div>` : ''
        }

        list_dom.innerHTML = data.map(({
            id,
            targetId,
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate,
            image,
            putoffTimestamp,
            completeTimestamp,
            sqlTimestamp
        }) => `
            <div class="conclusion-item">
                <div class="item-container">
                    <div class="item-title">${title}</div>
                    ${renderImage(image)}
                    <div class="item-description">${conclusion.replace(/\n/g, "<br>")}</div>
                </div>
            </div>
        `).join('')

        var handleOnClick = function handleOnClick(targetItem) {
            localStorage.setItem('task-conclusion-edit-id', targetItem.id)
            window.location.href = './edit/index.html'
        }

        var children_dom = list_dom.children
        for (var index = 0; index < children_dom.length; index++) {

            (function (index) {
                var targetItem = data[index];

                var element = children_dom[index];
                var container_element = element.firstElementChild
                var title = container_element.firstElementChild
                var description = container_element.lastElementChild

                title.onclick = function () {
                    handleOnClick(targetItem)
                }
                description.onclick = function () {
                    handleOnClick(targetItem)
                }

                /** 含义: 存在图片 */
                if (container_element.childElementCount === 3) {
                    var image_element = container_element.children[1]

                    image_element.onclick = function () {
                        imageHandle(`${CONST.BASE_IMAGE_URL}${targetItem.image}`)
                    }
                }
            })(index)
        }
    },
}