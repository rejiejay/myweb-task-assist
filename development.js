/**
 * 开发环境
 * TODO:
 * Web代理
 * 页面Dev渲染
 * API接口
 */
import HTTP from './module/http/index.js';
import SQLite from './module/SQLite/index.js';

const init = async () => {
    try {
        await SQLite.initDev(false)
    } catch (error) {
        return console.error(error)
    }

    try {
        await HTTP.initDev()
    } catch (error) {
        return console.error(error)
    }
}

init()