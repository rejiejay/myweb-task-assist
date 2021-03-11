import * as fs from 'fs';

import { projectRelativePath } from './../utils/path-handle.js';

import auth from './auth.js'
import http from './http.js'
import development from './development.js'
import production from './production.js'

/**
 * 特别注意: 此处的config不能用于 web 端使用, 因为前端无法使用 fs, 所以想要使用 这里的配置, 只能通过引用这里的其他组件
 */
let config = {
    version: JSON.parse(fs.readFileSync(projectRelativePath('./package.json')).toString()).version,

    auth,

    http,

    resource: {
        root: {
            matchURL: '/',
            resourcePath: './view/page/entry/',
            outputPath: './view/build/'
        },
        SQLiteGUI: {
            matchURL: '/sql-lite-gui/',
            resourcePath: './view/page/sql-lite-gui/',
            outputPath: './view/build/sql-lite-gui/'
        },
        windowsEdit: {
            matchURL: '/windows-edit/',
            resourcePath: './view/page/windows-edit/',
            outputPath: './view/build/windows-edit/'
        },
    },

    TCOS: {
        // Warning: Can`t submit
        secretId: ' ',
        secretKey: '',
        bucket: 'rejiejay-1251940173',
        region: 'ap-guangzhou',
        appId: ''
    }
}

if (process.env.NODE_ENV === 'development') config = { ...config, ...development }
if (process.env.NODE_ENV === 'production') config = { ...config, ...production }

export default config
