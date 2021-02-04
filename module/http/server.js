import * as http from 'http'

import config from './../../config/index.js'
import requestHandle from './request-handle.js'

function init() {
    const server = http.createServer(requestHandle.bind(this))
    server.listen(config.http.port, config.http.host, () => console.log('create http service successful'))
}

const server = {
    isDev: false,
    init
}

export default server
