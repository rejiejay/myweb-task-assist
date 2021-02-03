
import consequencer from './../utils/consequencer'
import config from './../config'

const authHandle = async request => {
    const { headers, method } = request

    return new Promise(async (resolve, reject) => {
        if (request.method !== 'POST') return resolve(consequencer.success())

        const token = headers[config.auth.headerToken]
        if (!token) reject(consequencer.error(config.auth.unauthorized.code, config.auth.unauthorized.message))

        resolve(consequencer.success())
        reject(consequencer.error(`${error}`))
    }).catch(error => error)
}

export default authHandle