import {
    copyDirectory
} from './../utils/file-handle.js';
import {
    buildPath
} from './../utils/path-handle.js';

const init = async () => {
    const targetFolderPath = buildPath('./lib')
    const renderFolderPath = buildPath('./build/lib')

    const copyInstance = await copyDirectory(targetFolderPath, renderFolderPath);
    if (copyInstance.result !== 1) return console.error(copyInstance.message);
}

const lib = {
    init
}

export default lib