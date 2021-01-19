import SQLite from './../module/SQLite/index.js'

const getList = function getList() {
    const result = SQLite.db.exec(`SELECT * FROM task`);
    return result
}

const task = {
    getList
}

export default task
