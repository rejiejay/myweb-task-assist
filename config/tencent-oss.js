let ossConfig = {
    // Warning: Can`t submit
    secretId: '',
    secretKey: '',
    bucket: '',
    region: '',
    appId: '',
    /**
     * 任务数据备份路径
     */
    sqlitejsBackupPath: 'task-assist-system-v6/sqlite-task'
}

const development = {}

const production = {}

if (process.env.NODE_ENV === 'development') ossConfig = { ...ossConfig, ...development }
if (process.env.NODE_ENV === 'production') ossConfig = { ...ossConfig, ...production }

export default ossConfig
