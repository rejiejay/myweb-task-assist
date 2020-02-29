import toast from './toast.js';
import {
    inputPopUp,
    inputPopUpDestroy
} from './input-popup.js';

const config = {
    origin: process.env === 'development' ? 'http://localhost:1932/' : '/task-server/',
    deniedCode: 5703,
    expiredCode: 5704,
    authFailed: 5788,
}

/**
 * 含义: 缓存请求参数
 * 作用: 用于未授权的二次请求
 */
let requestCache = {
    method: 'get', // get post
    parameter: null,
    /**
     * 含义: 请求次数
     * 作用: 防止无限次循环调用
     */
    count: 1,
}

const initHeaders = () => {
    const token = localStorage.getItem('rejiejay-task-assist-token')
    const headers = {
        "Content-Type": 'application/json; charset=utf-8'
    }

    token ? headers['task-assist-token'] = token : null

    return headers
}

const queryToUrl = query => {
    if (!query) return ''

    const keys = Object.keys(query)
    if (keys.length <= 0) return ''

    let url = '?'
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index]
        const value = query[key]
        url += `${key}=${value}`
        url += index !== (keys.length - 1) ? '&' : ''
    }

    return url
}

const responseHandle = ({
    res,
    resolve,
    reject
}) => {
    if (!res) return errorHandle({
        result: 455,
        message: '数据为空'
    }, reject);

    // 未授权
    if (res.result === config.deniedCode) return unAuthHandle(resolve, reject);

    // 过期
    if (res.result === config.expiredCode) return expiredAuthHandle(resolve, reject, '服务器返回凭证过期, 执行过期流程;');

    // 授权失败
    if (res.result === config.authFailed) {
        toast.destroy()
        toast.show(`授权失败, ${res.message}`)
        return reject(res)
    }

    // 不判断 结果
    toast.destroy()
    if (instance.notHandleResult) return resolve(res)

    res.result === 1 ? resolve(res) : errorHandle(res, reject)
}

const errorHandle = (result, reject) => {
    toast.destroy()

    instance.hiddenError ? '' : toast.show(result.message)

    reject(result)
}

/**
 * 作用: 处理未授权
 */
const unAuthHandle = (resolve, reject) => {
    /**
     * 含义: 仅重复校验一次(校验凭证合法性)
     */
    if (requestCache.count > 1) {
        toast.destroy()
        return reject({
            result: 7593,
            data: null,
            message: '处理未授权次数过多'
        })
    };

    console.log('登录未授权, 进入处理流程;');
    /**
     * 未授权 = 从未登录;
     * 过期 = 一定登录过(至少一次);
     * 区别在于密码; 过期密码一定正确; 未授权密码可能正确;
     */
    const token = localStorage.getItem('rejiejay-task-assist-token')
    console.log('获取本地token:', token);

    /**
     * 含义: 本地不存在凭证
     * 结论: 执行过期流程
     */
    if (!token || token === 'null') return expiredAuthHandle(resolve, reject, '本地不存在凭证, 执行过期流程;')

    /**
     * 含义: 校验凭证合法性
     */
    console.log(`校验凭证${token}的合法性;`);
    instance.get({
        url: 'user/verify',
        query: {
            verify: token
        }
    }).then(res => {
        console.log(`成功校验凭证!!`);
        /**
         * 含义: 凭证是合法的
         * 结论: 再次请求
         * 有可能刷新授权
         */
        const token = res.data
        localStorage.setItem('rejiejay-task-assist-token', token)

        requestCache.count++
        // 并发
        window.setTimeout(() => {
            instance.request(requestCache.method, requestCache.parameter, resolve, reject)
        }, 500)
    }, error => {
        /**
         * 含义: 校验凭证失败, 也许是网络问题
         */
        if (error.result === config.authFailed) {
            // token错误, 进入过期流程
            expiredAuthHandle(resolve, reject, `校验凭证${token}的合法性失败, 进入过期流程;`)
        } else {
            reject({
                result: 4532,
                data: null,
                message: `校验凭证失败, ${error}`
            })
        }
    })
}

/**
 * 含义: 密码重新登录
 */
