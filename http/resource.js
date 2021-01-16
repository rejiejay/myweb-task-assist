import * as fs from 'fs';
import less from 'less';
import * as webpack from 'webpack';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import config from './../config/index.js'
import { projectRelativePath } from './../utils/path-handle.js';
import consequencer from './../utils/consequencer.js'

class ResourcesUtils {
    constructor() {
        this.mineTypeMap = { html: 'text/html;charset=utf-8', htm: 'text/html;charset=utf-8', xml: "text/xml;charset=utf-8", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", css: "text/css;charset=utf-8", txt: "text/plain;charset=utf-8", mp3: "audio/mpeg", mp4: "video/mp4", ico: "image/x-icon", tif: "image/tiff", svg: "image/svg+xml", zip: "application/zip", ttf: "font/ttf", woff: "font/woff", woff2: "font/woff2" }
    }

    getMineType() { }

    initUrlCatch() {
        const slef = this
        const { view } = config.resource
        const { url } = this.request
        let isStatic
        let isConfigured

        Object.keys(view).forEach(page => {
            if (url === view[page].matchURL) {
                isStatic = true // 如果符合配置页面，那么必然 true
                isConfigured = true

                slef.resourcePath = view[page].resourcePath
                slef.outputPath = view[page].outputPath
            }
        })

        if (isConfigured) return { isStatic, isConfigured }

        /**
         * 判断是否存在资源  isStatic = true
         * TODO
         */
        const resourcePath = `./view/build${url}`

        return { isStatic, isConfigured }
    }

    responseHandle (parameter) {
        const { message, code, contentType } = parameter
        this.response.writeHead(code, { 'Content-Type': contentType ? contentType : 'text/plain' })
        this.response.write(message)
        this.response.end()
    }

    renderLeanerStyleSheets () {
        const resourcePath = projectRelativePath(`${this.resourcePath}index.less`)
        const outputPath = projectRelativePath(`${this.outputPath}index.css`)
        // http://lesscss.org/usage/#less-options
        const options = {
            paths: [ projectRelativePath('./view/css/') ],
            rootpath: [ projectRelativePath('./view/css/') ],
            rewriteUrls: 'off',
            compress: !this.isDev
        }

        return new Promise((resolve, reject) => {
            const lessRender = lessStr => less.render(lessStr, options)
            .then(
                output => fs.writeFile(
                    outputPath,
                    // output.css = string of css
                    // output.map = string of sourcemap
                    // output.imports = array of string filenames of the imports referenced
                    output.css,
                    { encoding: 'utf8' },
                    writeFileError => {
                        if (writeFileError) return reject(consequencer.error(JSON.stringify(writeFileError)))
                        resolve(consequencer.success(output.css))
                    }
                ),
                error => reject(consequencer.error(JSON.stringify(readFileError)))
            )

            fs.readFile(resourcePath, 'utf8', (readFileError, lessStr) => {
                if (readFileError) return reject(consequencer.error(JSON.stringify(readFileError)))
                lessRender(lessStr)
            })
        })
    }

    renderTypedJavaScriptXML () {
        return new Promise((resolve, reject) => {
            resolve()
        })
    } // TODO
}

class ResourcesHandle extends ResourcesUtils {
    constructor(request, response, isDev) {
        super()
        this.isStatic = false // TODO
        this.isConfigured = false // TODO
        this.init(request, response, isDev)
    }

    init(request, response, isDev) {
        this.request = request
        this.response = response
        this.isDev = isDev

        const { isStatic, isConfigured } = this.initUrlCatch()
        this.isStatic = isStatic
        this.isConfigured = isConfigured
    }

    /**
     * 渲染Web页面 only for development
     * 基本思路: 
     * 1. isConfigured 判断是否符合配置页面? 是, 则渲染 html js less, 并且返回 html 资源
     * 2. isStatic 判断是否资源文件? 是, 则返回 资源文件
     * 3. 如果都不是, 那么则是API请求
     */
    render() {
        if (this.isConfigured) return this.buildConfigured() // html js less
        this.renderStatic()
    }

    async renderHyperTextMarkupLanguage (version = '') {
        const entryPath = projectRelativePath(`${this.resourcePath}/index.html`)
        const outputPath = projectRelativePath(`${this.outputPath}/index.html`)

        return new Promise((resolve, reject) => {
            const writeFile = content => fs.writeFile(
                outputPath,
                content,
                { encoding: 'utf8' },
                writeFileError => {
                    if (writeFileError) return reject(consequencer.error(JSON.stringify(writeFileError)))
                    resolve(consequencer.success(content))
                }
            )

            const initVersion = content => {
                const contentVersion = content.replace(/<%=version%>/g, version)
                writeFile(contentVersion)
            }

            fs.readFile(entryPath, 'utf8', (readFileError, content) => {
                if (readFileError) return reject(consequencer.error(JSON.stringify(readFileError)))
                initVersion(content)
            })
        })
    }

    buildConfigured() {
        const self = this
        // const jsInstance = await this.renderTypedJavaScriptXML()
        // if (jsInstance.result !== 1) return this.responseHandle({ code: 200, message: jsInstance.message })

        // const lessInstance = await this.renderLeanerStyleSheets()
        // if (lessInstance.result !== 1) return this.responseHandle({ code: 200, message: lessInstance.message })

        // const htmlInstance = await this.renderHyperTextMarkupLanguage()
        // if (htmlInstance.result !== 1) return this.responseHandle({ code: 200, message: htmlInstance.message })

        // const html = htmlInstance.data
        // return this.responseHandle({ code: 200, message: html, contentType: 'text/html;charset=utf-8' })

        Promise.all([
            this.renderTypedJavaScriptXML(),
            this.renderLeanerStyleSheets(),
            this.renderHyperTextMarkupLanguage()
        ]).then(([jsInstance, lessInstance, htmlInstance]) => {
            const html = htmlInstance.data
            self.responseHandle({ code: 200, message: html, contentType: 'text/html;charset=utf-8' })
        }, reject => self.responseHandle({ code: 200, message: reject.message }))
    }

    renderStatic() { }

    static buildLibrary () { } // TODO

    buildAllWebResource() { } // TODO
}

export default ResourcesHandle
