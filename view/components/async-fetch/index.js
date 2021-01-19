/**
 * async-fetch 对外方法:
 * @get method
 * @post method
 * @reGetConfirm method This for must get successful
 */
import config from './../../configs/index.js'
import consequencer from './../../../utils/consequencer.js'
import toast from './../toast/index.js'

import WaitStackInterval from './wait-stack-interval.js'
import optionalHeaders from './optional-headers.js'
import authHandle from './auth-handle.js'
import utils from './utils.js'

/**
 * 注意: get方法不需要处理权限校验, 因为任务系统默认所有的get方法都可以被使用, 不需要注意隐私的问题, 所以此处不需要额外的处理
 * @param {*} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
function get(parameter, { resolve, reject }) {
    toast.show()

    const url = `${config.origin}${parameter.url}${utils.queryToUrl(parameter.query)}`

    // reference: https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
    const optional = {
        method: 'GET',
        headers: optionalHeaders()
    }

    /**
     * @param {awaitStackIntervalResolve, awaitStackIntervalReject} 执行 resolve, reject 函数表示此次请求执行完毕, 因为等待堆栈请求执行需要个信号表示此次请求结束, 所以在最后执行此函数推出此次循环
     */
    return new Promise((awaitStackIntervalResolve, awaitStackIntervalReject) => window.fetch(url, optional)
        .then(response => {
            toast.destroy()

            const data = response.json()
            awaitStackIntervalResolve()
            resolve(data)
        }).catch(error => {
            toast.destroy()

            awaitStackIntervalReject()
            reject(consequencer.error(error))
        }))
}

/**
 * @param {*} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
function post(parameter, { resolve, reject }) {
    toast.show()

    const url = `${config.origin}${parameter.url}`

    // reference: https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
    const optional = {
        method: 'POST',
        headers: optionalHeaders(),
        body: JSON.stringify(parameter.body)
    }

    /**
     * @param {awaitStackIntervalResolve, awaitStackIntervalReject} 执行 resolve, reject 函数表示此次请求执行完毕, 因为等待堆栈请求执行需要个信号表示此次请求结束, 所以在最后执行此函数推出此次循环
     */
    return new Promise((awaitStackIntervalResolve, awaitStackIntervalReject) => window.fetch(url, optional)
        .then(response => {
            const data = response.json()
            const resolveHandle = value => {
                toast.destroy()
                awaitStackIntervalResolve(value)
                resolve(value)
            }
            const rejectHandle = error => {
                toast.destroy()
                awaitStackIntervalReject(error)
                reject(error)
            }
            authHandle({
                url,
                optional,
                response: data,
                resolve: resolveHandle,
                reject: rejectHandle
            })
        }).catch(error => {
            toast.destroy()

            awaitStackIntervalRequest.reject()
            reject(consequencer.error(error))
        }))
}


/**
 * TODO: 暂时不管
 * @param {*} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
function reGetConfirm(parameter, awaitStackIntervalRequest) {
    return new Promise((resolve, reject) => { })
}

const AsyncFetch = {
    /**
     * @parameter.url {sring} /task/list
     * @parameter.query {object}
     */
    get: parameter => WaitStackInterval({ parameter, method: get }),
    /**
     * @parameter.url {sring} /task/list
     * @parameter.body {object}
     */
    post: parameter => WaitStackInterval({ parameter, method: post }),
    reGetConfirm: parameter => WaitStackInterval({ parameter, method: reGetConfirm })
}

export default AsyncFetch
