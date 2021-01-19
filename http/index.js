/**
 * http对外方法:
 * @initDev 客户端兼服务端 开发环境 初始化方法
 * @renderWebResource 渲染客户端 资源 方法 生产环境
 * @initPro 客户端兼服务端 生产环境 初始化方法
 */
import resource from './resource.js'
import server from './server.js'

const HTTP = {
    initDev: () => {
        resource.buildLibrary()

        server.isDev = true
        server.init()
    },
    renderWebResource: async () => { }, // TODO
    initPro: () => server.init() // TODO
}

export default HTTP