const reAuthPassword = ({
    password,
    resolve,
    reject,
    isEnterPassword
}) => {
    console.log('开始再次授权流程;');

    toast.destroy()
    window.fetch(`${config.origin}user/login?name=rejiejay&password=${password}`, {
        method: 'GET',
        headers: initHeaders()
    }).then(response => response.json(), error => ({
        result: 233,
        data: null,
        message: error
    })).then(({
        data
    }) => {
        console.log('再次授权成功:', data);

        localStorage.setItem('rejiejay-task-assist-token', data)
        localStorage.setItem('rejiejay-task-assist-password', password)

        /**
         * 含义: 判断是否正在输入密码情况
         * 原因: 输入密码的情况, 不需要执行缓存请求
         */
        if (isEnterPassword) inputPopUpDestroy();
        requestCache.count++

        window.setTimeout(() => {
            instance.request(requestCache.method, requestCache.parameter, resolve, reject)
        }, 500)

    }, error => reject({
        result: 4532,
        data: null,
        message: error
    })).catch(error => reject({
        result: 4532,
        data: null,
        message: error
    }))
}

/**
 * 作用: 处理过期
 */
const expiredAuthHandle = (resolve, reject, handleDescription) => {
    /**
     * 含义: 仅重复校验一次(校验凭证合法性)
     */
    if (requestCache.count > 1) {
        toast.destroy()
        return reject({
            result: 7593,
            data: null,
            message: '处理过期次数过多'
        })
    };

    console.log(handleDescription);

    const password = localStorage.getItem('rejiejay-task-assist-password')
    console.log('检验缓存密码', password);

    /**
     * 含义: 本地密码过期 或者 失效
     */
    if (!password) return reEnterPassword(resolve, reject);

    console.log('缓存密码检验成功, 进入再次授权流程;');
    reAuthPassword({
        password,
        resolve,
        reject
    })
}

const reEnterPassword = async (resolve, reject) => {
    console.log('本地缓存密码已经失效, 开始重新输入密码;');
    toast.destroy()

    const handle = await inputPopUp({
        title: '密码过期, 请重新输入密码?',
        mustInput: true
    })

    if (handle.result !== 1) return
    reAuthPassword({
        password: input,
        resolve,
        reject,
        isEnterPassword: true
    })
}

const instance = {
    hiddenError: false,
    notHandleResult: false,

    get: function get({
        url,
        query,
        hiddenError,
        notHandleResult
    }) {
        this.hiddenError = hiddenError ? true : false
        this.notHandleResult = notHandleResult ? true : false

        let myUrl = `${config.origin}${url}`
        myUrl += queryToUrl(query)

        toast.show()

        return new Promise((resolve, reject) => window.fetch(myUrl, {
            method: 'GET',
            headers: initHeaders()
        }).then(response => response.json(), error => ({
            result: 233,
            data: null,
            message: error
        })).then(response => responseHandle({
            res: response,
            resolve: resolve,
            reject: reject
        }), error => errorHandle(error, reject)).catch(error => errorHandle({
            result: 344,
            message: error
        }, reject)))
    },

    post: function post({
        url,
        body,
        hiddenError,
        notHandleResult
    }) {
        this.hiddenError = hiddenError ? true : false
        this.notHandleResult = notHandleResult ? true : false

        let myUrl = `${config.origin}${url}`

        toast.show()
        return new Promise((resolve, reject) => window.fetch(myUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: initHeaders()
        }).then(response => response.json(), error => ({
            result: 233,
            data: null,
            message: error
        })).then(response => responseHandle({
            res: response,
            resolve: resolve,
            reject: reject
        }), error => errorHandle(error, reject)).catch(error => errorHandle({
            result: 344,
            message: error
        }, reject)))
    },

    /**
     * 含义: 服务于授权和过期流程的请求
     */
    request: (method, parameter, resolve, reject) => {
        toast.show()

        let myUrl = `${config.origin}${parameter.url}`

        if (method === 'get') myUrl += queryToUrl(parameter.query)

        let requestConfig = {
            method: method.toLocaleUpperCase(),
            headers: initHeaders()
        }
        if (method === 'post') requestConfig.body = parameter.body

        window.fetch(myUrl, requestConfig).then(
            response => response.json(),
            error => ({
                result: 233,
                data: null,
                message: error
            })
        ).then(response => {
            toast.destroy()
            if (!response) return reject('数据为空')

            // 不判断 结果
            if (parameter.notHandleResult) return resolve(response)

            response.result === 1 ? resolve(res) : reject('授权缘故, 数据有误')
        }, error => {
            toast.destroy()
            reject(error)
        }).catch(error => {
            toast.destroy()
            reject(error)
        })
    }
}

const fetch = {
    post: parameter => {
        requestCache.method = 'post'
        requestCache.parameter = parameter
        requestCache.count = 1

        return instance.post(parameter)
    },
    get: parameter => {
        requestCache.method = 'get'
        requestCache.parameter = parameter
        requestCache.count = 1

        return instance.get(parameter)
    }
}

export default fetch