/**
 * Log 对外方法:
 * 
 * @instantiate Log 的实例
 */
import instantiate from './instantiate.js'
import api from './api.js'

const Log = {
    instantiate,
    success: api.success,
    error: api.error,
    pending: api.pending,
    debug: api.debug,
    watch: api.watch
}

export default Log