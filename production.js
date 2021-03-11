/**
 * 开发环境
 */
import HTTP from './module/http';
import SQLite from './module/SQLite/index.js';
import TencentCloudObjectStorage from './module/tencent-cloud-object-storage/index';

const init = async () => {
    try {
        await TencentCloudObjectStorage.initPro()
    } catch (error) {
        return console.error(error)
    }

    // 启动Web代理API接口
    try {
        await HTTP.initPro()
    } catch (error) {
        return console.error(error)
    }

    // 初始化SqliteJs
    try {
        await SQLite.initPro()
    } catch (error) {
        return console.error(error)
    }
}

init()
