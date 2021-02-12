/**
 * WaitStackInterval: 高阶函数
 * 目标: 等待堆栈请求执行, 因为存在权限验证，所以这里需要顺序请求
 */
const requestCacheStack = [] // 请求的堆栈

/**
 * 含义: 是否正在处理请求堆栈
 * 作用: 保持请求顺序执行, 防止出现并发
 */
let isAsyncHandle = false

/**
 * 循环检测堆栈函数是否秩序完毕
 */
const verifyStackEffective = async () => {
    if (isAsyncHandle) return console.warn('Tip: Requests Asynchronous')
    if (requestCacheStack.length === 0) return /** 含义: 处理完成所有请求 */

    /** 含义: 开始处理请求 */
    const {
        method,
        parameter,
        resolve,
        reject
    } = requestCacheStack[0]
    isAsyncHandle = true
    await method(parameter, { resolve, reject })

    /** 含义: 表明处理完成 */
    isAsyncHandle = false
    requestCacheStack.shift()

    if (requestCacheStack.length > 0) {
        /** 含义: 判断是否需要继续处理 */
        verifyStackEffective()
    }
}

/**
 * 将推入处理请求堆栈中
 * @param {*} parameter 请求参数
 * @param {*} method 请求方法
 */
const WaitStackInterval = ({ parameter, method }) => new Promise((resolve, reject) => {
    requestCacheStack.push({
        parameter,
        method,
        resolve,
        reject
    })
    verifyStackEffective()
}).catch(error => error)

export default WaitStackInterval
