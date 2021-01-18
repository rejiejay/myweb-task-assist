import initSqlJs from 'sql-wasm.js';

function init(filebuffer) {
    const self = this

    return new Promise((resolve, reject) => initSqlJs()
        .then(SQL => {
            self.db = new SQL.Database(filebuffer);
            resolve()
        }))
}

const SqliteJs = {
    db: {},
    init
}

export default SqliteJs