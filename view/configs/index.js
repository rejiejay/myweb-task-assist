/**
 * config对外object
 */
import development from './development.js'
import production from './production.js'

let config = {
    origin: 'http://localhost:1938/'
}

if (process.env === 'development') config = { ...config, ...development }
if (process.env === 'production') config = { ...config, ...production }

export default config