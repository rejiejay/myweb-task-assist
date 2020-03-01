const config = {
    origin: process.env === 'development' ? 'http://localhost:1932/' : '/task-server/',
    deniedCode: 5703,
    expiredCode: 5704,
    authFailed: 5788,
}

export default config
