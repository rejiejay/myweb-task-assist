import config from './../../configs/index.js'
import Prompt from './../../components/prompt'
import Storage from './../../components/storage'

import fetchHandle from './fetch-handle'
import optionalHeaders from './optional-headers.js'

class AuthHandle {
    constructor({ url, optional, response, resolve, reject }) {
        this = { ...this, url, optional, response, resolve, reject }
    }

    verify() {
        const code = this.response.result

        if (code === config.auth.unauthorized.code || code === config.auth.unpermissions.code) return this.showLogin()
        if (code === config.auth.expired.code) return this.refreshAuth()

        this.reject(this.response)
    }

    reRequest = async function reRequest() {
        const optional = {
            ...this.optional,
            headers: optionalHeaders()
        }
        const fetchInstance = await fetchHandle(this.url, optional)
        if (fetchInstance.result !== 1) return this.reject(fetchInstance)
        const fetchData = fetchInstance.data
        if (fetchData.result !== 1) return this.reject(data)

        this.resolve(data)
    }

    showLogin = async function showLogin() {
        const passwordInstance = await Prompt({ title: '请输入密码', placeholder: '请输入密码' })

        if (passwordInstance.result !== 1) return this.reject(this.response)
        const password = passwordInstance.data

        const url = `${config.origin}${config.auth.url.login}`
        const optional = { method: 'POST', body: JSON.stringify({ password }) }
        const fetchInstance = await fetchHandle(url, optional)
        if (fetchInstance.result !== 1) return this.reject(this.response)
        const fetchData = fetchInstance.data

        if (fetchData.result === config.auth.loginFailure.code) return this.showLogin()
        if (fetchData.result !== 1) return this.reject(this.response)

        Storage.auth.setToken(fetchData.data)
        this.reRequest()
    }

    refreshAuth = async function refreshAuth() {
        const url = `${config.origin}${config.auth.url.refresh}`
        const optional = { method: 'POST', body: '' }
        const fetchInstance = await fetchHandle(url, optional)
        if (fetchInstance.result !== 1) return this.reject(this.response)
        const data = fetchInstance.data

        if (data.result !== 1) return this.reject(this.response)
        Storage.auth.setToken(fetchData.data)
        this.reRequest()
    }
}

export default AuthHandle
