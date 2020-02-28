import {
    consequencer
} from './../utils/consequencer.js';
import webpack from 'webpack';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
const __dirname = path.resolve(path.dirname(''));

const html = async config => {

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
    const js = await javaScript(config);
    if (js.result !== 1) return js;

    return consequencer.success()
}