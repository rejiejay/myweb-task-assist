/**
 * url作用: 用于过滤路由, 例如 /todo/index.html
 */
const configs = [{
    route: '/index.html',
    entry: './views',
    output: './build'
}, {
    route: '/target/index.html',
    entry: './views/target',
    output: './build/target'
}]

export default configs