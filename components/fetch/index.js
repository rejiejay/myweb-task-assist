/**
 * 请求
 * 使用注意: 需前置引入组件依赖
 * components/toast
 * components/input-popup
 */
var Fetch = {
    config: {
        origin: '/',
        deniedCode: 5703,
        expiredCode: 5704,
        authFailed: 5788,
    },
    local: {
        origin: 'http://localhost:1932/'
    },
    produce: {
        origin: '/'
    },
    toast: null,
    inputPopUp: null,
    hiddenError: false,

    /**
     * 含义: 缓存请求参数
     * 作用: 用于未授权的二次请求
     */
    cacheRequestMethod: 'get', // 'get post
    cacheRequestParameter: null,
    /**
     * 含义: 请求次数
     * 作用: 防止无限次循环调用
     */
    requestCount: 1,

    init: function init() {
        var self = this
        this.initComponents()

        this.initConfig({
            env: 'local'
        })

        var instance = {
            get: function get(parameter) {
                self.cacheRequestMethod = 'get'
                self.cacheRequestParameter = parameter
                self.requestCount = 1
                return self.get(parameter)
            },
            post: function post(parameter) {
                self.cacheRequestMethod = 'post'
                self.cacheRequestParameter = parameter
                self.requestCount = 1
                return self.post(parameter)
            }
        }

        return instance
    },

    /**
     * 组件
     */
    initComponents: function initComponents() {
        this.inputPopUp = InputPopUp.init()
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
            headers: self.initHeaders()
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

    post: function post({
        url,
        body,
        hiddenError
    }) {
        var self = this

        this.hiddenError = hiddenError ? true : false

        var myUrl = this.config.origin + url

        this.toast.show()
        return new Promise((resolve, reject) => window.fetch(myUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: self.initHeaders()
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

        // 未授权
        if (res.result === this.config.deniedCode) return this.unAuthHandle(resolve, reject)

        // 过期
        if (res.result === this.config.expiredCode) return this.expiredAuthHandle(resolve, reject)

        // 授权失败
        if (res.result === this.config.authFailed) {
            this.toast.destroy()
            this.toast.show(`授权失败, ${res.message}`)
            return reject(res)
        }

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

    initHeaders: function initHeaders() {
        var token = localStorage.getItem('rejiejay-task-assist-token')
        var headers = {
            "Content-Type": 'application/json; charset=utf-8'
        }

        token ? headers['task-assist-token'] = token : null

        return headers
    },

    /**
     * 作用: 处理未授权
     */
    unAuthHandle: function unAuthHandle(resolve, reject) {
        var self = this
        /**
         * 未授权 = 从未登录;
         * 过期 = 一定登录过(至少一次);
         * 区别在于密码; 过期密码一定正确; 未授权密码可能正确;
         */
        var token = localStorage.getItem('rejiejay-task-assist-token')

        /**
         * 含义: 本地不存在凭证
         * 结论: 执行过期流程
         */
        if (!token || token === 'null') return this.expiredAuthHandle(resolve, reject)

        /**
         * 含义: 仅重复校验一次(校验凭证合法性)
         */
        if (this.requestCount > 1) return reject({
            result: 7593,
            data: null,
            message: '校验次数过多'
        });

        /**
         * 含义: 校验凭证合法性
         */
        this.get({
            url: 'user/verify',
            query: {
                verify: 'token'
            }
        }).then(res => {
            /**
             * 含义: 凭证是合法的
             * 结论: 再次请求
             * 有可能刷新授权
             */
            var token = res.data
            localStorage.setItem('rejiejay-task-assist-token', token)

            self.requestCount++
            var request = self[self.cacheRequestMethod]
            request(self.cacheRequestParameter).then(res => {
                resolve(res)
            }, error => reject(error))

        }, error => {
            /**
             * 含义: 校验凭证网络失败
             */
            reject({
                result: 4532,
                data: null,
                message: `校验凭证失败, ${error}`
            })
        })
    },

    /**
     * 作用: 处理过期
     */
    expiredAuthHandle: function expiredAuthHandle(resolve, reject) {
        var password = localStorage.getItem('rejiejay-task-assist-password')

        /**
         * 含义: 本地密码过期 或者 失效
         */
        if (!password) return this.reEnterPassword(resolve, reject)

        this.reAuthPassword({
            password,
            resolve,
            reject
        })
    },

    reEnterPassword: function reEnterPassword(resolve, reject) {
        var self = this
        this.toast.destroy()

        var parameter = {
            title: '密码过期, 请重新输入密码?',
            handle: handle,
            mustInput: true
        }

        var handle = function handle(input) {
            self.reAuthPassword({
                password: input,
                resolve,
                reject,
                isEnterPassword: true
            })
        }

        this.inputPopUp.show(parameter)
    },

    /**
     * 含义: 密码重新登录
     */
    reAuthPassword: function reAuthPassword({
        password,
        resolve,
        reject,
        isEnterPassword
    }) {
        var self = this

        this.get({
            url: 'user/login',
            query: {
                name: 'rejiejay',
                password: password
            }
        }).then(res => {
            var token = res.data

            localStorage.setItem('rejiejay-task-assist-token', token)
            localStorage.setItem('rejiejay-task-assist-password', password)

            /**
             * 含义: 是否正在输入密码
             */
            if (isEnterPassword) self.inputPopUp.hiden();

            /**
             * 含义: 仅重复授权一次
             */
            if (self.requestCount <= 1) {
                self.requestCount++
                var request = self[self.cacheRequestMethod]
                request(self.cacheRequestParameter).then(res => {
                    resolve(res)
                }, error => reject(error))

            } else {
                reject({
                    result: 7592,
                    data: null,
                    message: '授权次数过多'
                })
            }
        }, error => reject({
            result: 4532,
            data: null,
            message: error
        }))
    },
}