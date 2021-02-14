import ActionSheet from './../../components/action-sheet'
import FullscreenIframe from './../../components/fullscreen-iframe'
import Button from './../../components/button'
import toast from './../../components/toast'
import CommonlyBottomOperate from './../../components/mobile/commonly-bottom-operate'
import CONSTS from './../../../library/consts'
import ArrayHelper from './../../../utils/array-helper'

import service from './service.js'
import utils from './utils.js'
import TaskList from './mobile-components/task-card'
import GroupPanel from './mobile-components/group-panel'

export class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowBigCard: false,

            list: [
                // service\task\data-access-object.js
            ],
            count: 0,
            pageNo: 1,
            pageSize: CONSTS.defaultPageSize,

            sort: { value: 1, label: 'Sort' },
            longTerm: { id: null, title: '' } // 长期的任务不进行多选
        }

        this.filter = {
            tags: [
                // { id, name }
            ],
            minEffectTimestamp: null,
            maxEffectTimestamp: null,
            multipleStatus: [
                // library\consts\task.js -> status
            ],
            multiplePriority: [
                // library\consts\task.js -> priority
            ]
        }
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

        this.filter = {
            tags: filter.tagFilter,
            minEffectTimestamp: filter.minEffectTimestampFilter,
            maxEffectTimestamp: filter.maxEffectTimestampFilter,
            multipleStatus: filter.statusMultipleFilter,
            multiplePriority: filter.priorityMultipleFilter
        }
        this.setState({ longTerm: filter.longTermFilter }, () => this.initList(true))
    }

    loadRandomHandle = () => this.setState({ pageNo: 1 }, this.initList)

    loadMoreHandle = () => {
        const { list, count, pageNo } = this.state
        if (list.length === count) return toast.show('All have been loaded')
        this.setState({ pageNo: pageNo + 1 }, this.initList)
    }

    showEditHandle = ({ isAdd, editId } = {}) => {
        const self = this
        const { longTerm } = this.state
        const { tags } = this.filter

        let props = {}
        if (!isAdd) props.id = editId
        if (!!longTerm.id) props.longTerm = longTerm
        if (tags.length > 0) props.tags = tags

        toast.show()
        import('./edit/mobile').then(async ({ TaskEdit }) => {
            toast.destroy()
            const editInstance = await FullscreenIframe({
                Element: TaskEdit,
                className: 'mobile-device-task-edit',
                props
            })

            if (editInstance.result !== 1) return
            self.initList(true)
        })
    }

    selectNavigationLinkHandle = () => {
        const self = this

        toast.show()
        import('./navigation/link').then(async ({ NavigationLink }) => {
            toast.destroy()

            const selectInstance = await FullscreenIframe({
                Element: NavigationLink,
                className: 'mobile-device-navigation-link',
                props: {}
            })

            if (selectInstance.result !== 1) return
            const navigationLink = selectInstance.data

            self.filter = {
                tags: navigationLink.tags,
                minEffectTimestamp: navigationLink.minEffectTimestamp,
                maxEffectTimestamp: navigationLink.maxEffectTimestamp,
                multipleStatus: navigationLink.multipleStatus,
                multiplePriority: navigationLink.multiplePriority
            }
            self.setState({ longTerm: navigationLink.longTerm }, () => self.initList(true))
        })
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
                    >{isShowBigCard ? 'Switch Small Car' : 'Switch Big Car'}</div>
                </div>
            </div>
            <div style={{ height: '50px' }} />

            <GroupPanel longTermId={longTerm.id} />

            <TaskList
                list={list}
                isShowBigCard={isShowBigCard}
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
