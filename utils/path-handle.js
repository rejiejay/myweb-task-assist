import * as path from 'path';

const driveName = path.resolve(path.dirname(''));

export const projectRelativePath = relativePath => path.join(driveName, path.relative(driveName, relativePath));
