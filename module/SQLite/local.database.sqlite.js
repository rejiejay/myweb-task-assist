/**
 * local.database.sqlite is only for local development
 */
const table = {
    task: `
        CREATE TABLE task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskTagId TINYINT,
            longTermId TINYINT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            specific TEXT,
            measurable TEXT,
            attainable TEXT,
            relevant TEXT,
            timeBound TEXT,
            createTimestamp BIGINT NOT NULL,
            minEffectTimestamp BIGINT,
            maxEffectTimestamp BIGINT,
            status TINYTEXT,
            priority TINYINT
        )
    `,

    taskTagRelational: `
        CREATE TABLE taskTagRelational (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskId INT NOT NULL,
            tagId INT NOT NULL
        )
    `,

    taskTags: `
        CREATE TABLE taskTags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TINYTEXT NOT NULL
        )
    `,

    longTermTaskRelational: `
        CREATE TABLE longTermTaskRelational (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            record LONGTEXT,
            spreadZoomIdentify TINYTEXT,
            spreadZoomDepth INT,
            detailCategoryIdentify TINYTEXT NOT NULL
        )
    `,

    longTermRecordDetail: `
        CREATE TABLE longTermRecordDetail (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            categoryIdentify TINYTEXT NOT NULL,
            uniquelyIdentify TINYTEXT NOT NULL,
            parentUniquelyIdentify TINYTEXT NOT NULL,
            createTimestamp BIGINT NOT NULL,
            detail TEXT NOT NULL
        )
    `,

    navigationLink: `
        CREATE TABLE navigationLink (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uniquelyIdentify TINYTEXT NOT NULL,
            parentUniquelyIdentify TINYTEXT NOT NULL,
            topic TINYTEXT NOT NULL,
            filterJson TEXT NOT NULL
        )
    `
}

function initTask() {
    const slef = this
    const insertTaskData = data => utils.insertTaskData('task', data)
    const list = [
        { title: '"最简"', content: '"最简内容"', createTimestamp: new Date(2021, 2, 1, 0, 0).getTime() },
        { title: '"任务1"', content: '"任务内容1 \n taskTagId: 1 \n min-maxEffectTimestamp 2000, 1, 3-5"', createTimestamp: new Date(2021, 2, 1, 0, 0).getTime(), taskTagId: 1, minEffectTimestamp: new Date(2000, 1, 3, 0, 0).getTime(), maxEffectTimestamp: new Date(2000, 1, 5, 0, 0).getTime() },
        { title: '"任务2"', content: '"任务内容2 \n taskTagId: 2 \n min-maxEffectTimestamp 2000, 1, 6-8"', createTimestamp: new Date(2021, 2, 2, 0, 0).getTime(), taskTagId: 2, minEffectTimestamp: new Date(2000, 1, 6, 0, 0).getTime(), maxEffectTimestamp: new Date(2000, 1, 8, 0, 0).getTime(), longTermId: 1, status: 1 },
        { title: '"任务3"', content: '"任务内容3 \n taskTagId: 3 \n priority: 1 \n longTermId: 1 \n min-maxEffectTimestamp 2000, 1, 1-10"', createTimestamp: new Date(2021, 2, 3, 0, 0).getTime(), taskTagId: 3, minEffectTimestamp: new Date(2000, 1, 1, 0, 0).getTime(), maxEffectTimestamp: new Date(2000, 1, 10, 0, 0).getTime(), priority: 1 },
        { title: '"任务4"', content: '"任务内容4 \n taskTagId: 4 \n priority: 1"', createTimestamp: new Date(2021, 2, 4, 10, 10).getTime(), taskTagId: 4, priority: 1 },
        { title: '"测试换行"', content: '"第一行  \n  第二行"', createTimestamp: new Date(2021, 2, 3, 0, 0).getTime(), specific: '"第一行  \n  第二行"', measurable: '"第一行  \n  第二行"', attainable: '"第一行  \n  第二行"', relevant: '"第一行  \n  第二行"', timeBound: '"第一行  \n  第二行"' }
    ]

    // 测试分页
    for (let index = 5; index <= 20; index++) {
        list.push({ title: `"任务${index}"`, content: `"任务内容${index}"`, createTimestamp: new Date(2021, 2, 1, index, index).getTime() })
    }

    list.forEach(item => slef.SqliteJs.exec(insertTaskData(item)))
}

