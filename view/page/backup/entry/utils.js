import FullscreenIframe from './../../components/fullscreen-iframe'
import toast from './../../components/toast'

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
}).catch(error => error);

const utils = {
    showOperateFilterEdit
}

export default utils