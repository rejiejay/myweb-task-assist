const utils = {
    createTaskTable: `
        CREATE TABLE task (
            task_id INT UNSIGNED AUTO_INCREMENT,
            task_tag_id TINYINT NOT NULL,
            PRIMARY KEY (task_id)
        )
    `,
    insertTaskData: ({ task_tag_id }) => `
        INSERT INTO task (task_tag_id) VALUES (${task_tag_id});
    `,
    createTaskTagRelationalTable: `
        CREATE TABLE task_tag_relational (
            tag_id INT UNSIGNED AUTO_INCREMENT,
            task_id INT NOT NULL,
            js TINYTEXT NOT NULL,
            exam TINYTEXT NOT NULL,
            PRIMARY KEY (tag_id)
        )
    `,
    insertTaskTagRelationalData: ({ task_id, js, exam }) => `
        INSERT INTO task_tag_relational (task_id, js, exam) VALUES (${task_id}, ${js}, ${exam});
    `,
}

function initTask() {
    this.SqliteJs.exec(utils.createTaskTable);
    this.SqliteJs.exec(utils.insertTaskData({ task_tag_id: 1 }));
    this.SqliteJs.exec(utils.insertTaskData({ task_tag_id: 2 }));
    this.SqliteJs.exec(utils.insertTaskData({ task_tag_id: 3 }));
}

function initTaskTagRelational() {
    this.SqliteJs.exec(utils.createTaskTagRelationalTable);
    this.SqliteJs.exec(utils.insertTaskTagRelationalData({
        task_id: 1,
        js: 0,
        exam: 1
    }));
}

function init(SqliteJs) {
    this.SqliteJs = SqliteJs

    this.initTask()
    this.initTaskTagRelational()
}

const localDatabaseSqlite = {
    init,
    initTask,
    initTaskTagRelational
}

export default localDatabaseSqlite
