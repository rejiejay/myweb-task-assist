/**
 * config对外object
 */
import auth from './../../config/auth'
import http from './../../config/http'

import development from './development.js'
import production from './production.js'

let config = {
    origin: `http://${http.host}:${http.port}/`,
    auth,
    libraryProfixUrl: '/'
}

if (process.env === 'development') config = { ...config, ...development }
if (process.env === 'production') config = { ...config, ...production }

export default config