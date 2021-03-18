import service from './../service/sql'
import SQLite from './../module/SQLite'

import utils from './utils'

const getSqliteJsFileBuffer = async responseHanle => {
    if (process.env.NODE_ENV !== 'production') return responseHanle.success({})

    let permissionInstance = {}
    try {
        permissionInstance = await service.getSqliteJsFileBuffer()
    } catch (error) {
        return responseHanle.failure(error)
    }

    responseHanle.json(permissionInstance)
}

const exportSqliteJsFileBuffer = async responseHanle => {
    if (process.env.NODE_ENV !== 'production') return responseHanle.success({})

    let permissionInstance = {}
    try {
        const binaryArray = SQLite.db.export()
        const arrayBuffer = binaryArray.buffer
        const buffer = Buffer.from(arrayBuffer)
        permissionInstance = await service.exportSqliteJsFileBuffer(buffer)
    } catch (error) {
        return responseHanle.failure(error)
    }

    responseHanle.json(permissionInstance)
}

const sql = {
    getSqliteJsFileBuffer: utils.resolveHandle(getSqliteJsFileBuffer, { isShowResult: false }),
    exportSqliteJsFileBuffer: utils.resolveHandle(exportSqliteJsFileBuffer, { isShowResult: false })
}

export default sql