import * as fs from 'fs';

import SqliteJs from './sqlitejs.instantiate.js'
import localDatabaseSqlite from './local.database.sqlite.js'

async function initDev(useLocalData = false) {
    const self = this
    let filebuffer = null

    if (useLocalData) {
        try {
            filebuffer = fs.readFileSync('./module/SQLite/temporary.database.sqlite')
        } catch (error) {
            console.log('can`t readFile temporary.database.sqlite', error)
        }
    }

    const initInstance = await SqliteJs.init(filebuffer)
    if (initInstance.result !== 1) return initInstance
    const instantiate = initInstance.data
    self.db = instantiate

    if (!!filebuffer) {
        console.log('create SQLite service successful')
        return initInstance
    }

    localDatabaseSqlite.init(instantiate)
    console.log('create SQLite service successful')

    return initInstance
}

export default initDev
