let ossConfig = {
    // Warning: Can`t submit
    secretId: 'AKIDZw6DLFgMZZKuFO6zSfdMr8D4j9KGmQeh',
    secretKey: 'xkIbfU4SgfT4RZVCettgEWbR2OYTBetv',
    bucket: 'rejiejay-1251940173',
    region: 'ap-guangzhou',
    appId: '1251940173',
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
