let proxyRewrite = {
    isRewrite: false,
    token: '',
    uuid: '',
    baseURL: 'https://www.rejiejay.cn/',
}

const development = {}

const production = {}

if (process.env.NODE_ENV === 'development') proxyRewrite = { ...proxyRewrite, ...development }
if (process.env.NODE_ENV === 'production') proxyRewrite = { ...proxyRewrite, ...production }

export default proxyRewrite
