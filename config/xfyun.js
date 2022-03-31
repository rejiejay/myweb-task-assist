let xfyun = {
    hostUrl: "",
    host: "",
    uri: "",
    appid: "",
    apiSecret: "",
    apiKey: "",
}

const development = {}

const production = {}

if (process.env.NODE_ENV === 'development') xfyun = { ...xfyun, ...development }
if (process.env.NODE_ENV === 'production') xfyun = { ...xfyun, ...production }

export default xfyun
