/**
 * async-fetch 对外方法:
 * @get method
 * @post method
 * @reGetConfirm method This for must get successful
 */
import consequencer from './../../../utils/consequencer'
import config from './../../configs/index.js'
import toast from './../toast/index.js'
import Confirm from './../confirm'

import WaitStackInterval from './wait-stack-interval.js'
import optionalHeaders from './optional-headers.js'
import authHandle from './auth-handle.js'
import utils from './utils.js'

/**
 * 注意: get方法不需要处理权限校验, 因为任务系统默认所有的get方法都可以被使用, 不需要注意隐私的问题, 所以此处不需要额外的处理
 * @param {url, query, isShowError} parameter 请求参数
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
    return new Promise((awaitStackIntervalResolve, awaitStackIntervalReject) => {
        const resolveHandle = data => {
            toast.destroy()
            awaitStackIntervalResolve(data)
            resolve(data)
        }
        const rejectHandle = error => {
            toast.destroy()
            awaitStackIntervalReject(error)
            reject(error)
        }
        window.fetch(url, optional)
            .then(response => response.json())
            .then(async data => {
                if (parameter.isShowError && data.result !== 1) {
                    await Confirm(data.message)
                    return rejectHandle(data)
                }

                resolveHandle(data)
            }).catch(error => rejectHandle(error))
    }).catch(error => consequencer.error(`${error}`))
}

/**
 * @param {url, body} parameter 请求参数
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
    return new Promise((awaitStackIntervalResolve, awaitStackIntervalReject) => {
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
        window.fetch(url, optional)
            .then(response => response.json())
            .then(data => {
                /**
                 * 这里不自动处理isShowError, 因为post方法还是手动处理错误为好
                 */
                authHandle({
                    url,
                    optional,
                    response: data,
                    resolve: resolveHandle,
                    reject: rejectHandle
                })
            }).catch(error => rejectHandle(error))
    }).catch(error => consequencer.error(`${error}`))
}


/**
 * 必定要成功的Get请求, 否则一直弹出Error
 * 目标: 保证 fetch 的数据一定 result === 1
 * @param {*} parameter 请求参数
 * @param {resolve, reject} promise 返回结果的方法
 */
function reGetConfirm(parameter, { resolve, reject }) {
    let awaitStackInterval = { resolve: () => {}, reject: () => {} }
    const resolveHandle = data => {
        toast.destroy()
        awaitStackInterval.resolve(data)
        resolve(data)
    }
    const rejectHandle = error => {
        toast.destroy()
        awaitStackInterval.reject(error)
        reject(error)
    }
    const url = `${config.origin}${parameter.url}${utils.queryToUrl(parameter.query)}`
    const optional = { method: 'GET', headers: optionalHeaders() }

    const fetch = () => {
        toast.show()
        window.fetch(url, optional)
        .then(
            response => response.json(),
            error => consequencer.error(error)
        )
        .then(async data => {
            if (data.result !== 1) {
                toast.destroy()
                const confirmInstance = await Confirm(`请求错误, 原因: ${data.message} \n 是否重新请求?`)
                if (confirmInstance.result !== 1) return rejectHandle(confirmInstance.message)
                fetch()
            }

            resolveHandle(data)
        }).catch(async error => {
            toast.destroy()
            const confirmInstance = await await Confirm(`请求错误, 原因: ${error} \n 是否重新请求?`)
            if (confirmInstance.result !== 1) return rejectHandle(error)
            fetch()
        })
    }

    return new Promise((awaitStackIntervalResolve, awaitStackIntervalReject) => {
        awaitStackInterval = { resolve: awaitStackIntervalResolve, reject: awaitStackIntervalReject }
        fetch()
    }).catch(error => consequencer.error(`${error}`))
}

const AsyncFetch = {
    get: parameter => WaitStackInterval({ parameter, method: get }),
    post: parameter => WaitStackInterval({ parameter, method: post }),
    reGetConfirm: parameter => WaitStackInterval({ parameter, method: reGetConfirm })
}

export default AsyncFetch
