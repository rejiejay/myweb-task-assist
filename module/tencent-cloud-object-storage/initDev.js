import COS from 'cos-nodejs-sdk-v5'
import request from 'request'

function initDev() {
    const instance = new COS({
        getAuthorization: function(options, callback) {
            // 异步获取临时密钥
            request({
                url: 'https://example.com/sts',
                data: {
                    // 可从 options 取需要的参数
                }
            }, function(err, response, body) {
                try {
                    var data = JSON.parse(body);
                    var credentials = data.credentials;
                } catch (e) {
                    return console.error(`credentials invalid: ${e}`)
                }

                if (!data || !credentials) {
                    return  console.error('credentials invalid')
                }
                callback({
                    TmpSecretId: credentials.tmpSecretId, // 临时密钥的 tmpSecretId
                    TmpSecretKey: credentials.tmpSecretKey, // 临时密钥的 tmpSecretKey
                    XCosSecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
                    ExpiredTime: data.expiredTime, // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
                })
                resolve()
            })
        }
    })

    this.instance = instance
}

export default initDev