import config from './../../config/development'

const development = {
    origin: 'http://localhost:1938/',
    auth: {
        ...config.auth
    }
}

export default development
