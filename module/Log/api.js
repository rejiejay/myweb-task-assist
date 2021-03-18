import instantiate from './instantiate.js'

const API = {
    success: message => instantiate(message, 'success'),
    error: message => instantiate(message, 'error'),
    pending: message => instantiate(message, 'pending'),
    debug: message => instantiate(message, 'debug'),
    watch: message => instantiate(message, 'watch')
}

export default API