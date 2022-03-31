/**
 * mysql 对外方法:
 * @doc https://github.com/sidorares/node-mysql2
 * 
 * @instantiate mysql 的实例
 * @initDev 初始化开发环境方法
 * @initPro 初始化开发环境方法
 */
import initPro from './initPro.js'
import initDev from './initDev.js'
import query from './query.js'

const mysql = {
    instantiate: {},

    initDev,

    initPro,

    query,
}

export default mysql
