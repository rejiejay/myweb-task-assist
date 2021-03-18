import fse from 'fs-extra';

/**
 * 复制目录
 * @param {string} targetFolderPath 复制的目标文件夹目录
 * @param {string} renderFolderPath 渲染文件夹
 * @returns 
 */
const copyDirectory = (targetFolderPath, renderFolderPath) => new Promise((resolve, reject) => fse.copy(targetFolderPath, renderFolderPath, error => {
    if (error) return reject(new Error(error))
    resolve()
}))

/**
 * 异步渲染文件, 不管文件是否存在
 * @param {String} file 
 * @param {String | Buffer | Uint8Array} data 
 */
const outputFile = (file, data, options = {}) => new Promise((resolve, reject) => fse.outputFile(file, data, options, error => {
    if (error) return reject(new Error(error))
    resolve()
}))

/**
 * 异步新增文件JSON数据, 不管文件是否存在
 * @param {String} file
 * @param {object} data
 */
const accumulateJSON = (file, data = {}, options = {}) => new Promise(async (resolve, reject) => {
    const exists = await fse.pathExists(file)

    if (!exists) {
        await fse.outputFile(file, JSON.stringify(data), options)
        return resolve()
    }

    const current = await fse.readJson(file, options)
    const accumulate = {
        ...current,
        ...data
    }

    await fse.writeJson(file, accumulate, options)
})

const FilesHelper = {
    copyDirectory,
    outputFile,
    accumulateJSON
}

export default FilesHelper