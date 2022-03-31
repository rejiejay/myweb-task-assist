import SQLite from './../../module/SQLite/index.js'

import dataAccessObject from './data-access-object'

const tableHandle = new SQLite.TableHandle('task', dataAccessObject)

const getTaskTags = async () => {

    const query = await tableHandle.query(
        'select distinct tag from task WHERE tag NOT NULL AND completedTimestamp IS NULL;'
    )
    if (query instanceof Error) query

    try {
        if (query.length <= 0) return []
        const data = query[0]
        const values = data.values
        if (values.length <= 0) return []
        return values.map(columns => columns[0])
    } catch (error) {
        return error
    }
}

const taskTag = {
    getTaskTags,
}

export default taskTag
