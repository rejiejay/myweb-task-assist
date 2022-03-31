let http = {
    port: 1938,
    host: 'localhost'
}

const development = {}

const production = {
    port: 1927,
    host: '127.0.0.1'
}

if (process.env.NODE_ENV === 'development') http = { ...http, ...development }
if (process.env.NODE_ENV === 'production') http = { ...http, ...production }

export default http
