import CommonlyListItem from '../mobile/commonly-list-item'
import Button from '../button'
import ActionSheet from '../action-sheet'
import openMultipleSelect from '../multiple-selection-sheet'
import jsxStyle from '../jsx-style'
import TimeHelper from '../../../utils/time-helper'
import DatePicker from '../date-picker-sheet'
import FullscreenIframe from '../fullscreen-iframe'
import toast from '../toast'
import CONSTS from '../../../library/consts'
import configs from './../../configs'

import service from '../../service'

const props = {
    isMultipleFilter: false,
    initFilter: {
        tags: [
            // { id, name }
        ],
        longTerm: { id: null, title: '' },
        minEffectTimestamp: null,
        maxEffectTimestamp: null,
        status: { value: null, label: null },
        priority: { value: null, label: null },
        multipleStatus: [
            // { value: null, label: null }
        ],
        multiplePriority: [
            // { value: null, label: null }
        ]
    }
}

export class FilterEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tagOptions: [
                // { value: null, label: null }
            ],
            tagFilter: [
                // { id, name }
            ],
            longTermOptions: [
                // { value: null, label: null }
            ],
            longTermFilter: { id: null, title: '' },
            minEffectTimestampFilter: null,
            maxEffectTimestampFilter: null,
            statusFilter: { value: null, label: null },
            statusMultipleFilter: [
                // 1
            ],
            priorityFilter: { value: null, label: null },
            priorityMultipleFilter: [
                // 1
            ]
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

        this.setState({ tagOptions: tags.map(({ id, name }) => ({ value: id, label: name })) })
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

        this.setState({ longTermOptions }, this.onChangeHook)
    }

    selectLongTermTaskHandle = async () => {
        const { longTermOptions } = this.state
        const selectInstance = await ActionSheet({ title: '请选择 Long Term Task', options: longTermOptions })
        if (selectInstance.result !== 1) return
        const longTerm = selectInstance.data
        this.setState({ longTermFilter: { id: longTerm.value, title: longTerm.label } }, this.onChangeHook)
    }

    cancelSelectLongTermTaskHandle = () => this.setState({ longTermFilter: { id: null, title: '' } }, this.onChangeHook)

    effectTimePickHandle = async field => {
        let state = this.state
        const pickerInstance = await DatePicker({ scriptUrl: `${configs.libraryProfixUrl}lib/picka-date/rolldate.min.js` })
        if (pickerInstance.result !== 1) return
        const timestamp = pickerInstance.data
        state[field] = timestamp
        this.setState(state, this.onChangeHook)
    }

    selectTagFilterHandle = async () => {
        const { tagOptions } = this.state
        const selectInstance = await openMultipleSelect(tagOptions)
        if (selectInstance.result !== 1) return
        const tagFilter = selectInstance.data.map(tag => ({ id: tag.value, name: tag.label }))
        this.setState({ tagFilter }, this.onChangeHook)
    }

    selectStatusFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.status)
        const selectInstance = await ActionSheet({ title: '请选择任务状态', options })
        if (selectInstance.result !== 1) return
        this.setState({ statusFilter: selectInstance.data }, this.onChangeHook)
    }

    selectPriorityFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.priority)
        const selectInstance = await ActionSheet({ title: '请选择任务优先级', options })
        if (selectInstance.result !== 1) return
        this.setState({ priorityFilter: selectInstance.data }, this.onChangeHook)
    }

    selectStatusMultipleFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.status)
        const selectInstance = await ActionSheet({ title: '请选择需要筛选的任务状态', options, isMultiple: true })
        if (selectInstance.result !== 1) return
        this.setState({ statusMultipleFilter: selectInstance.data }, this.onChangeHook)
    }

    selectPriorityMultipleFilterHandle = async () => {
        const options = CONSTS.utils.toDefaultDownSelectFormat(CONSTS.task.priority)
        const selectInstance = await ActionSheet({ title: '请选择需要筛选的任务优先级', options, isMultiple: true })
        if (selectInstance.result !== 1) return
        this.setState({ priorityMultipleFilter: selectInstance.data }, this.onChangeHook)
    }

    tagOptionManage = () => {
        const self = this

        toast.show()
        import('../../page/entry/common-components/tag-edit').then(async ({ TagEdit }) => {
            toast.destroy()
            const selectInstance = await FullscreenIframe({
                Element: TagEdit,
                className: 'mobile-device-task-tag-edit',
                props: {}
            })

            if (selectInstance.result !== 1) return
            const tagOptions = selectInstance.data
            self.setState({ tagOptions }, this.onChangeHook)
        })
    }

    longTermOptionManage = () => {
        const self = this

        toast.show()
        import('../../page/entry/common-components/long-term-edit').then(async ({ LongTermEdit }) => {
            toast.destroy()
            const selectInstance = await FullscreenIframe({
                Element: LongTermEdit,
                className: 'mobile-device-task-long-term-edit',
                props: {}
            })

            if (selectInstance.result !== 1) return
            const longTermOptions = selectInstance.data
            self.setState({ longTermOptions }, this.onChangeHook)
        })
    }

    getResult() {
        return this.state
    }

    onChangeHook = () => {
        const { onChangeHook } = this.props
        if (!onChangeHook) return
        onChangeHook()
    }

    render() {
        const { isMultipleFilter } = this.props
        const {
            longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter,
            tagFilter, statusFilter, priorityFilter, statusMultipleFilter, priorityMultipleFilter
        } = this.state

        return <>
            <CommonlyListItem key='long-term-task'
                title={isMultipleFilter ? '是否选择过滤(Long Term Task)项目?' : '此项目是否为(Long Term Task)项目?'}
            >
                <>
                    <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                        <Button
                            style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                            onClick={this.selectLongTermTaskHandle}
                        >
                            {longTermFilter.id ?
                                `${isMultipleFilter ? '过滤' : ''}长期项目: ${longTermFilter.title}` :
                                `不${isMultipleFilter ? '过滤' : '属于'}长期任务项目`
                            }
                        </Button>
                        <Button
                            style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                            onClick={this.longTermOptionManage}
                        >管理</Button>
                    </div>
                    <div style={{ height: '5px' }}></div>
                    {longTermFilter.id && <Button
                        style={{ backgroundColor: '#F2F2F2', color: '#626675', border: '1px solid #fff' }}
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
                        >{minEffectTimestampFilter ? TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(minEffectTimestampFilter)) : 'Start Time'}</Button>
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
                        >{maxEffectTimestampFilter ? TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(maxEffectTimestampFilter)) : 'End Time'}</Button>
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
                    <div style={{ ...jsxStyle.basicFlex.startCenter }}>
                        <Button
                            style={{ ...jsxStyle.basicFlex.rest, borderRadius: '4px 0px 0px 4px' }}
                            onClick={this.selectTagFilterHandle}
                        >{tagFilter.length > 0 ? tagFilter.map(tag => tag.name).join('、') : '请选择需要过滤的标签'}</Button>
                        <Button
                            style={{ minWidth: '60px', borderRadius: '0px 4px 4px 0px', borderLeft: '1px solid #fff' }}
                            onClick={this.tagOptionManage}
                        >管理</Button>
                    </div>
                    {tagFilter.length > 0 && <>
                        <div style={{ height: '5px' }}></div>
                        <Button key='tag-filter-cancel'
                            style={{ backgroundColor: '#F2F2F2', color: '#626675', border: '1px solid #fff' }}
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
                                style={{ backgroundColor: '#F2F2F2', color: '#626675', border: '1px solid #fff' }}
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
                                style={{ backgroundColor: '#F2F2F2', color: '#626675', border: '1px solid #fff' }}
                                onClick={() => this.setState({ priorityMultipleFilter: [] })}
                            >取消任务优先级过滤</Button>
                        </>}
                    </>
                </CommonlyListItem>
            </>}
        </>
    }
}

export default FilterEdit
