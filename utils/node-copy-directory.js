import fse from 'fs-extra';

const copyDirectory = (targetFolderPath, renderFolderPath) => new Promise((resolve, reject) => {
    fse.copy(targetFolderPath, renderFolderPath, error => {
        if (error) return reject(error);
        resolve();
    })
}).catch(error => `${error}`)

export default copyDirectory