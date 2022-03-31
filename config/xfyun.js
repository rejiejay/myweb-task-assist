let xfyun = {
    hostUrl: "wss://tts-api.xfyun.cn/v2/tts",
    host: "tts-api.xfyun.cn",
    uri: "/v2/tts",
    appid: "126cf233",
    apiSecret: "NzNkNGM5MjRhY2FmMjYwOWRlMGZmNTk1",
    apiKey: "a37e719d5bb1477e39ad1513b250a67e",
}

const development = {}

const production = {}

if (process.env.NODE_ENV === 'development') xfyun = { ...xfyun, ...development }
if (process.env.NODE_ENV === 'production') xfyun = { ...xfyun, ...production }

export default xfyun
