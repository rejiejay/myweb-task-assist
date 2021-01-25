import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import Button from './../../../components/button'
import ActionSheet from './../../../components/action-sheet'
import jsxStyle from './../../../components/jsx-style'
import timeTransformers from './../../../../utils/time-transformers'
import DatePicker from './../../../components/date-picker-sheet'
import CONSTS from './../../../../library/consts'

import service from './../service'

export class FilterEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tagOptions: [],
            tagFilter: [],
            longTermOptions: [],
            longTermFilter: {
                id: null,
                des: ''
            },
            minEffectTimestampFilter: null,
            maxEffectTimestampFilter: null,
            statusFilter: { value: null, lable: null },
            priorityFilter: { value: null, lable: null }
        }
    }

    async componentDidMount() {
        this.initTaskTagFilter()
        await this.initAllTaskTagInfor()
        await this.initTaskLongTermInfor()
    }

    async initAllTaskTagInfor() {
        const fetchInstance = await service.getAllTaskTagInfor()
        if (fetchInstance.result !== 1) return
        const tags = fetchInstance.data

        this.setState({ tagOptions: tags.map(tag => ({ value: tag, label: tag })) })
    }

    initTaskTagFilter() {
        const { tagFilter } = this.props
        if (!tagFilter) return

        this.setState({ tagFilter })
    }

    async initTaskLongTermInfor() {
        const { longTermFilterId } = this.props
        let { longTermFilter } = this.state

        const fetchInstance = await service.getAllLongTermTask()
        if (fetchInstance.result !== 1) return
        const allLongTermTask = fetchInstance.data

        const longTermOptions = allLongTermTask.map(longTerm => ({ value: longTerm.id, label: longTerm.title }))

        if (longTermFilterId) longTermFilter = longTermOptions.reduce((filter, longTerm) => {
            if (longTermFilterId === longTerm.value) filter = { id: longTerm.value, des: longTerm.label }
            return filter
        }, longTermFilter);

        this.setState({ longTermOptions, longTermFilter })
    }

    selectLongTermTaskHandle = async () => {
        const { longTermOptions } = this.state
        const selectInstance = await ActionSheet({ title: '请选择 Long Term Task', options: longTermOptions })
        if (selectInstance.result !== 1) return
        const longTerm = selectInstance.data
        this.setState({ longTermFilter: { id: longTerm.value, des: longTerm.label } })
    }

    cancelSelectLongTermTaskHandle = () => this.setState({ longTermFilter: { id: null, des: '' } })

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
        const selectInstance = await ActionSheet({ title: '请选择需要筛选的任务状态', options })
        if (selectInstance.result !== 1) return
        this.setState({ statusFilter: selectInstance.data })
    }

    selectPriorityFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.priority)
        const selectInstance = await ActionSheet({ title: '请选择需要筛选的任务优先级', options })
        if (selectInstance.result !== 1) return
        this.setState({ statusFilter: selectInstance.data })
    }

    render() {
        const {
            longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter,
            tagFilter, statusFilter, priorityFilter
        } = this.state

        return <div className='filter-edit-container'>
            <CommonlyListItem key='long-term-task'
                title='是否为(Long Term Task)项目?'
            >
                <>
                    <Button style={{ ...jsxStyle.basicFlex.startCenter }}
                        onClick={this.selectLongTermTaskHandle}
                    >
                        {longTermFilter.id ?
                            `属于长期项目: ${longTermFilter.des}` :
                            '不属于长期任务项目'
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
                    <div style={{ height: '5px' }}></div>
                    {tagFilter.length > 0 && <Button key='tag-filter-cancel'
                        style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
                        onClick={() => this.setState({ tagFilter: [] })}
                    >取消标签过滤</Button>}
                </>
            </CommonlyListItem>
            <CommonlyListItem key='task-status-filter'
                title='任务状态筛选器'
            >
                <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                    <Button
                        style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                        onClick={this.selectStatusFilterHandle}
                    >{statusFilter.value ? statusFilter.label : '请选择任务筛状选态'}</Button>
                    <Button
                        style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                        onClick={() => this.setState({ statusFilter: { value: null, lable: null } })}
                        isDisabled={!statusFilter}
                    >Clear</Button>
                </div>
            </CommonlyListItem>
            <CommonlyListItem key='task-status-priority'
                title='任务优先级筛选器'
            >
                <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                    <Button
                        style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                        onClick={this.selectPriorityFilterHandle}
                    >{priorityFilter.value ? priorityFilter.label : '任务优先级筛选器'}</Button>
                    <Button
                        style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                        onClick={() => this.setState({ priorityFilter: { value: null, lable: null } })}
                        isDisabled={!priorityFilter}
                    >Clear</Button>
                </div>
            </CommonlyListItem>
            <div style={{ height: '15px' }}></div>
            <div style={{ borderTop: '1px solid #ddd' }}></div>
            <div style={{ height: '15px' }}></div>
            <Button
                style={{ backgroundColor: '#1890ff' }}
            >确认</Button>
            <div style={{ height: '5px' }}></div>
            <Button
                style={{ backgroundColor: '#F2F2F2', color: '#626675' }}
            >取消</Button>
        </div>
    }
}

export default FilterEdit
