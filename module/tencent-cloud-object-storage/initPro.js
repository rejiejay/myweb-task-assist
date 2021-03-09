import COS from 'cos-nodejs-sdk-v5'
import STS from 'qcloud-cos-sts'

import config from './../../config'

const {
    secretId,
    secretKey,
    bucket,
    region,
    appId
} = config.TCOS

async function initPro() {
    const instance = new COS({ SecretId: secretId, SecretKey: secretKey })
    this.instance = instance
}

export default initPro