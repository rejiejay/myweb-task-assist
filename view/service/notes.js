import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'

const createItem = () => ({
    id: StringHelper.createRandomStr({ length: 16 }),
    title: '笔记' + StringHelper.createRandomStr({ length: 4 }),
    content: '内容' + StringHelper.createRandomStr({ length: 32 }),
    timestamp: new Date().getTime(),
})

const getNotesRandomByTask = (id, count = 7) => {
    const list = new Array(count).fill('').map(() => createItem());
    return consequencer.success(list);
}

const notes = {
    getNotesRandomByTask
}

export default notes
