window.onload = function () {
    initialization.main()
}

var CONST = {
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
        components.init()
        this.initDom()

        sort.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        sort.dom = document.getElementById('sort')
    },
}

var components = {
    constHandle: null,

    init: function init() {
        this.constHandle = ConstHandle
    }
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