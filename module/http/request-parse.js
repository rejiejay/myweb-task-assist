import * as URL from 'url'

import valuesStructuresVerify from './../../utils/values-structures-verify'
import consequencer from './../../utils/consequencer'

const reqToParameter = async request => {
    let parameter = {}

    const url = URL.parse(request.url, true)
    const params = new URLSearchParams(url.search)
    for (const [name, value] of params) {
        parameter[name] = value
    }

    return new Promise(async (resolve, reject) => {
        if (request.method !== 'POST') return resolve(consequencer.success(parameter))

        let body = [];

        request
            .on('data', chunk => body.push(chunk))
            .on('end', () => {

                try {
                    body = Buffer.concat(body).toString()
                } catch (error) {
                    return reject(consequencer.error(`${error}`))
                }

                const verifyInstance = valuesStructuresVerify.isJSONString(body)
                const values = verifyInstance.data

                resolve(consequencer.success({
                    ...parameter,
                    ...values
                }))
            })
            .on('error', error => reject(consequencer.error(`${error}`)))

    }).catch(error => error);
}

export default reqToParameter