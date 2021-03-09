/**
 * Tencent Cloud Object Storage 对外方法:
 * @doc https://cloud.tencent.com/document/product/436
 * 
 * @instance Tencent Cloud Object Storage 的实例
 * @initialize 初始化方法
 */
import initDev from './initDev.js'
import initPro from './initPro.js'
import aciton from './aciton.js'

 const TencentCloudObjectStorage = {
    instance: {},
    aciton,
    initDev,
    initPro
}

export default TencentCloudObjectStorage
