const development = {
    origin: 'http://localhost:1938/',
    auth: {
        url: {
            login: 'auth/login',
        },
        loginFailure: {
            code: 401,
            message: '未授权'
        },
    }
}

export default development
