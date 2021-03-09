import consequencer from './../utils/consequencer'
import TencentCloudObjectStorage from './../module/tencent-cloud-object-storage'

const path = 'website-station-system/sqlite-task'

const getSqliteJsFileBuffer = async function getSqliteJsFileBuffer() {
    let allFiles = []
    let latestFileBuffer = Buffer.from('', 'utf8')
    try {
        allFiles = await TencentCloudObjectStorage.aciton.getBucket(path)
    } catch (error) {
        return consequencer.error(error)
    }

    if (allFiles.length <= 0) return consequencer.error('数据为空')

    const latestFileName = allFiles.reduce((fileName, { Key }) => {
        const thisFileName = Key.replace(`${path}/`, '')
        if (!fileName) return thisFileName
        if (+thisFileName > +fileName) return thisFileName
        return fileName
    }, '')

    try {
        latestFileBuffer = await TencentCloudObjectStorage.aciton.getObject(`${path}/${latestFileName}`)
    } catch (error) {
        return consequencer.error(error)
    }

    return consequencer.success(latestFileBuffer)
}

const exportSqliteJsFileBuffer = async function exportSqliteJsFileBuffer(fileBuffer) {
    const nowTimestamp = new Date().getTime()
    const expiredimestamp = new Date().getTime() - (1000 * 60 * 60 * 24 * 30) // 30天过期
    let allFiles = []
    try {
        allFiles = await TencentCloudObjectStorage.aciton.getBucket()
    } catch (error) {
        return consequencer.error(error)
    }

    const deleteFiles = allFiles.reduce((files, { Key }) => {
        const thisFileName = Key.replace(`${path}/`, '')

        if (+thisFileName < expiredimestamp) files.push({ Key })
        return files
    }, [])

    if (deleteFiles.length > 0) {
        try {
            await TencentCloudObjectStorage.aciton.deleteMultipleObject(deleteFiles)
        } catch (error) {
            return consequencer.error(error)
        }
    }

    try {
        await TencentCloudObjectStorage.aciton.putObject(`${path}/${nowTimestamp}`, fileBuffer)
    } catch (error) {
        return consequencer.error(error)
    }

    return consequencer.success()
}

const sql = {
    getSqliteJsFileBuffer,
    exportSqliteJsFileBuffer
}

export default sql
