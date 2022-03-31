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

    async verify() {
        const code = this.response.result

        if (code === config.auth.loginFailure.code) return await this.showLogin()

        this.reject(this.response)
    }

    async reRequest() {
        const optional = {
            ...this.optional,
            headers: optionalHeaders()
        }
        const fetch = await fetchHandle(this.url, optional)
        if (fetch instanceof Error) {
            await Confirm(fetch.message)
            return this.reject(this.response)
        }
        if (fetch.result !== 1) {
            await Confirm(fetch.message)
            return this.reject(this.response)
        }

        this.resolve(fetch)
    }

    async showLogin() {
        const passwordInstance = await Prompt({ title: '请输入密码', placeholder: '请输入密码' })

        if (passwordInstance.result !== 1) return this.reject(this.response)
        const password = passwordInstance.data
        const account = '454766952@qq.com'

        const url = `${config.origin}${config.auth.url.login}`
        const optional = { method: 'POST', body: JSON.stringify({ account, password }), headers: optionalHeaders() }
        const fetch = await fetchHandle(url, optional)
        if (fetch instanceof Error) {
            await Confirm(fetch.message)
            return this.reject(this.response)
        }
        if (fetch.result === config.auth.loginFailure.code) {
            await Confirm(fetch.message)
            return this.showLogin()
        }
        if (fetch.result !== 1) {
            await Confirm(fetch.message)
            return this.reject(this.response)
        }

        Storage.auth.setToken(fetch.data)
        await this.reRequest()
    }
}

export default AuthHandle
