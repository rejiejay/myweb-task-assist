/**
 * 策略: 仅首页检查一次即可
 * 使用注意: 需前置引入组件依赖
 */
var Login = {
    token: false,

    init: function init() {
        var self = this

        this.tokenCheck()
        this.verifyAll()

        /**
         * 暂时不需要承担控制反转需求
         */
        // var instance = {}
        // return instance
    },

    /**
     * 作用: 校验是否有凭证
     * 目的: 用于登录校验
     */
    tokenCheck: function tokenCheck() {
        var token = localStorage.getItem('rejiejay-task-assist-token')
        if (token) {
            this.token = token
        }
    },

    /**
     * 作用: 校验是否登录
     */
    verifyAll: function verifyAll() {
        if (!this.token) {
            return this.showLogInput()
        }

        /**
         * 服务器校验凭证
         */
        this.verifyToken()
    },

    /**
     * 服务器校验凭证
     */
    verifyToken: function verifyToken() {
        var token = this.token
        var fetch = false

        return fetch
    },

    /**
     * 作用: 弹出登录框
     */
    showLogInput: function showLogInput() {},

    /**
     * 服务器校验密码
     */
    verifyPassword: function verifyPassword(password) {
        var fetch = false

        localStorage.setItem('rejiejay-task-assist-token', fetch)
        this.token = fetch

        return fetch
    },
}