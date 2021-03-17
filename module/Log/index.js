/**
 * Log 对外方法:
 * @doc https://github.com/klaussinani/signale/blob/master/docs/readme.zh_CN.md
 * 
 * @instantiate Log 的实例
 */
import instantiate from './instantiate.js'
import api from './api.js'

const Log = {
    instantiate,
    ...api
}

export default Log