import mysql from 'mysql2'
import config from './../../config'

async function initDev() {
    try {
        this.instantiate = mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database,
        });
        console.log('connect mysql service successful!')
    } catch (error) {
        console.error('mysql connect error:');
        console.error(error);
    }
}

export default initDev
