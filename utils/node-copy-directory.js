import fse from 'fs-extra';

const copyDirectory = (targetFolderPath, renderFolderPath) => new Promise((resolve, reject) => {
    fse.copy(targetFolderPath, renderFolderPath, err => {
        if (err) return reject(err);
        resolve();
    })
})

export default copyDirectory