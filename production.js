/**
 * 开发环境
 * TODO:
 * 页面Pro渲染
 * Web代理
 * API接口
 */
import HTTP from './module/http';
import SQLite from './module/SQLite/index.js';

const init = async () => {
    // 页面Pro渲染
    await HTTP.renderWebResource()

    // 启动Web代理API接口
    HTTP.initPro()

    // 初始化SqliteJs
    SQLite.initPro()
}

init()
