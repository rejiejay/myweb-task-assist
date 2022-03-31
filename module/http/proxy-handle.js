import axios from 'axios'
import config from './../../config'
import Log from './../Log'

class ProxyRewrite {
    constructor({
        request,
        parameter
    }) {
        this.url = request.url
        this.method = request.method
        this.parameter = parameter
        this.token = request.headers[config.proxyRewrite.token]
        this.uuid = request.headers[config.proxyRewrite.uuid]
        this.baseURL = config.proxyRewrite.baseURL
    }

    async rewrite() {
        const axiosRequest = {
            url: this.url,
            baseURL: this.baseURL,
            method: this.method,
            headers: {
                token: this.token,
                uuid: this.uuid
            },
        }
        if (this.method === 'POST') {
            axiosRequest.data = this.parameter
        } else {
            axiosRequest.params = this.parameter
        }
        Log.pending(`axiosRequest: ${JSON.stringify(axiosRequest)} \nProxyRewrite request pending  ------------------>`)

        try {
            const axiosResponse = await axios.request(axiosRequest);
            Log.success(`axiosResponse: ${JSON.stringify(axiosResponse.data)} \nProxyRewrite request success  ------------------>`)
            return axiosResponse.data
        } catch (error) {
            const errorMessage = `axiosRequest: ${JSON.stringify(axiosRequest)} ${JSON.stringify(error)}\nrequest failure  ------------------>`
            Log.error(errorMessage)
            return new Error(errorMessage)
        }
    }
}

export default ProxyRewrite