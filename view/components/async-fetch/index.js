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
 * 注意: get方法不需要处理权限校验, 因为任务系统默认所有的get方法都可以被使用, 不需要注意隐私的问题, 所以此处不需要额外的处理
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

    const fetchInstance = await fetchHandle(url, optional)
    if (fetchInstance.result !== 1) return reject(fetchInstance)
    const data = fetchInstance.data

    if (parameter.isShowError && data.result !== 1) {
        await Confirm(data.message)
        return reject(data)
    }

    resolve(data)
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

    const fetchInstance = await fetchHandle(url, optional)
    if (fetchInstance.result !== 1) return reject(fetchInstance)
    const data = fetchInstance.data

    if (data.result === 1) return resolve(data)

    /**
     * 这里不自动处理isShowError, 因为post方法还是手动处理错误为好
     */
    const auth = new AuthHandle({ url, optional, response: data, resolve, reject })
    auth.verify()
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
        const fetchInstance = await fetchHandle(url, optional)
        if (fetchInstance.result !== 1) {
            const confirmInstance = await await Confirm(`请求错误, 原因: ${fetchInstance.message} \n 是否重新请求?`)
            if (confirmInstance.result !== 1) return rejectHandle(fetchInstance.message)
            fetchInterval()
        }
        const data = fetchInstance.data
        if (data.result !== 1) {
            const confirmInstance = await Confirm(`请求错误, 原因: ${data.message} \n 是否重新请求?`)
            if (confirmInstance.result !== 1) return rejectHandle(confirmInstance.message)
            fetchInterval()
        }

        resolveHandle(data)
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
