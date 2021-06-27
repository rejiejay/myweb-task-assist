import initSqlJs from 'sql.js'
import consequencer from './../../utils/consequencer'

function init(filebuffer) {
    const self = this

    return new Promise((resolve, reject) => initSqlJs()
        .then(SQL => {
            const instantiate = !!filebuffer ? new SQL.Database(filebuffer) : new SQL.Database()
            self.db = instantiate
            resolve(consequencer.success(instantiate))
        })
        .catch(error => {
            console.error('initSqlJs error', error)
            reject(consequencer.error(`${error}`))
        }))
}

const SqliteJs = {
    db: {},
    init
}

export default SqliteJs