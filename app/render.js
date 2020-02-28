import {
    consequencer
} from './../utils/consequencer.js';
import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import template from 'art-template';

const __dirname = path.resolve(path.dirname(''));
const buildPath = myPath => path.join(__dirname, path.relative(__dirname, myPath));

const html = async config => {
    return await new Promise((resolve, reject) => fs.readFile(buildPath(config.html.entry), 'utf8', (readFileError, content) => {
        if (readFileError) return reject(readFileError);

        /** https://aui.github.io/art-template/zh-cn/docs/api.html */
        const html = template.render(content);

        fs.writeFile(buildPath(config.html.output), html, {
            encoding: 'utf8'
        }, writeFileError => {
            if (writeFileError) return reject(writeFileError);
            resolve()
        });
    })).then(
        () => consequencer.success(),
        error => consequencer.error(error)
    )
}

const less = async config => {

}

const javaScript = async config => {
    return await new Promise((resolve, reject) => {
        webpack({
            entry: [
                path.join(__dirname, path.relative(__dirname, config.webpack.entry))
            ],
            output: {
                publicPath: './',
                path: path.join(__dirname, path.relative(__dirname, config.webpack.output.path)),
                filename: config.webpack.output.filename
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

export const render = async config => {
    const jsInstance = await javaScript(config);
    if (jsInstance.result !== 1) return jsInstance;

    const htmlInstance = await html(config);
    if (htmlInstance.result !== 1) return htmlInstance;

    return consequencer.success()
}