let resource = {
    root: {
        matchURL: '/',
        resourcePath: './view/page/entry/',
        outputPath: './output/build/'
    },
    window_detail: {
        matchURL: '/window-detail/',
        resourcePath: './view/page/window-detail/',
        outputPath: './output/build/window-detail/'
    },
    completed: {
        matchURL: '/completed/',
        resourcePath: './view/page/completed/',
        outputPath: './output/build/completed/'
    },
    long_term_list: {
        matchURL: '/long-term-list/',
        resourcePath: './view/page/long-term-list/',
        outputPath: './output/build/long-term-list/'
    },
    long_term_detail: {
        matchURL: '/long-term-detail/',
        resourcePath: './view/page/long-term-detail/',
        outputPath: './output/build/long-term-detail/'
    },
}

const development = {}

const production = {}

if (process.env.NODE_ENV === 'development') resource = { ...resource, ...development }
if (process.env.NODE_ENV === 'production') resource = { ...resource, ...production }

export default resource
