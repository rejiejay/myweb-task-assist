import * as fs from 'fs';

import development from './development.js'
import production from './production.js'
import { projectRelativePath } from './../utils/path-handle.js';

let config = {
    version: JSON.parse(fs.readFileSync(projectRelativePath('./package.json')).toString()).version,

    port: 1938,
    host: 'localhost',
    resource: {
        library: {},
        view: {
            root: {
                matchURL: '/',
                resourcePath: './view/page/',
                outputPath: './view/build/'
            }
        }
    }
}

if (process.env.NODE_ENV === 'development') config = { ...config, ...development }
if (process.env.NODE_ENV === 'production') config = { ...config, ...production }

export default config
