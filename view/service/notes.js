import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'
import NumberHelper from './../../utils/number-helper'
import JsonHelper from './../../utils/json-helper'

const createContent = (value = '', type = 'normal') => {
    const string = JsonHelper.josnToString({ type, value });

    return StringHelper.stringEncodeBase64(string)
}

const createItem = (
    parentid = StringHelper.createRandomStr({ length: 16 }),
    taskId = StringHelper.createRandomStr({ length: 16 }),
) => ({
    id: StringHelper.createRandomStr({ length: 16 }),
    parentid,
    taskId,
    title: '笔记' + StringHelper.createRandomStr({ length: 4 }),
    content: createContent('内容' + StringHelper.createRandomStr({ length: 32 })),
    timestamp: new Date().getTime(),
})

const getNotesRandomByTask = (id, count = 7) => {
    const list = new Array(count).fill('').map(() => createItem());
    return consequencer.success(list);
}

const getNotesMindByTask = id => {
    const child1 = createItem(id);
    const child2 = createItem(child1.id);
    const child3 = createItem(child2.id);
    const createList = (count, parentid) => new Array(count)
        .fill(parentid)
        .map((parentid) => createItem(parentid));

    return consequencer.success([
        ...createList(NumberHelper.createRandomNum(6) + 1, id),
        child1,
        ...createList(NumberHelper.createRandomNum(4) + 1, child1.id),
        child2,
        ...createList(NumberHelper.createRandomNum(2) + 1, child2.id),
        child3,
        ...createList(NumberHelper.createRandomNum(1) + 1, child3.id),
    ]);
}

const getNoteByTask = id => {
    return consequencer.success(createItem(id));
}

const notes = {
    getNotesRandomByTask,
    getNotesMindByTask,
    getNoteByTask
}

export default notes
