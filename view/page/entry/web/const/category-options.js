import { loadPageHashVar } from './../../../../utils/url-helper';

export const showAllCategorized = {
    value: 'showAllCategorized',
    label: '分类显示全部',
}
export const onlyShowUncategorized = {
    value: 'onlyShowUncategorized',
    label: '仅显示未分类',
}
export const onlyShowCategorized = {
    value: 'onlyShowCategorized',
    label: '仅显示已分类',
}
export const onlyShowCompleted = {
    value: 'onlyShowCompleted',
    label: '仅显示已完成',
}

const category_options = [
    showAllCategorized,
    onlyShowUncategorized,
    onlyShowCategorized,
    onlyShowCompleted
]

export const default_category_options = showAllCategorized;

export default category_options;

export const getCategoryByLoadPageHash = () => {
    const categoryVaule = loadPageHashVar('category');

    if (categoryVaule) {
        return category_options.find(({ value }) => value === categoryVaule);
    }

    return null;
}
