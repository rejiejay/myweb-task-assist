import SQLite from './module/SQLite/index.js';
import UnitTest from './unit-test/index.js';

const init = async () => {
    await SQLite.initDev()
    await UnitTest.all()
}

init()
