import config from './../../configs/index.js'
import Prompt from './../../components/prompt'
import Storage from './../../components/storage'
import Confirm from './../confirm'

import fetchHandle from './fetch-handle'
import optionalHeaders from './optional-headers.js'

class AuthHandle {
    constructor({ url, optional, response, resolve, reject }) {
        this.url = url
        this.optional = optional
        this.response = response
        this.resolve = resolve
        this.reject = reject
    }

    verify() {
        const code = this.response.result

        if (code === config.auth.unauthorized.code || code === config.auth.unpermissions.code) return this.showLogin()
        if (code === config.auth.expired.code) return this.refreshAuth()

        this.reject(this.response)
    }

    async reRequest() {
        const optional = {
            ...this.optional,
            headers: optionalHeaders()
        }
        const fetchInstance = await fetchHandle(this.url, optional)
        if (fetchInstance.result !== 1) {
            await Confirm(fetchInstance.message)
            return this.reject(this.response)
        }
        const fetchData = fetchInstance.data
        if (fetchData.result !== 1) {
            await Confirm(fetchData.message)
            return this.reject(this.response)
        }

        this.resolve(fetchData)
    }

    async showLogin() {
        const passwordInstance = await Prompt({ title: '请输入密码', placeholder: '请输入密码' })

        if (passwordInstance.result !== 1) return this.reject(this.response)
        const password = passwordInstance.data

        const url = `${config.origin}${config.auth.url.login}`
        const optional = { method: 'POST', body: JSON.stringify({ password }), headers: optionalHeaders() }
        const fetchInstance = await fetchHandle(url, optional)
        if (fetchInstance.result !== 1) {
            await Confirm(fetchInstance.message)
            return this.reject(this.response)
        }
        const fetchData = fetchInstance.data

        if (fetchData.result === config.auth.loginFailure.code) return this.showLogin()
        if (fetchData.result !== 1) {
            await Confirm(fetchData.message)
            return this.reject(this.response)
        }

        Storage.auth.setToken(fetchData.data)
        this.reRequest()
    }

    async refreshAuth() {
        const url = `${config.origin}${config.auth.url.refresh}`
        const token = Storage.auth.getToken()
        const optional = { method: 'POST', body: JSON.stringify({ token }), headers: optionalHeaders() }
        const fetchInstance = await fetchHandle(url, optional)
        if (fetchInstance.result !== 1) {
            await Confirm(fetchInstance.message)
            return this.reject(this.response)
        }
        const fetchData = fetchInstance.data

        if (fetchData.result !== 1) {
            await Confirm(fetchData.message)
            return this.reject(this.response)
        }
        /** 这里是太久了, 所以需要重新弹出登录 */
        if (fetchData.result === config.auth.expired.code) return this.showLogin()
        Storage.auth.setToken(fetchData.data)
        this.reRequest()
    }
}

export default AuthHandle
