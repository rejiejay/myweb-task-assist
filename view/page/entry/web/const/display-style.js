import { loadPageHashVar } from './../../../../utils/url-helper';

export const list = {
    value: 'list',
    label: '列表',
}

export const quadrant = {
    value: 'quadrant',
    label: '四象限',
}

const display_style_options = [list, quadrant]

export const default_display_style = list

export default display_style_options

export const getDisplayStyleByLoadPageHash = () => {
    const displayStyleVaule = loadPageHashVar('displayStyle');

    if (displayStyleVaule) {
        return display_style_options.find(({ value }) => value === displayStyleVaule);
    }

    return null;
}
