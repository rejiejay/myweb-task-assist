import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import Button from './../../../components/button'
import ActionSheet from './../../../components/action-sheet'
import jsxStyle from './../../../components/jsx-style'
import timeTransformers from './../../../../utils/time-transformers'
import consequencer from './../../../../utils/consequencer'
import DatePicker from './../../../components/date-picker-sheet'
import Confirm from './../../../components/confirm'
import CONSTS from './../../../../library/consts'

import service from './../service'

const props = {
    resolve: () => {},
    reject: () => {},
    isMultipleFilter: false,
    initFilter: {
        tags: [],
        longTerm: { id: null, title: '' },
        minEffectTimestamp: null,
        maxEffectTimestamp: null,
        status: { value: null, label: null },
        priority: { value: null, label: null },
        multipleStatus: [],
        multiplePriority: []
    }
}

export class FilterEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tagOptions: [],
            tagFilter: [],
            longTermOptions: [],
            longTermFilter: { id: null, title: '' },
            minEffectTimestampFilter: null,
            maxEffectTimestampFilter: null,
            statusFilter: { value: null, label: null },
            statusMultipleFilter: [],
            priorityFilter: { value: null, label: null },
            priorityMultipleFilter: []
        }
    }

    async componentDidMount() {
        this.initTaskFilter()
        await this.initAllTaskTagInfor()
        await this.initTaskLongTermInfor()
    }

    async initAllTaskTagInfor() {
        const fetchInstance = await service.getAllTaskTagInfor()
        if (fetchInstance.result !== 1) return
        const tags = fetchInstance.data

        this.setState({ tagOptions: tags.map(tag => ({ value: tag, label: tag })) })
    }

    initTaskFilter() {
        const { isMultipleFilter, initFilter } = this.props
        let state = JSON.parse(JSON.stringify(this.state))
        if (!initFilter) return

        if (initFilter.tags) state.tagFilter = initFilter.tags
        if (initFilter.longTerm) state.longTermFilter = initFilter.longTerm
        if (initFilter.minEffectTimestamp) state.minEffectTimestampFilter = initFilter.minEffectTimestamp
        if (initFilter.maxEffectTimestamp) state.maxEffectTimestampFilter = initFilter.maxEffectTimestamp
        if (!!isMultipleFilter) {
            if (initFilter.multipleStatus) state.statusMultipleFilter = initFilter.multipleStatus
            if (initFilter.multiplePriority) state.priorityMultipleFilter = initFilter.multiplePriority
        }
        if (!isMultipleFilter) {
            if (initFilter.status) state.statusFilter = initFilter.status
            if (initFilter.priority) state.priorityFilter = initFilter.priority
        }

        this.setState(state)
    }

    async initTaskLongTermInfor() {
        const fetchInstance = await service.getAllLongTermTask()
        if (fetchInstance.result !== 1) return
        const allLongTermTask = fetchInstance.data

        const longTermOptions = allLongTermTask.map(longTerm => ({ value: longTerm.id, label: longTerm.title }))

        this.setState({ longTermOptions })
    }

    selectLongTermTaskHandle = async () => {
        const { longTermOptions } = this.state
        const selectInstance = await ActionSheet({ title: '请选择 Long Term Task', options: longTermOptions })
        if (selectInstance.result !== 1) return
        const longTerm = selectInstance.data
        this.setState({ longTermFilter: { id: longTerm.value, title: longTerm.label } })
    }

    cancelSelectLongTermTaskHandle = () => this.setState({ longTermFilter: { id: null, title: '' } })

    effectTimePickHandle = async field => {
        let state = this.state
        const pickerInstance = await DatePicker({ scriptUrl: `./lib/picka-date/rolldate.min.js` })
        if (pickerInstance.result !== 1) return
        const timestamp = pickerInstance.data
        state[field] = timestamp
        this.setState(state)
    }

    selectTagFilterHandle = async () => {
        const { tagOptions } = this.state
        const selectInstance = await ActionSheet({ title: '请选择需要过滤的标签', options: tagOptions, isMultiple: true })
        if (selectInstance.result !== 1) return
        const tagFilter = selectInstance.data.map(tags => tags.value)
        this.setState({ tagFilter })
    }

    selectStatusFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.status)
        const selectInstance = await ActionSheet({ title: '请选择任务状态', options })
        if (selectInstance.result !== 1) return
        this.setState({ statusFilter: selectInstance.data })
    }

    selectPriorityFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.priority)
        const selectInstance = await ActionSheet({ title: '请选择任务优先级', options })
        if (selectInstance.result !== 1) return
        this.setState({ priorityFilter: selectInstance.data })
    }

    selectStatusMultipleFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.status)
        const selectInstance = await ActionSheet({ title: '请选择需要筛选的任务状态', options, isMultiple: true })
        if (selectInstance.result !== 1) return
        this.setState({ statusMultipleFilter: selectInstance.data })
    }

    selectPriorityMultipleFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.priority)
        const selectInstance = await ActionSheet({ title: '请选择需要筛选的任务优先级', options, isMultiple: true })
        if (selectInstance.result !== 1) return
        this.setState({ priorityMultipleFilter: selectInstance.data })
    }

    confirmResolveHandle = async () => {
        const { resolve } = this.props
        const { tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, statusFilter, statusMultipleFilter, priorityFilter, priorityMultipleFilter } = this.state
        const comfirmInstance = await Confirm('选择确认?')
        if (comfirmInstance.result !== 1) return
        resolve(consequencer.success({ tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, statusFilter, statusMultipleFilter, priorityFilter, priorityMultipleFilter }))
    }

    cancelRejectHandle = async () => {
        const { reject } = this.props
        const comfirmInstance = await Confirm('确认需要取消?')
        if (comfirmInstance.result !== 1) return
        reject()
    }

    render() {
        const { isMultipleFilter } = this.props
        const {
            longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter,
            tagFilter, statusFilter, priorityFilter, statusMultipleFilter, priorityMultipleFilter
        } = this.state

        return <div className='filter-edit-container'>
            <CommonlyListItem key='long-term-task'
                title={isMultipleFilter ? '是否选择过滤(Long Term Task)项目?' : '此项目是否为(Long Term Task)项目?'}
            >
                <>
                    <Button style={{ ...jsxStyle.basicFlex.startCenter }}
                        onClick={this.selectLongTermTaskHandle}
                    >
                        {longTermFilter.id ?
                            `${isMultipleFilter ? '过滤' : ''}长期项目: ${longTermFilter.title}` :
                            `不${isMultipleFilter ? '过滤' : '属于'}长期任务项目`
                        }
                    </Button>
                    <div style={{ height: '5px' }}></div>
                    {longTermFilter.id && <Button
                        style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                        onClick={this.cancelSelectLongTermTaskHandle}
                    >取消选择长期</Button>}
                </>
            </CommonlyListItem>
            <CommonlyListItem key='time-filter'
                title='时间过滤器'
            >
                <>
                    <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                        <Button
                            style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                            onClick={() => this.effectTimePickHandle('minEffectTimestampFilter')}
                            isError={minEffectTimestampFilter && maxEffectTimestampFilter && (minEffectTimestampFilter >= maxEffectTimestampFilter)}
                        >{minEffectTimestampFilter ? timeTransformers.dateToYYYYmmDDhhMM(new Date(minEffectTimestampFilter)) : 'Start Time'}</Button>
                        <Button
                            style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                            onClick={() => this.setState({ minEffectTimestampFilter: null })}
                            isDisabled={!minEffectTimestampFilter}
                        >Cancel</Button>
                    </div>
                    <div>-</div>
                    <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                        <Button
                            style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                            onClick={() => this.effectTimePickHandle('maxEffectTimestampFilter')}
                            isError={minEffectTimestampFilter && maxEffectTimestampFilter && (maxEffectTimestampFilter <= minEffectTimestampFilter)}
                        >{maxEffectTimestampFilter ? timeTransformers.dateToYYYYmmDDhhMM(new Date(maxEffectTimestampFilter)) : 'End Time'}</Button>
                        <Button
                            style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                            onClick={() => this.setState({ maxEffectTimestampFilter: null })}
                            isDisabled={!maxEffectTimestampFilter}
                        >Cancel</Button>
                    </div>
                </>
            </CommonlyListItem>
            <CommonlyListItem key='tag-filter'
                title='标签Tag过滤器'
            >
                <>
                    <Button key='tag-filter-select'
                        onClick={this.selectTagFilterHandle}
                    >
                        {tagFilter.length > 0 ?
                            tagFilter.join('、') :
                            '请选择需要过滤的标签'
                        }
                    </Button>
                    {tagFilter.length > 0 && <>
                        <div style={{ height: '5px' }}></div>
                        <Button key='tag-filter-cancel'
                            style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                            onClick={() => this.setState({ tagFilter: [] })}
                        >取消标签过滤</Button>
                    </>}
                </>
            </CommonlyListItem>
            {!isMultipleFilter && <>
                <CommonlyListItem key='task-status-filter'
                    title='任务状态'
                >
                    <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                        <Button
                            style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                            onClick={this.selectStatusFilterHandle}
                        >{statusFilter.value ? statusFilter.label : '请选择任务状态'}</Button>
                        <Button
                            style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                            onClick={() => this.setState({ statusFilter: { value: null, label: null } })}
                            isDisabled={!statusFilter}
                        >Clear</Button>
                    </div>
                </CommonlyListItem>
                <CommonlyListItem key='task-status-priority'
                    title='任务优先级'
                >
                    <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                        <Button
                            style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                            onClick={this.selectPriorityFilterHandle}
                        >{priorityFilter.value ? priorityFilter.label : '请选择任务优先级'}</Button>
                        <Button
                            style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                            onClick={() => this.setState({ priorityFilter: { value: null, label: null } })}
                            isDisabled={!priorityFilter}
                        >Clear</Button>
                    </div>
                </CommonlyListItem>
            </>}
            {!!isMultipleFilter && <>
                <CommonlyListItem key='task-status-filter'
                    title='任务状态筛选器'
                >
                    <>
                        <Button key='tag-filter-select'
                            onClick={this.selectStatusMultipleFilterHandle}
                        >
                            {statusMultipleFilter.length > 0 ?
                                statusMultipleFilter.map(filter => filter.label).join('、') :
                                '请选择需要过滤的任务状态'
                            }
                        </Button>
                        {statusMultipleFilter.length > 0 && <>
                            <div style={{ height: '5px' }}></div>
                            <Button key='tag-filter-cancel'
                                style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                                onClick={() => this.setState({ statusMultipleFilter: [] })}
                            >取消任务状态过滤</Button>
                        </>}
                    </>
                </CommonlyListItem>
                <CommonlyListItem key='task-status-priority'
                    title='任务优先级筛选器'
                >
                    <>
                        <Button key='tag-filter-select'
                            onClick={this.selectPriorityMultipleFilterHandle}
                        >
                            {priorityMultipleFilter.length > 0 ?
                                priorityMultipleFilter.map(filter => filter.label).join('、') :
                                '请选择需要过滤的任务优先级'
                            }
                        </Button>
                        {priorityMultipleFilter.length > 0 && <>
                            <div style={{ height: '5px' }}></div>
                            <Button key='tag-filter-cancel'
                                style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                                onClick={() => this.setState({ priorityMultipleFilter: [] })}
                            >取消任务优先级过滤</Button>
                        </>}
                    </>
                </CommonlyListItem>
            </>}
            <div style={{ height: '15px' }}></div>
            <div style={{ borderTop: '1px solid #ddd' }}></div>
            <div style={{ height: '15px' }}></div>
            <Button
                style={{ backgroundColor: '#1890ff' }}
                onClick={this.confirmResolveHandle}
            >确认</Button>
            <div style={{ height: '5px' }}></div>
            <Button
                style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                onClick={this.cancelRejectHandle}
            >取消</Button>
        </div>
    }
}

export default FilterEdit
