/**
 * 开发环境
 */
import HTTP from './module/http';
import SQLite from './module/SQLite/index.js';
import TencentCloudObjectStorage from './module/tencent-cloud-object-storage/index';

const init = async () => {
    TencentCloudObjectStorage.initPro()

    // 启动Web代理API接口
    HTTP.initPro()

    // 初始化SqliteJs
    SQLite.initPro()
}

init()
