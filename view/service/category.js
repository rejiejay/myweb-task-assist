import consequencer from './../../utils/consequencer'
import StringHelper from './../../utils/string-helper'

const createItem = () => ({
    id: StringHelper.createRandomStr({ length: 16 }),
    name: '分类' + StringHelper.createRandomStr({ length: 4 }),
})

const getAllCategory = () => {
    const list = new Array(15).fill('').map(() => createItem());
    return consequencer.success(list);
}

const category = {
    getAllCategory
}

export default category
