import FullscreenIframe from './../../components/fullscreen-iframe'
import toast from './../../components/toast'

import CONSTS from './../../../library/consts'

const initStatusLable = value => {
    const description = CONSTS.utils.serviceValueToViewLable(CONSTS.task.status, value)
    return description
}
const initPriorityLable = value => {
    const description = CONSTS.utils.serviceValueToViewLable(CONSTS.task.priority, value)
    return description
}

const showOperateFilterEdit = (isMultipleFilter = false, filter = null) => new Promise((resolve, reject) => {
    toast.show()
    import('./mobile-components/filter-edit-panel').then(async ({ FilterEditPanel }) => {
        toast.destroy()
        const selectInstance = await FullscreenIframe({
            Element: FilterEditPanel,
            className: 'mobile-device-task-filter-edit',
            props: {
                isMultipleFilter,
                initFilter: filter
            }
        })

        resolve(selectInstance)
    })
})

const utils = {
    initStatusLable,
    initPriorityLable,
    showOperateFilterEdit
}

export default utils