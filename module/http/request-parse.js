import * as URL from 'url'

import valuesStructuresVerify from './../../utils/values-structures-verify'

const reqToParameter = async request => {
    let parameter = {}

    const url = URL.parse(request.url, true)
    const params = new URLSearchParams(url.search)
    for (const [name, value] of params) {
        parameter[name] = value
    }

    return new Promise(async (resolve, reject) => {
        if (request.method !== 'POST') return resolve(parameter)

        let body = [];

        request
            .on('data', chunk => body.push(chunk))
            .on('end', () => {

                try {
                    body = Buffer.concat(body).toString()
                } catch (error) {
                    return reject(error)
                }

                const values = valuesStructuresVerify.isJSONString(body, 'body')
                if (values instanceof Error) {
                    return reject(values)
                }

                resolve({
                    ...parameter,
                    ...values
                })
            })
            .on('error', error => reject(error))

    }).catch(error => error);
}

export default reqToParameter