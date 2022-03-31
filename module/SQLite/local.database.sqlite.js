/**
 * local.database.sqlite is only for local development
 */

import { getAllMockData } from './utils/index'

const table = {
    task: `
        CREATE TABLE task (
            key INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL,

            title TEXT NOT NULL,
            content TEXT NOT NULL,

            specific TEXT,
            measurable TEXT,
            attainable TEXT,
            relevant TEXT,
            timeBound TEXT,

            longTermId TINYINT,
            longTermName TINYINT,
            longTermProgramId TINYINT,

            deadlineTimestamp BIGINT,
            tag TINYTEXT,
            progress TINYTEXT,
            priority TINYINT,

            createTimestamp BIGINT NOT NULL,
            updateTimestamp BIGINT NOT NULL,
            completedTimestamp BIGINT,
            readCount BIGINT NOT NULL DEFAULT 0,
            operationalPosition BIGINT NOT NULL
        )
    `,

    longTerm: `
        CREATE TABLE longTerm (
            key INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL,

            name TEXT NOT NULL,
            description TEXT,
            operationalPosition BIGINT NOT NULL
        )
    `,

    longTermProgram: `
        CREATE TABLE longTermProgram (
            key INTEGER PRIMARY KEY AUTOINCREMENT,
            id TEXT NOT NULL,

            parentId INTEGER NOT NULL,
            name TINYTEXT NOT NULL,
            operationalPosition BIGINT NOT NULL
        )
    `,
}

function init(SqliteJs) {
    this.SqliteJs = SqliteJs
    this.initTable()

    this.initData()
}

function initTable() {
    this.SqliteJs.exec(table.task);
    this.SqliteJs.exec(table.longTerm);
    this.SqliteJs.exec(table.longTermProgram);
}

function initData() {
    const slef = this
    const { longTerm, longTermPrograms, data } = getAllMockData()
    const insertTaskData = data => utils.insertTaskData('task', data)
    const insertLongTermData = data => utils.insertTaskData('longTerm', data)
    const insertLongTermProgramsData = data => utils.insertTaskData('longTermProgram', data)

    data.forEach(item => {
        let insert = {
            id: `\"${item.id}\"`,

            title: `\"${item.title}\"`,
            content: `\"${item.content}\"`,

            createTimestamp: item.createTimestamp,
            updateTimestamp: item.updateTimestamp,
            readCount: item.readCount || 0,
            operationalPosition: item.operationalPosition
        }
        if (item.specific) insert.specific = `\"${item.specific}\"`
        if (item.measurable) insert.measurable = `\"${item.measurable}\"`
        if (item.attainable) insert.attainable = `\"${item.attainable}\"`
        if (item.relevant) insert.relevant = `\"${item.relevant}\"`
        if (item.timeBound) insert.timeBound = `\"${item.timeBound}\"`

        if (item.longTermId) insert.longTermId = `\"${item.longTermId}\"`
        if (item.longTermName) insert.longTermName = `\"${item.longTermName}\"`
        if (item.longTermProgramId) insert.longTermProgramId = `\"${item.longTermProgramId}\"`

        if (item.deadlineTimestamp) insert.deadlineTimestamp = item.deadlineTimestamp
        if (item.tag) insert.tag = `\"${item.tag}\"`
        if (item.progress) insert.progress = `\"${item.progress}\"`
        if (item.priority) insert.priority = `\"${item.priority}\"`

        slef.SqliteJs.exec(insertTaskData(insert))
    })

    longTerm.forEach(item => {
        slef.SqliteJs.exec(insertLongTermData({
            id: `\"${item.id}\"`,
            name: `\"${item.name}\"`,
            description: `\"${item.description}\"`,
            operationalPosition: item.operationalPosition
        }))
    })

    longTermPrograms.forEach(item => {
        slef.SqliteJs.exec(insertLongTermProgramsData({
            id: `\"${item.id}\"`,
            parentId: `\"${item.parentId}\"`,
            name: `\"${item.name}\"`,
            operationalPosition: item.operationalPosition
        }))
    })
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

const localDatabaseSqlite = {
    SqliteJs: {},
    init,
    initTable,
    initData,
}

export default localDatabaseSqlite
