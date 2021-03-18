import SQLite from './module/SQLite/index.js';
// import Log from './module/Log';
import TencentCloudObjectStorage from './module/tencent-cloud-object-storage/index';
import UnitTest from './unit-test/index.js';

const init = async () => {
    try {
        await SQLite.initDev()
    } catch (error) {
        return console.error(error)
    }

    TencentCloudObjectStorage.initDev()
    await UnitTest.all()
}

init()
