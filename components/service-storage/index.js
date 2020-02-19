/**
 * 策略: 仅首页检查一次即可
 * 使用注意: 需前置引入组件依赖
 * components/fetch
 * components/toast
 * components/input-popup
 * utils/json-handle
 */
var ServiceStorage = {
    components: {
        fetch: null,
        jsonHandle: null,
        toast: null,
    },

    init: function init() {
        var self = this

        this.initComponents()

        var instance = {
            getItem: function getItem({
                key,
                hiddenError,
                isArray
            }) {
                return new Promise(function (resolve, reject) {
                    self.getItem(key, hiddenError, isArray, resolve, reject)
                })
            },
            setItem: function setItem({
                key,
                value,
                hiddenError
            }) {
                return new Promise(function (resolve, reject) {
                    self.setItem(key, value, hiddenError, resolve, reject)
                })
            },
            clearItem: function clearItem({
                key,
                hiddenError
            }) {
                return new Promise(function (resolve, reject) {
                    self.clearItem(key, hiddenError, resolve, reject)
                })
            }
        }

        return instance
    },

    initComponents: function initComponents() {
        var components = {
            fetch: Fetch.init(),
            jsonHandle: JsonHandle,
            toast: Toast.init()
        }

        this.components = components
    },

    getItem: function getItem(key, hiddenError, isArray, resolve, reject) {
        var self = this

        this.components.fetch.get({
            url: 'map/get',
            query: {
                key
            },
            hiddenError
        }).then(
            res => {
                var jsonString = res.data.value
                var verify = self.components.jsonHandle.verifyJSONString({
                    jsonString,
                    isArray
                })

                if (verify.isCorrect) {
                    resolve(verify.data)
                } else {
                    if (!hiddenError) {
                        self.components.toast.destroy()
                        self.components.toast.show(verify.msg)
                    }
                    reject(verify.msg)
                }
            },
            error => reject(error)
        )
    },

    setItem: function setItem(key, value, hiddenError, resolve, reject) {
        var self = this
        this.components.fetch.post({
            url: 'map/set',
            body: {
                key,
                value: JSON.stringify(value)
            },
            hiddenError
        }).then(
            res => resolve(),
            error => reject(error)
        )
    },

    clearItem: function clearItem(key, hiddenError, resolve, reject) {
        this.components.fetch.get({
            url: 'map/clear',
            query: {
                key
            },
            hiddenError
        }).then(
            res => resolve(),
            error => reject(error)
        )
    }
}