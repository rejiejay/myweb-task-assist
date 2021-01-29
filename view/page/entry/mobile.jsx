import ActionSheet from './../../components/action-sheet'
import FullscreenIframe from './../../components/fullscreen-iframe'
import Button from './../../components/button'
import toast from './../../components/toast'
import CONSTS from './../../../library/consts'

import service from './service.js'
import TaskList from './mobile-components/task-car'

export class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowBigCard: false,

            list: [],
            count: 0,
            pageNo: 1,
            pageSize: CONSTS.defaultPageSize,

            sort: { value: 1, label: 'Sort' },
            longTerm: { id: null, title: '' } // 长期的任务不进行多选
        }

        this.filter = {
            tags: [],
            minEffectTimestamp: null,
            maxEffectTimestamp: null,
            multipleStatus: [],
            multiplePriority: []
        }
    }

    componentDidMount() {
        this.initList()
    }

    initList = async () => {
        const { longTerm, sort } = this.state
        const filter = { longTerm, ...this.filter }
        const fetchInstance = await service.getTaskList(filter, sort)
        if (fetchInstance.result !== 1) return
        const fetch = fetchInstance.data

        this.setState({ list: fetch.list, count: fetch.count })
    }

    selectSortHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.sort)
        const selectInstance = await ActionSheet({
            title: '请选择排序',
            options
        })

        if (selectInstance.result !== 1) return

        const sort = selectInstance.data

        this.setState({ sort }, this.initList)
    }

    selectFilterHandle = () => {
        const self = this
        const initFilter = {
            longTerm: this.state.longTerm,
            ...this.filter
        }

        toast.show()
        import('./common-components/filter-edit').then(async ({ FilterEdit }) => {
            toast.destroy()
            const selectInstance = await FullscreenIframe({
                Element: FilterEdit,
                className: 'mobile-device-task-filter-edit',
                props: {
                    isMultipleFilter: true,
                    initFilter
                }
            })

            if (selectInstance.result !== 1) return
            const filter = selectInstance.data

            self.filter = {
                tags: filter.tagFilter,
                minEffectTimestamp: filter.minEffectTimestamp,
                maxEffectTimestamp: filter.maxEffectTimestamp,
                multipleStatus: filter.statusMultipleFilter,
                multiplePriority: filter.priorityMultipleFilter
            }
            self.setState({ longTerm: filter.longTermFilter }, self.initList)
        })
    }

    loadRandomHandle = () => this.setState({ pageNo: 1 }, this.initList)

    loadMoreHandle = () => {
        const { list, count, pageNo } = this.state
        if (list.length === count) return toast.show('All have been loaded')
        this.setState({ pageNo: ++pageNo }, this.initList)
    }

    render() {
        const { list, isShowBigCard, sort, count } = this.state

        return <>
            <div className='list-top-operate flex-start-center'>
                <div className='top-operate-navigation flex-start flex-rest'>
                    <div className='list-top-button'>Navigation</div>
                </div>
                <div className='switch-car-size'>
                    <div className='list-top-button'
                        onClick={() => this.setState({ isShowBigCard: !isShowBigCard })}
                    >{isShowBigCard ? 'Switch Small Car' : 'Switch Big Car'}</div>
                </div>
            </div>

            <TaskList
                list={list}
                isShowBigCard={isShowBigCard}
            />

            <div className='list-operate-load'>
                {sort.value === 2 && <Button onClick={this.loadRandomHandle}>加载更多</Button>}
                {sort.value !== 2 && <Button onClick={this.loadMoreHandle}>加载更多({count - list.length}/{count})</Button>}
            </div>

            <div className='list-bottom-operate flex-start-center'>
                <div className='bottom-operate-filter flex-start flex-rest'>
                    <div className='list-bottom-button right-line' onClick={this.selectFilterHandle}>Filter</div>
                </div>
                <div className='bottom-operate-sort'>
                    <div className='list-bottom-button left-line' onClick={this.selectSortHandle}>{sort.label}</div>
                </div>
            </div>
        </>
    }
}
