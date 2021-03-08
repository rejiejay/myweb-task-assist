/**
 * http对外方法:
 * @initDev 客户端兼服务端 开发环境 初始化方法
 * @renderWebResource 渲染客户端 资源 方法 生产环境
 * @initPro 客户端兼服务端 生产环境 初始化方法
 */
import Resource from './resource.js'
import server from './server.js'
import config from './../../config/index'

async function initDev() {
    Resource.buildLibrary()

    server.isDev = true
    server.init()
}

function renderWebResource() {
    Resource.buildLibrary()
    const isDev = false

    Object.keys(config.resource).forEach(page => {
        const resourcePath = config.resource[page].resourcePath
        const outputPath = config.resource[page].outputPath
        const resource = new Resource({}, {}, isDev)
        resource.initPath(resourcePath, outputPath)
        resource.buildConfigured()
    })
}

async function initPro() {
    server.isDev = false
    server.init()
}


const HTTP = {
    initDev,
    renderWebResource,
    initPro
}

export default HTTP
