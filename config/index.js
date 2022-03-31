import * as fs from 'fs';

import { projectRelativePath } from './../utils/path-handle.js';

import auth from './auth.js'
import http from './http.js'
import resource from './resource'
import ossConfig from './tencent-oss.js'
import proxyRewrite from './proxy-rewrite'
import xfyun from './xfyun'

/**
 * 特别注意: 此处的config不能用于 web 端使用, 因为前端无法使用 fs, 所以想要使用 这里的配置, 只能通过引用这里的其他组件
 */
let config = {
    version: JSON.parse(fs.readFileSync(projectRelativePath('./package.json')).toString()).version,

    auth,

    http,

    resource,

    TCOS: ossConfig,

    xfyun,

    proxyRewrite,
}

export default config
