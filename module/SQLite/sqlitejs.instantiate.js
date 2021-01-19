import initSqlJs from 'sql-wasm';

function init(filebuffer) {
    const self = this

    return new Promise((resolve, reject) => initSqlJs()
        .then(SQL => {
            if (!!filebuffer) self.db = new SQL.Database(filebuffer)
            if (!filebuffer) self.db = new SQL.Database()
            resolve()
        }).catch(error => console.error('initSqlJs error', error)))
}

const SqliteJs = {
    db: {},
    init
}

export default SqliteJs