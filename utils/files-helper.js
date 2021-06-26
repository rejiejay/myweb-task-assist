// https://github.com/jprichardson/node-fs-extra
import * as fs from 'fs';
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
})).catch(error => error);

/**
 * 异步渲染文件, 不管文件是否存在
 * @param {String} file 
 * @param {String | Buffer | Uint8Array} data 
 */
const outputFile = (file, data, options = {}) => new Promise((resolve, reject) => fse.outputFile(file, data, options, error => {
    if (error) return reject(new Error(error))
    resolve()
})).catch(error => error);

/**
 * 异步新增文件数据, 不管文件是否存在
 * @param {String} file
 * @param {object} data
 */
const accumulateText = (file, data = '', options = {}) => new Promise(async (resolve, reject) => {
    const exists = await fse.pathExists(file)

    if (!exists) {
        await outputFile(file, `${data}`, options)
        return resolve()
    }

    const render = async content => {
        try {
            await outputFile(file, `${content}\n${data}`, options)
            return resolve()
        } catch (error) {
            reject(new Error(error))
        }
    }

    fs.readFile(file, 'utf8', (readFileError, content) => {
        if (readFileError) return reject(new Error(readFileError))
        render(content)
    })
}).catch(error => error);

/**
 * 判断是否是文件
 * @param {String} path
 */
const isFilePath = path => new Promise(async (resolve, reject) => {
    const lstat = fse.lstatSync(path)

    if (lstat.isDirectory()) {
        return reject(new Error(`path: "${path}" is not file path`))
    }
    const exists = await fse.pathExists(path)

    if (!exists && !lstat.isFile()) {
        return reject(new Error(`path: "${path}" is not exists`))
    }

    resolve();
}).catch(error => error);

const FilesHelper = {
    copyDirectory,
    outputFile,
    accumulateText,
    isFilePath
}

export default FilesHelper