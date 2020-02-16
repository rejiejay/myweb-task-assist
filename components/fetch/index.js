/**
 * 请求
 * 使用注意: 需前置引入组件依赖
 * components/toast
 */
var Fetch = {
    config: {
        origin: '/',
        deniedCode: 5703
    },
    local: {
        origin: 'http://localhost:1932/'
    },
    produce: {
        origin: '/'
    },
    toast: null,
    hiddenError: false,

    init: function init() {
        var self = this
        this.initComponents()

        this.initConfig({
            env: 'local'
        })

        var instance = {
            get: function get(parameter) {
                return self.get(parameter)
            },
            post: function post() {}
        }

        return instance
    },

    /**
     * 组件
     */
    initComponents: function initComponents() {
        this.toast = Toast.init()
    },


    initConfig: function initConfig({
        env
    }) {
        this.config.origin = this[env].origin
    },


    queryToUrl: function queryToUrl(query) {
        if (!query) return ''

        var keys = Object.keys(query)
        if (keys.length <= 0) return ''

        var url = '?'
        for (var index = 0; index < keys.length; index++) {
            var key = keys[index]
            var value = query[key]
            url += `${key}=${value}`
            url += index !== (keys.length - 1) ? '&' : ''
        }

        return url
    },

    get: function get({
        url,
        query,
        hiddenError
    }) {
        var self = this

        this.hiddenError = hiddenError ? true : false

        var myUrl = this.config.origin + url
        myUrl += this.queryToUrl(query)

        this.toast.show()
        return new Promise((resolve, reject) => window.fetch(myUrl, {
            method: 'GET',
            contentType: 'application/json; charset=utf-8'
        }).then(response => response.json(), error => ({
            result: 233,
            data: null,
            message: error
        })).then(response => self.responseHandle({
            res: response,
            resolve: resolve,
            reject: reject
        }), error => self.errorHandle(error, reject)).catch(error => self.errorHandle({
            result: 344,
            message: error
        }, reject)))
    },

    responseHandle: function responseHandle({
        res,
        resolve,
        reject
    }) {
        if (!res) return this.errorHandle({
            result: 455,
            message: '数据为空'
        }, reject)

        /**
         * 处理未授权情况
         */
        var unauthorizedCode = this.config.deniedCode
        if (res.result === unauthorizedCode) return this.errorHandle(res, reject)

        if (res.result === 1) {
            this.toast.destroy()
            resolve(res)
        } else {
            this.errorHandle(res, reject)
        }
    },

    errorHandle: function errorHandle(result, reject) {
        this.toast.destroy()

        this.hiddenError ? '' : this.toast.show(result.message)

        reject(result)
    },
}