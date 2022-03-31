import Log from './../Log'

function query(sql, placeholder = []) {
    const instantiate = this.instantiate;

    if (!instantiate.query) {
        const msg = 'mysql connect is not instantiate, please check!'
        Log.error(msg)
        return new Error(msg)
    }

    return new Promise(
        (resolve, reject) => instantiate.query(sql, placeholder, function (error, results, fields) {
            if (error) {
                const msg = `mysql.query.error: ${JSON.stringify(error)}`
                Log.error(msg)
                return reject(new Error(msg));
            }

            Log.success(`mysql.query.success: ${sql}`)
            resolve(results);
        })
    ).catch(error => error)
}

export default query
