import tcos from './index'
import config from './../../config'
import Log from './../Log'

const {
    secretId,
    secretKey,
    bucket,
    region,
    appId
} = config.TCOS

class Action {
    /**
     * 查询存储桶下的部分或者全部对象
     * @param {string} path 查看的路径 例如: website-station-system/diary-record/temporary/
     * @doc https://cloud.tencent.com/document/product/436/36119#.E6.9F.A5.E8.AF.A2.E5.AF.B9.E8.B1.A1.E5.88.97.E8.A1.A8
     */
    getBucket = path =>
        new Promise((resolve, reject) => {
            Log.pending('tcos.instance.getBucket: 查询存储桶下的部分或者全部对象')
            tcos.instance.getBucket({
                Bucket: bucket,
                Region: region,
                Prefix: path
            }, function (err, data) {
                if (err) {
                    Log.error(`tcos.instance.getBucket: ${JSON.stringify(err)}`)
                    return reject(err)
                }
                /**
                 * {
                 *    "Key": "a/3mb.zip",
                 *    "LastModified": "2018-10-18T07:08:03.000Z",
                 *    "ETag": "\"05a9a30179f3db7b63136f30aa6aacae-3\"",
                 *    "Size": "3145728",
                 *    "Owner": {
                 *        "ID": "1250000000",
                 *        "DisplayName": "1250000000"
                 *    },
                 *    "StorageClass": "STANDARD"
                 * }
                 */
                Log.success(`---> \ntcos.instance.getBucket: ${path}`)
                resolve(data.Contents.filter(content => +content.Size > 0))
            })
        }).catch(error => error);

    /**
     * 下载对象
     * @param {string} path 查看的路径 例如: website-station-system/diary-record/temporary/test.png
     * @doc https://cloud.tencent.com/document/product/436/36119#.E4.B8.8B.E8.BD.BD.E5.AF.B9.E8.B1.A1
     */
    getObject = path =>
        new Promise((resolve, reject) => {
            Log.pending('tcos.instance.getObject: 下载对象')
            tcos.instance.getObject({
                Bucket: bucket,
                Region: region,
                Key: path
            }, function (err, data) {
                if (err) {
                    Log.error(`tcos.instance.getObject: ${JSON.stringify(err)}`)
                    return reject(err)
                }
                /**
                 * 返回的文件内容，默认为 Buffer 形式
                 */
                Log.success(`---> \ntcos.instance.getObject: ${path}`)
                resolve(data.Body)
            })
        }).catch(error => error);

    /**
     * 简单上传对象
     * @param {string} path 查看的路径 例如: website-station-system/diary-record/temporary/test.png
     * @param {string} Body 上传文件的内容，可以为 FileStream、字符串、Buffer
     * @doc https://cloud.tencent.com/document/product/436/36119#.E4.B8.8B.E8.BD.BD.E5.AF.B9.E8.B1.A1
     */
    putObject = (path, Body) =>
        new Promise((resolve, reject) => {
            Log.pending('tcos.instance.putObject: 简单上传对象')
            tcos.instance.putObject({
                Bucket: bucket,
                Region: region,
                Key: path,
                Body
            }, function (err, data) {
                if (err) {
                    Log.error(`tcos.instance.putObject: ${JSON.stringify(err)}`)
                    return reject(err)
                }
                /**
                 * 请求成功时返回的对象，如果请求发生错误，则为空
                 */
                Log.success(`---> \ntcos.instance.putObject: ${path}`)
                resolve(data)
            })
        }).catch(error => error);

    /**
     * 删除多个对象
     * @param {string} paths 删除的路径 例如: [{ Key: 'website-station-system/diary-record/temporary/test.png' }]
     * @doc https://cloud.tencent.com/document/product/436/36119#.E4.B8.8B.E8.BD.BD.E5.AF.B9.E8.B1.A1
     */
    deleteMultipleObject = paths =>
        new Promise((resolve, reject) => {
            Log.pending('tcos.instance.deleteMultipleObject: 删除多个对象')
            tcos.instance.deleteMultipleObject({
                Bucket: bucket,
                Region: region,
                Objects: paths
            }, function (err, data) {
                if (err) {
                    Log.error(`tcos.instance.deleteMultipleObject: ${JSON.stringify(err)}`)
                    return reject(err)
                }
                Log.success(`---> \ntcos.instance.deleteMultipleObject: ${JSON.stringify(paths)}`)
                resolve(data)
            })
        }).catch(error => error);
}

export default new Action()