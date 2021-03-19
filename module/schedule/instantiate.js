import schedule from 'node-schedule'
import sqlitejsBackup from './sqlitejs-backup'
import clearLog from './clear-log'

const init = () => {
    schedule.scheduleJob('23 2 * * *', sqlitejsBackup)
    schedule.scheduleJob('23 3 * * *', clearLog)
}

export default init