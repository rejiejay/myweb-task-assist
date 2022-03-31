/**
 * async-fetch 对外方法:
 * @get method
 * @post method
 * @reGetConfirm method This for must get successful
 */
import consequencer from './../../../utils/consequencer'
import config from './../../configs/index.js'
import Confirm from './../confirm'

import WaitStackInterval from './wait-stack-interval.js'
import optionalHeaders from './optional-headers.js'
import AuthHandle from './auth-handle.js'
import fetchHandle from './fetch-handle'
import utils from './utils.js'

/**
 * @param {url, query, isShowError} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
async function get(parameter, { resolve, reject }) {
    const url = `${config.origin}${parameter.url}${utils.queryToUrl(parameter.query)}`

    // reference: https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
    const optional = {
        method: 'GET',
        headers: optionalHeaders()
    }

    const fetch = await fetchHandle(url, optional)
    if (fetch instanceof Error) {
        return reject(consequencer.error(fetch.message))
    }
    const handleShowError = async () => {
        if (parameter.isShowError) {
            await Confirm(fetch.message)
            return reject(fetch)
        }

        reject(fetch)
    }

    if (fetch.result === 1) return resolve(fetch)

    /**
     * 这里不自动处理isShowError, 因为post方法还是手动处理错误为好
     */
    const auth = new AuthHandle({ url, optional, response: fetch, resolve, reject: handleShowError })
    await auth.verify()
}

/**
 * @param {url, body} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
async function post(parameter, { resolve, reject }) {
    const url = `${config.origin}${parameter.url}`

    // reference: https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
    const optional = {
        method: 'POST',
        headers: optionalHeaders(),
        body: JSON.stringify(parameter.body)
    }

    const fetch = await fetchHandle(url, optional)
    if (fetch instanceof Error) {
        return reject(consequencer.error(fetch.message))
    }
    if (fetch.result === 1) return resolve(fetch)

    /**
     * 这里不自动处理isShowError, 因为post方法还是手动处理错误为好
     */
    const auth = new AuthHandle({ url, optional, response: fetch, resolve, reject })
    await auth.verify()
}

/**
 * 必定要成功的Get请求, 否则一直弹出Error
 * 目标: 保证 fetch 的数据一定 result === 1
 * @param {*} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
function reGetConfirm(parameter, { resolve, reject }) {
    let awaitStackInterval = { resolve: () => { }, reject: () => { } }
    const resolveHandle = data => {
        awaitStackInterval.resolve(data)
        resolve(data)
    }
    const rejectHandle = error => {
        awaitStackInterval.reject(error)
        reject(error)
    }
    const url = `${config.origin}${parameter.url}${utils.queryToUrl(parameter.query)}`
    const optional = { method: 'GET', headers: optionalHeaders() }

    const fetchInterval = async () => {
        const fetch = await fetchHandle(url, optional)
        if (fetch instanceof Error) {
            const confirmInstance = await await Confirm(`请求错误, 原因: ${fetch.message} \n 是否重新请求?`)
            if (confirmInstance.result !== 1) return rejectHandle(fetch.message)
            fetchInterval()
        }
        if (fetch.result !== 1) {
            const confirmInstance = await Confirm(`请求错误, 原因: ${fetch.message} \n 是否重新请求?`)
            if (confirmInstance.result !== 1) return rejectHandle(confirmInstance.message)
            fetchInterval()
        }

        resolveHandle(fetch)
    }

    return new Promise((awaitStackIntervalResolve, awaitStackIntervalReject) => {
        awaitStackInterval = { resolve: awaitStackIntervalResolve, reject: awaitStackIntervalReject }
        fetchInterval()
    }).catch(error => consequencer.error(`${error}`))
}

const AsyncFetch = {
    get: parameter => WaitStackInterval({ parameter, method: get }),
    post: parameter => WaitStackInterval({ parameter, method: post }),
    reGetConfirm: parameter => WaitStackInterval({ parameter, method: reGetConfirm })
}

export default AsyncFetch
