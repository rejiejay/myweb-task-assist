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
}, {
    route: '/target/json-config/index.html',
    entry: './views/target/json-config',
    output: './build/target/json-config'
}, {
    route: '/todo/index.html',
    entry: './views/todo',
    output: './build/todo'
}]

export default configs