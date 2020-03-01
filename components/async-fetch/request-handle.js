import consequencer from './../../utils/consequencer.js';

import toast from './../toast.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './../input-popup.js';

import config from './config.js';
import initHeaders from './headers.js';
import queryToUrl from './url-handle.js';

import {
    unAuthHandle,
    expiredAuthHandle
} from './auth-handle.js';

/** 
 * 含义: 堆栈请求的Promise
 * 注意: 因为解决了并发问题; 所以当前值一定是唯一的
 */
export let asyncResolve = null
export let asyncReject = null

/** 
 * 含义: 当前的Promise
 * 注意: 因为解决了并发问题; 所以当前值一定是唯一的
 */
export let requestResolve = null
export let requestReject = null

export let hiddenError = false
export let notHandleResult = false

export const requestHandle = ({
    method,
    parameter,
    resolve,
    reject
}) => {
    asyncResolve = resolve
    asyncReject = reject

    hiddenError = parameter.hiddenError ? true : false
    notHandleResult = parameter.notHandleResult ? true : false

    let requestConfig = {
        method: method.toLocaleUpperCase(),
        headers: initHeaders()
    }
    let myUrl = `${config.origin}${url}`
    if (method === 'get') myUrl += queryToUrl(parameter.query)
    if (method === 'post') requestConfig.body = parameter.body

    toast.show()

    return new Promise((resolve, reject) => {
        requestResolve = resolve;
        requestReject = reject;

        window.fetch(myUrl, requestConfig).then(
            response => response.json(),
            error => consequencer.error(error)
        ).then(
            response => responseHandle(response),
            error => errorHandle(error)
        ).catch(
            error => errorHandle(consequencer.error(error))
        )
    })
}

export const responseHandle = response => {
    if (!response) return errorHandle(consequencer.error('数据格式不正确, 数据为空!'))
    if (response.result === config.deniedCode) return unAuthHandle();
    if (response.result === config.expiredCode) return expiredAuthHandle();
    if (response.result === config.authFailed) {
        hiddenError = false; /** 含义: 强制弹出提示 */
        return errorHandle(consequencer.error('授权失败, 不存在用户;'));
    }

    if (notHandleResult || response.result === 1) {
        /** 含义: 不自动处理错误 */
        asyncResolve(response)
        requestResolve(response)
    } else {
        errorHandle(response)
    }
}

export const errorHandle = result => {
    toast.destroy()

    hiddenError ? '' : toast.show(result.message)

    asyncReject(result) /** 顺序: 优先返回请求数据, 再处理堆栈 */
    requestReject(result)
}