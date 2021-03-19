import ActionSheet from './../../components/action-sheet'
import FullscreenIframe from './../../components/fullscreen-iframe'
import Button from './../../components/button'
import toast from './../../components/toast'
import CommonlyBottomOperate from './../../components/mobile/commonly-bottom-operate'
import Storage from './../../components/storage'
import CONSTS from './../../../library/consts'
import ArrayHelper from './../../../utils/array-helper'

import service from './../../service'
import utils from './utils.js'
import TaskList from './mobile-components/task-card'
import GroupPanel from './mobile-components/group-panel'

export class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        const filter = Storage.filter.getHandle()

        this.state = {
            isShowBigCard: false,

            list: [
                // service\task\data-access-object.js
            ],
            count: 0,
            pageNo: 1,
            pageSize: CONSTS.defaultPageSize,

            sort: { value: 1, label: 'Sort' },
            // { id, title }
            longTerm: filter.longTerm // 长期的任务不进行多选
        }

        this.filter = {
            tags: filter.tags,
            minEffectTimestamp: filter.minEffectTimestamp || null,
            maxEffectTimestamp: filter.maxEffectTimestamp || null,
            // library\consts\task.js -> status && priority
            multipleStatus: filter.multipleStatus,
            multiplePriority: filter.multiplePriority
        }

        this.longTermRef = React.createRef();
    }

    componentDidMount() {
        this.initList()
    }

    initList = async (refresh = false) => {
        const { longTerm, sort, pageNo, pageSize } = this.state
        const filter = { longTerm, pageNo, pageSize, ...this.filter }

        const fetchInstance = await service.getTaskList(filter, sort)
        if (fetchInstance.result !== 1) return
        const fetch = fetchInstance.data
        let list = fetch.list

        if (!refresh && pageNo > 1 && sort.value !== 2) list = this.state.list.concat(fetch.list)
        if (!refresh && sort.value === 2) list = ArrayHelper.uniqueDeduplicationByKey({ array: this.state.list.concat(fetch.list), key: 'id' })

        this.setState({ list, count: fetch.count })
    }

    selectSortHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.sort)
        const selectInstance = await ActionSheet({ title: '请选择排序', options })
        if (selectInstance.result !== 1) return
        const sort = selectInstance.data

        const state = this.state
        let list = state.list
        let pageNo = state.pageNo
        if (sort.value !== state.value) {
            list = []
            pageNo = 1
        }

        this.setState({ list, pageNo, sort }, this.initList)
    }

    selectFilterHandle = async () => {
        const isMultipleFilter = true
        const initFilter = {
            longTerm: this.state.longTerm,
            ...this.filter
        }

        const selectInstance = await utils.showOperateFilterEdit(isMultipleFilter, initFilter)
        if (selectInstance.result !== 1) return
        const filter = selectInstance.data

        const longTerm = filter.longTermFilter
        const tags = filter.tagFilter
        let minEffectTimestamp = filter.minEffectTimestampFilter
        let maxEffectTimestamp = filter.maxEffectTimestampFilter
        if (filter.effectTimestampRangeFilter) {
            const effectTimestampRange = CONSTS.utils.viewValueToServiceView(CONSTS.task.effectTimestampRange, filter.effectTimestampRangeFilter)
            minEffectTimestamp = new Date().getTime()
            maxEffectTimestamp = minEffectTimestamp + effectTimestampRange
        }
        const multipleStatus = filter.statusMultipleFilter
        const multiplePriority = filter.priorityMultipleFilter
        this.filter = { tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority }
        Storage.filter.setHandle(tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority, longTerm)
        this.setState({ longTerm }, () => this.initList(true))
    }

    loadRandomHandle = () => this.setState({ pageNo: 1 }, this.initList)

    loadMoreHandle = () => {
        const { list, count, pageNo } = this.state
        if (list.length === count) return toast.show('All have been loaded')
        this.setState({ pageNo: pageNo + 1 }, this.initList)
    }

    showEditHandle = ({ isAdd, editId } = {}) => {
        const self = this
        const { longTerm, list } = this.state
        const { tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority } = this.filter

        let props = {}
        if (!isAdd) props.id = editId
        if (!!longTerm.id) props.longTerm = longTerm
        if (tags.length > 0) props.tags = tags
        if (minEffectTimestamp) props.minEffectTimestamp = minEffectTimestamp
        if (maxEffectTimestamp) props.maxEffectTimestamp = maxEffectTimestamp
        if (multipleStatus.length > 0) props.status = multipleStatus[0]
        if (multiplePriority.length > 0) props.priority = multiplePriority[0]

        const deleteHandle = () => self.setState({ list: list.filter(({ id }) => id !== editId) })

        toast.show()
        import('./edit/mobile').then(async ({ TaskEdit }) => {
            toast.destroy()
            const editInstance = await FullscreenIframe({
                Element: TaskEdit,
                className: 'mobile-device-task-edit',
                props
            })

            if (editInstance.result === 4562) return deleteHandle()
            if (editInstance.result !== 1) return
            self.initList(true)
        })
    }

    selectNavigationLinkHandle = () => {
        const self = this
        const { longTerm } = this.state
        const { tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority } = this.filter
        const defaultFilter = { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority }

        toast.show()
        import('./navigation/link').then(async ({ NavigationLink }) => {
            toast.destroy()

            const selectInstance = await FullscreenIframe({
                Element: NavigationLink,
                className: 'mobile-device-navigation-link',
                props: { defaultFilter }
            })

            if (selectInstance.result !== 1) return
            const navigationLink = selectInstance.data

            const longTerm = navigationLink.longTerm || { id: null, title: '' }
            const tags = navigationLink.tags || []
            const minEffectTimestamp = navigationLink.minEffectTimestamp || null
            const maxEffectTimestamp = navigationLink.maxEffectTimestamp || null
            const multipleStatus = navigationLink.multipleStatus || []
            const multiplePriority = navigationLink.multiplePriority || []
            this.filter = { tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority }
            Storage.filter.setHandle(tags, minEffectTimestamp, maxEffectTimestamp, multipleStatus, multiplePriority, longTerm)
            self.setState({ longTerm }, () => self.initList(true))
        })
    }

    editGroupPanelHandle = () => {
        const self = this
        const { longTerm } = this.state
        const longTermId = longTerm.id

        toast.show()
        import('./group-panel/record-detail').then(async ({ GroupPanelRecordDetail }) => {
            toast.destroy()

            const editInstance = await FullscreenIframe({
                Element: GroupPanelRecordDetail,
                className: 'group-panel-record-detail',
                props: { longTermId }
            })

            if (editInstance.result !== 1) return
            const groupPanel = editInstance.data

            const longTermRef = this.longTermRef.current
            longTermRef.refresh()
        })
    }

    enterLongTermHandle = longTermId => {
        const longTerm = { id: longTermId }
        this.setState({ longTerm }, () => this.initList(true))
    }

    render() {
        const { list, isShowBigCard, sort, count, longTerm } = this.state

        return <>
            <div className='list-top-operate flex-start-center'>
                <div className='top-operate-navigation flex-start flex-rest'>
                    <div className='list-top-button'
                        onClick={this.selectNavigationLinkHandle}
                    >Navigation</div>
                </div>
                <div className='switch-car-size'>
                    <div className='list-top-button'
                        onClick={() => this.setState({ isShowBigCard: !isShowBigCard })}
                    >{isShowBigCard ? 'Switch Small Card' : 'Switch Big Card'}</div>
                </div>
            </div>
            <div style={{ height: '50px' }} />

            <GroupPanel
                ref={this.longTermRef}
                longTermId={longTerm.id}
                onEditHandle={this.editGroupPanelHandle}
            />

            <TaskList
                list={list}
                isShowBigCard={isShowBigCard}
                enterLongTermHandle={this.enterLongTermHandle}
                editHandle={editId => this.showEditHandle({ isAdd: false, editId })}
            />

            <div className='list-operate-load' style={{ padding: '25px 15px 75px 15px' }}>
                {sort.value === 2 && <Button onClick={this.loadRandomHandle}>加载更多</Button>}
                {sort.value !== 2 && <Button onClick={this.loadMoreHandle}>加载更多({count - list.length}/{count})</Button>}
            </div>

            <CommonlyBottomOperate
                leftElement={[{
                    cilckHandle: this.selectFilterHandle,
                    element: 'filter'
                }]}
                rightElement={[{
                    cilckHandle: this.selectSortHandle,
                    element: sort.label
                }, {
                    cilckHandle: () => this.showEditHandle({ isAdd: true }),
                    element: 'add'
                }]}
            />
        </>
    }
}
