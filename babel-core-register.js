const register = require("babel-register")

register(
    {
        presets: ["@babel/core", "@babel/preset-env", 'es2015','es2016','es2017','stage-0','stage-1','stage-2','stage-3'],
        plugins: [
            "@babel/plugin-transform-runtime",
        ]
    }
)
 
require("babel-polyfill")
require("./development.js")
