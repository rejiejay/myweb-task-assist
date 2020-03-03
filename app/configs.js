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
}, {
    route: '/todo/edit/index.html',
    entry: './views/todo/edit',
    output: './build/todo/edit'
}, {
    route: '/todo/list/index.html',
    entry: './views/todo/list',
    output: './build/todo/list'
}, {
    route: '/why/index.html',
    entry: './views/why',
    output: './build/why'
}, {
    route: '/why/spiritual/index.html',
    entry: './views/why/spiritual',
    output: './build/why/spiritual'
}, {
    route: '/why/edit/index.html',
    entry: './views/why/edit',
    output: './build/why/edit'
}, {
    route: '/plan/index.html',
    entry: './views/plan',
    output: './build/plan'
}, {
    route: '/plan/edit/index.html',
    entry: './views/plan/edit',
    output: './build/plan/edit'
}]

export default configs