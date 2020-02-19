window.onload = function () {
    initialization.main()
}

/**
 * target 数据结构
 */
var target = `{
    "id": "gwy",
    "name": "公务员"
}`

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        components.init()

        this.initDom()

        input.init()
        submit.init()
        template.init()
        format.init()

        this.initData()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        input.dom = document.getElementById('my-input')
        submit.btn_dom = document.getElementById('my-submit')
        submit.btn_dom = document.getElementById('my-submit')
        template.btn_dom = document.getElementById('my-template')
        format.btn_dom = document.getElementById('my-format')
    },

    /**
     * 服务器数据 初始化
     */
    initData: function initData() {

        components.serviceStorage.getItem({
            key: 'allTarget',
            hiddenError: true
        }).then(
            res => input.set(JSON.stringify(res)),
            error => input.set('[\n]')
        )
    },
}

var components = {
    fetch: null,
    toast: null,
    inputPopUp: null,
    jsonHandle: null,
    serviceStorage: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.toast = Toast.init()
        this.inputPopUp = InputPopUp.init()
        this.jsonHandle = JsonHandle
        this.serviceStorage = ServiceStorage.init()
    }
}

/**
 * 输入
 */
var input = {
    dom: null,

    init: function init() {
        var self = this

        self.dom.onchange = function () {
            self.handle()
        }
    },

    set: function set(value) {
        this.dom.innerHTML = value
    },

    verify: function verify() {
        var data = this.dom.value
        return components.jsonHandle.verifyJSONString({
            jsonString: data,
            isArray: true
        })
    },

    /**
     * 格式化数据
     * 目标: 方便插入数据
     */
    format: function format() {
        var data = this.dom.value
        // 校验合法性
        var verify = input.verify()
        if (verify.isCorrect === false) {
            return false
        } else {
            data = verify.data
        }

        // 格式化
        var valueFormat = '[\n'
        var lastKey = (data.length > 0) ? data.length - 1 : 0
        data.map((item, key) => {
            valueFormat += JSON.stringify(item)
            valueFormat += (key === lastKey) ? '\n' : ',\n'
        })
        valueFormat += ']'

        this.set(valueFormat)

        var format = {
            value: data,
            string: valueFormat
        }
        return format
    },

    handle: function handle() {}
}

/**
 * 提交
 */
var submit = {
    btn_dom: null,

    init: function init() {
        var self = this

        this.btn_dom.onclick = function () {
            self.handle()
        }
    },

    handle: function handle() {
        var data = input.dom.value
        var verify = input.verify()

        if (verify.isCorrect === false) {
            return alert(verify.msg)
        }

        components.serviceStorage.setItem({
            key: 'allTarget',
            value: verify.data
        }).then(
            res => components.toast.show('update successful'),
            error => {}
        )
    }
}

/**
 * 模板
 */
var template = {
    btn_dom: null,

    init: function init() {
        var self = this

        this.btn_dom.onclick = function () {
            self.handle()
        }
    },

    handle: function handle() {
        var self = this
        var data = input.dom.value

        // 校验数据是否正确
        var verify = input.verify()
        if (verify.isCorrect === false) {
            return alert(verify.msg + '无法插入模板')
        }

        // 插入一条数据
        function insert() {
            /**
             * 格式化数据
             * 注意: 格式一定是正确的, 因为上方已经校验过
             */
            var format = input.format()
            var handleString = format.string.substring(0, format.string.length - 1);

            if (format.value.length > 0) {
                handleString += ',\n'
            }
            handleString += target
            handleString += '\n]'

            input.set(handleString)
        }
        insert()
    }
}

/**
 * 格式化
 */
var format = {
    btn_dom: null,

    init: function init() {
        var self = this

        this.btn_dom.onclick = function () {
            self.handle()
        }
    },

    handle: function handle() {
        input.format()
    }
}