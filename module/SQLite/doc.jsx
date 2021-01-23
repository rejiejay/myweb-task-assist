// https://github.com/sql-js/sql.js

// 在线SQL
// https://www.liaoxuefeng.com/wiki/1177760294764384/1179611432985088

/**
 * 测试tag标签连表查询
 */
创建task表 = `
CREATE TABLE task (
    task_id INT UNSIGNED AUTO_INCREMENT,
    task_tag_id TINYINT NOT NULL,
    PRIMARY KEY (task_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
SELECT * FROM task;
`
创建task与tag关系表 = `
CREATE TABLE task_tag_relational (
   tag_id INT UNSIGNED AUTO_INCREMENT,
   task_id INT NOT NULL,
   js TINYTEXT NOT NULL,
   exam TINYTEXT NOT NULL,
   PRIMARY KEY (tag_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
SELECT * FROM task_tag_relational;
`

插入task数据 = `
INSERT INTO task (task_tag_id) VALUES (1);
INSERT INTO task (task_tag_id) VALUES (2);
INSERT INTO task (task_tag_id) VALUES (3);
`

插入task与tag关系表数据 = `
INSERT INTO task_tag_relational (task_id, js, exam) VALUES (1, 1, 0);
INSERT INTO task_tag_relational (task_id, js, exam) VALUES (2, 0, 1);
INSERT INTO task_tag_relational (task_id, js, exam) VALUES (3, 1, 1);
`

新增列表名默认为0 = `
ALTER TABLE task_tag_relational ADD hkjc TINYTEXT;
`

修改列表名 = `
ALTER TABLE task_tag_relational CHANGE hkjc new_hkjc_anme TINYTEXT;
`

删除列表名 = `
ALTER TABLE task_tag_relational DROP hkjc;
`
查询所有表名 = `
PRAGMA task_tag_relational;
`