/**
 * 任务 查询 标签 流程: task.taskTagId = 1 ---> taskTagRelational.taskId = 1 ---> taskTags.id = [1, 2, 3, 4] ---> taskTags.name = ['js', 'exam', 'love', 'gwy']
 * 标签 查询 任务 流程: taskTags.name = 'js' ---> taskTags.id = 1 = taskTagRelational.tagId ---> taskTagRelational.id = [ 1 ] ---> taskTagRelational.taskId = [ 1 ]
 */
function initTaskTagRelational() {
    const insertTaskData = data => utils.insertTaskData('taskTagRelational', data)
    this.SqliteJs.exec(insertTaskData({ taskId: 1, tagId: 1 }));
    this.SqliteJs.exec(insertTaskData({ taskId: 1, tagId: 2 }));
    this.SqliteJs.exec(insertTaskData({ taskId: 1, tagId: 3 }));
    this.SqliteJs.exec(insertTaskData({ taskId: 1, tagId: 4 }));
    this.SqliteJs.exec(insertTaskData({ taskId: 2, tagId: 2 }));
    this.SqliteJs.exec(insertTaskData({ taskId: 3, tagId: 3 }));
    this.SqliteJs.exec(insertTaskData({ taskId: 4, tagId: 4 }));
}

function initTaskTags() {
    const insertTaskData = data => utils.insertTaskData('taskTags', data)
    this.SqliteJs.exec(insertTaskData({ name: '"js"' }));
    this.SqliteJs.exec(insertTaskData({ name: '"exam"' }));
    this.SqliteJs.exec(insertTaskData({ name: '"love"' }));
    this.SqliteJs.exec(insertTaskData({ name: '"gwy"' }));
}

