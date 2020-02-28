/**
 * url作用: 用于过滤路由, 例如 /todo/index.html
 */
export const configs = [{
    route: '/index.html',
    webpack: {
        entry: './views/index.jsx',
        output: {
            path: './build',
            filename: 'index.js'
        }
    }
}]