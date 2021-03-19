/**
 * 开发环境
 */
import HTTP from './module/http';
import SQLite from './module/SQLite/index.js';
import TencentCloudObjectStorage from './module/tencent-cloud-object-storage/index';
import Schedule from './module/schedule';
import Log from './module/Log';

const init = async() => {
    try {
        await TencentCloudObjectStorage.initPro()
    } catch (error) {
        return Log.error(JSON.stringify(error))
    }

    // 启动Web代理API接口
    try {
        await HTTP.initPro()
    } catch (error) {
        return Log.error(JSON.stringify(error))
    }

    // 初始化SqliteJs
    try {
        await SQLite.initPro()
    } catch (error) {
        return Log.error(JSON.stringify(error))
    }

    // 初始化定时器
    try {
        await Schedule.init()
    } catch (error) {
        return Log.error(JSON.stringify(error))
    }
}

init()