function initLongTermTaskRelational() {
    const insertTaskData = data => utils.insertTaskData('longTermTaskRelational', data)
    this.SqliteJs.exec(insertTaskData({ title: '"任务长期任务"', record: '"长期任务内容"', detailCategoryIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"' }));
    this.SqliteJs.exec(insertTaskData({ title: '"任务长期任务2"', record: '"长期任务内容2"', detailCategoryIdentify: '"8bdf06bdbf9497bc6f69316b8385886388d01c4e"' }));
}

function initNavigationLink() {
    const insertTaskData = data => utils.insertTaskData('navigationLink', data)
    this.SqliteJs.exec(insertTaskData({
        uniquelyIdentify: '"e71f41f2864f42ad6eef13a379ff903769ef7ea8"',
        parentUniquelyIdentify: '"root"',
        topic: '"root"',
        filterJson: `'${JSON.stringify({
            longTerm: { id: 1, title: '务长期任务' },
            tags: [{ id: 1, name: 'js' }],
            multipleStatus: [1],
            multiplePriority: [1],
            minEffectTimestamp: new Date(2000, 1, 3, 0, 0).getTime(),
            maxEffectTimestamp: new Date(2000, 1, 5, 0, 0).getTime()
        })}'`
    }))
    this.SqliteJs.exec(insertTaskData({
        uniquelyIdentify: '"85136c79cbf9fe36bb9d05d0639c70c265c18d37"',
        parentUniquelyIdentify: '"root"',
        topic: '"root2"',
        filterJson: `'${JSON.stringify({
            longTerm: { id: 1, title: '务长期任务' }
        })}'`
    }))
    this.SqliteJs.exec(insertTaskData({
        uniquelyIdentify: '"7eaa6f30ea61c7920cacb0363bc0a520f5248e31"',
        parentUniquelyIdentify: '"e71f41f2864f42ad6eef13a379ff903769ef7ea8"',
        topic: '"root1 children"',
        filterJson: `'${JSON.stringify({
            tags: [{ id: 1, name: 'js' }]
        })}'`
    }))
    this.SqliteJs.exec(insertTaskData({
        uniquelyIdentify: '"7dd8947d08339e1417268689b9b69d0a34e9d0ab"',
        parentUniquelyIdentify: '"e71f41f2864f42ad6eef13a379ff903769ef7ea8"',
        topic: '"root1 children2"',
        filterJson: `'${JSON.stringify({
            multipleStatus: [1]
        })}'`
    }))
    this.SqliteJs.exec(insertTaskData({
        uniquelyIdentify: '"5f5f3dd8fa3aea1dd0e758bf10405ff62b783c5c"',
        parentUniquelyIdentify: '"7eaa6f30ea61c7920cacb0363bc0a520f5248e31"',
        topic: '"children1 children"',
        filterJson: `'${JSON.stringify({
            multiplePriority: [1]
        })}'`
    }))
}

function longTermRecordDetail() {
    const insertTaskData = data => utils.insertTaskData('longTermRecordDetail', data)
    this.SqliteJs.exec(insertTaskData({
        categoryIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        uniquelyIdentify: '"b063cf3b653b3230a7c08a283bef69a4c1b60170"',
        parentUniquelyIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        createTimestamp: new Date(2021, 2, 1, 0, 0).getTime(),
        detail: '"root"'
    }))
    this.SqliteJs.exec(insertTaskData({
        categoryIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        uniquelyIdentify: '"85136c79cbf9fe36bb9d05d0639c70c265c18d37"',
        parentUniquelyIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        createTimestamp: new Date(2021, 2, 2, 0, 0).getTime(),
        detail: '"root2"'
    }))
    this.SqliteJs.exec(insertTaskData({
        categoryIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        uniquelyIdentify: '"7eaa6f30ea61c7920cacb0363bc0a520f5248e31"',
        parentUniquelyIdentify: '"b063cf3b653b3230a7c08a283bef69a4c1b60170"',
        createTimestamp: new Date(2021, 2, 3, 0, 0).getTime(),
        detail: '"root1 children"'
    }))
    this.SqliteJs.exec(insertTaskData({
        categoryIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        uniquelyIdentify: '"7dd8947d08339e1417268689b9b69d0a34e9d0ab"',
        parentUniquelyIdentify: '"b063cf3b653b3230a7c08a283bef69a4c1b60170"',
        createTimestamp: new Date(2021, 2, 4, 0, 0).getTime(),
        detail: '"root1 children2"'
    }))
    this.SqliteJs.exec(insertTaskData({
        categoryIdentify: '"f9981986834db83f0bb112b1d237611d596de57e"',
        uniquelyIdentify: '"5f5f3dd8fa3aea1dd0e758bf10405ff62b783c5c"',
        parentUniquelyIdentify: '"7eaa6f30ea61c7920cacb0363bc0a520f5248e31"',
        createTimestamp: new Date(2021, 2, 5, 0, 0).getTime(),
        detail: '"children1 children"'
    }))
}

function init(SqliteJs) {
    this.SqliteJs = SqliteJs
    this.initTable()

    this.initTask()
    this.initTaskTagRelational()
    this.initTaskTags()
    this.initLongTermTaskRelational()
    this.initNavigationLink()
    this.longTermRecordDetail()
}

const utils = {
    dataToAddSql(data) {
        const keys = []
        const values = []
        Object.keys(data).forEach(key => {
            keys.push(key)
            values.push(data[key])
        })

        return `(${keys.join(',')}) VALUES (${values.join(',')})`
    },

    insertTaskData(table, data) {
        return `INSERT INTO ${table} ${this.dataToAddSql(data)};`
    },
}

function initTable() {
    this.SqliteJs.exec(table.task);
    this.SqliteJs.exec(table.taskTagRelational);
    this.SqliteJs.exec(table.taskTags);
    this.SqliteJs.exec(table.longTermTaskRelational);
    this.SqliteJs.exec(table.longTermRecordDetail);
    this.SqliteJs.exec(table.navigationLink);
}

const localDatabaseSqlite = {
    SqliteJs: {},
    init,
    initTable,
    initTask,
    initTaskTagRelational,
    initTaskTags,
    initLongTermTaskRelational,
    longTermRecordDetail,
    initNavigationLink
}

export default localDatabaseSqlite
