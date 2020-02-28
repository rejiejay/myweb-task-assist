import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import template from 'art-template';
import gulp from 'gulp';
import less from 'gulp-less';
import LessPluginCleanCSS from 'less-plugin-clean-css';

import consequencer from './../utils/consequencer.js';
import {
    buildPath
} from './../utils/path-handle.js';


const cleanCSSPlugin = new LessPluginCleanCSS({
    advanced: true
});

const html = async config => await new Promise((resolve, reject) => fs.readFile(buildPath(`${config.entry}/index.art`), 'utf8', (readFileError, content) => {
    if (readFileError) return reject(readFileError);

    /** https://aui.github.io/art-template/zh-cn/docs/api.html */
    const html = template.render(content);

    fs.writeFile(buildPath(`${config.output}/index.html`), html, {
        encoding: 'utf8'
    }, writeFileError => {
        if (writeFileError) return reject(writeFileError);
        resolve()
    });
})).then(
    () => consequencer.success(),
    error => consequencer.error(error)
)

const css = async config => await new Promise((resolve, reject) => gulp.src(buildPath(`${config.entry}/index.less`))
    .pipe(less({
        paths: buildPath('./css'),
        plugins: [cleanCSSPlugin] /** 压缩 */
    }))
    .pipe(gulp.dest(config.output))
    .on('error', error => reject(`转换 less 文件出错, 原因: ${error}`))
    .on('end', () => resolve())
).then(
    () => consequencer.success(),
    error => consequencer.error(error)
)

const javaScript = async config => {
    return await new Promise((resolve, reject) => {
        webpack({
            entry: [
                buildPath(`${config.entry}/index.jsx`)
            ],
            output: {
                publicPath: './',
                path: buildPath(config.output),
                filename: 'index.js'
            },
            module: {
                rules: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }]
            },
            plugins: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    extractComments: true
                })
            ]
        }, (err, stats) => {
            if (err || stats.hasErrors()) return reject(stats.toJson().errors)
            return resolve()
        });
    }).then(
        () => consequencer.success(),
        error => consequencer.error(error)
    )
}

const render = async config => {
    const jsInstance = await javaScript(config);
    if (jsInstance.result !== 1) return jsInstance;

    const htmlInstance = await html(config);
    if (htmlInstance.result !== 1) return htmlInstance;

    const cssInstance = await css(config);
    if (cssInstance.result !== 1) return cssInstance;

    return consequencer.success()
}

export default render