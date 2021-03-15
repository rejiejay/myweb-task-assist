import TimeHelper from './../../../../utils/time-helper'
import consequencer from './../../../../utils/consequencer'

import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import CommonlyInputText from './../../../components/mobile/commonly-input-text'
import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import Button from './../../../components/button'
import toast from './../../../components/toast'
import Confirm from './../../../components/confirm'

import service from './../../../service'
import utils from './../utils'
import CONSTS from '../../../../library/consts'

const props = {
    resolve: () => { },
    reject: () => { },
    id: null,
    longTerm: { id: null, title: '' },
    tags: [
        // "exam", "love"
    ]
}

export class TaskEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: null,

            title: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',

            longTerm: { id: null, title: '' },
            tags: [
                // { id, name }
            ],
            minEffectTimestamp: null,
            maxEffectTimestamp: null,
            status: { value: null, label: null },
            priority: { value: null, label: null },

            inputFocusField: ''
        }

        this.isEdit = false
        this.task = { id: null, title: '', content: '', specific: '', measurable: '', attainable: '', relevant: '', timeBound: '', longTerm: { id: null, title: '' }, tags: [], minEffectTimestamp: null, maxEffectTimestamp: null, status: { value: null, label: null }, priority: { value: null, label: null } }
    }

    componentDidMount() {
        const { id } = this.props

        if (id) this.initPageData(id)
    }

    initPageData = async id => {
        this.isEdit = true
        const getInstance = await service.getTaskById(id)
        if (getInstance.result !== 1) return
        const task = getInstance.data
        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            taskTagId, longTermId, minEffectTimestamp, maxEffectTimestamp
        } = task

        let longTerm = { id: null, title: '' }
        if (longTermId) {
            const fetchLongTermTaskInstance = await service.getLongTermTask(longTermId)
            const longTermTask = fetchLongTermTaskInstance.data
            if (fetchLongTermTaskInstance.result === 1) longTerm = { id: longTermId, title: longTermTask.title }
        }

        let tags = []
        if (taskTagId) {
            const fetchTaskTagInforInstance = await service.getTaskTagInfor(taskTagId)
            const taskTagInfor = fetchTaskTagInforInstance.data
            if (fetchTaskTagInforInstance.result === 1) tags = taskTagInfor.map(({ id, name }) => ({ id, name }))
        }

        let status = { value: null, label: null }
        if (task.status) {
            status.value = task.status
            status.label = utils.initStatusLable(task.status)
        }

        let priority = { value: null, label: null }
        if (task.priority) {
            priority.value = task.priority
            priority.label = utils.initPriorityLable(task.priority)
        }

        this.task = {
            id,
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        }
        this.setState(this.task)
    }

    selectFilterHandle = async () => {
        const isMultipleFilter = false
        const { longTerm, tags, status, priority, minEffectTimestamp, maxEffectTimestamp } = this.state
        const initFilter = { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority }

        const selectInstance = await utils.showOperateFilterEdit(isMultipleFilter, initFilter)
        if (selectInstance.result !== 1) return
        const filter = selectInstance.data
        let minEffectTimestampFilter = filter.minEffectTimestampFilter
        let maxEffectTimestampFilter = filter.maxEffectTimestampFilter
        if (filter.effectTimestampRangeFilter) {
            const effectTimestampRange = CONSTS.utils.viewValueToServiceView(CONSTS.task.effectTimestampRange, filter.effectTimestampRangeFilter)
            minEffectTimestampFilter = new Date().getTime()
            maxEffectTimestampFilter = minEffectTimestampFilter + effectTimestampRange
        }

        this.setState({
            longTerm: filter.longTermFilter,
            tags: filter.tagFilter,
            minEffectTimestamp: minEffectTimestampFilter,
            maxEffectTimestamp: maxEffectTimestampFilter,
            status: filter.statusFilter,
            priority: filter.priorityFilter
        })
    }

    renderEffectTimestamp = () => {
        const { minEffectTimestamp, maxEffectTimestamp } = this.state
        const effectTimestampArray = []
        if (!!minEffectTimestamp) effectTimestampArray.push(`min ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+minEffectTimestamp))}`)
        if (!!maxEffectTimestamp) effectTimestampArray.push(`max ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+maxEffectTimestamp))}`)

        return effectTimestampArray.join(' - ')
    }

    initSubmitData = () => {
        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        } = this.state

        let submitData = { title, content, specific, measurable, attainable, relevant, timeBound }

        if (!!longTerm.id) submitData.longTermId = longTerm.id
        if (!!minEffectTimestamp) submitData.minEffectTimestamp = minEffectTimestamp
        if (!!maxEffectTimestamp) submitData.maxEffectTimestamp = maxEffectTimestamp
        if (tags.length > 0) submitData.tagsId = tags.map(tag => tag.id)
        if (status.value) submitData.status = status.value
        if (priority.value) submitData.priority = priority.value

        return submitData
    }

    confirmHandle = async () => {
        const { resolve } = this.props
        const { id } = this.task
        const isEdit = this.isEdit

        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        } = this.state

        if (!title) return toast.show('标题不能为空')
        if (!content) return toast.show('内容不能为空')

        const confirmInstance = await Confirm('确认要提交吗?')
        if (confirmInstance.result !== 1) return

        const submitData = this.initSubmitData()

        const fetchInstance = isEdit ? await service.editTask({ id, ...submitData }) : await service.addTask(submitData)
        if (fetchInstance.result !== 1) return Confirm(`${isEdit ? '编辑' : '添加'}任务失败, 原因: ${fetchInstance.message}`)

        resolve(consequencer.success(fetchInstance.data))
    }

    bottomOperateFilter = element => {
        const { id } = this.task
        const { title, content } = this.state
        const isEdit = !!id
        const isDiff = this.verifyTaskDiff()
        const isCanSubmit = !!title && !!content

        if (element.key === 'delete') {
            if (isEdit) return true
            return false
        }

        if (!isCanSubmit && (element.key === 'save' || element.key === 'confirm')) return false

        if (element.key === 'save') {
            if (isDiff) return true
            return false
        }

        if (element.key === 'confirm' && isDiff) return false

        return true
    }

    deleteHandle = async () => {
        const { id } = this.task
        const confirmInstance = await Confirm('确认删除吗?')
        if (confirmInstance.result !== 1) return

        const deleteInstance = await service.deleteTask(id)
        if (deleteInstance.result !== 1) return Confirm(deleteInstance.message)
        this.props.resolve(consequencer.success({}, 'delete', 4562))
    }

    verifyTaskDiff = () => {
        let isDiff = false
        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority,
        } = this.state
        const task = this.task

        if (title !== task.title) isDiff = true
        if (content !== task.content) isDiff = true
        if (specific !== task.specific) isDiff = true
        if (measurable !== task.measurable) isDiff = true
        if (attainable !== task.attainable) isDiff = true
        if (relevant !== task.relevant) isDiff = true
        if (timeBound !== task.timeBound) isDiff = true
        if (longTerm.id !== task.longTerm.id) isDiff = true
        if (JSON.stringify(tags) !== JSON.stringify(task.tags)) isDiff = true
        if (minEffectTimestamp !== task.minEffectTimestamp) isDiff = true
        if (maxEffectTimestamp !== task.maxEffectTimestamp) isDiff = true
        if (status.value !== task.status.value) isDiff = true
        if (priority.value !== task.priority.value) isDiff = true

        return isDiff
    }

    temporaryStorageHandle = async () => {
        const { id } = this.task
        const isEdit = this.isEdit
        const submitData = this.initSubmitData()

        const fetchInstance = isEdit ? await service.editTask({ id, ...submitData }) : await service.addTask(submitData)
        if (fetchInstance.result !== 1) return Confirm(`${isEdit ? '编辑' : '添加'}任务失败, 原因: ${fetchInstance.message}`)

        this.initPageData(fetchInstance.data.id)
    }

    cancelHandle = async () => {
        if (this.verifyTaskDiff()) {
            const confirmInstance = await Confirm('你有东西未保存，你确定要返回吗?')
            if (confirmInstance.result !== 1) return
        }
        this.props.reject(consequencer.error('取消'))
    }

    render() {
        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, status, priority,
            inputFocusField
        } = this.state
        const effectTimestampString = this.renderEffectTimestamp()

        return <div className='task-edit-container' style={{ padding: '25px 15px 15px 15px' }}>
            <CommonlyListItem key='title'
                title='简单描述/提问/归纳'
                isRequiredHighlight
            >
                {inputFocusField === 'title' && <div className='edit-input-tip'>情景? + Action/冲突/方案</div>}
                <CommonlyInputText key='title'
                    value={title || ''}
                    onChangeHandle={value => this.setState({ title: value })}
                    height={250}
                    placeholder='情景? + Action/冲突/方案'
                    onFocus={() => this.setState({ inputFocusField: 'title' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='content'
                title='得出什么结论?'
                isRequiredHighlight
            >
                {inputFocusField === 'content' && <div className='edit-input-tip'>(情景是啥?)是什么?为什么?怎么办?</div>}
                <CommonlyInputText key='content'
                    value={content || ''}
                    onChangeHandle={value => this.setState({ content: value })}
                    isMultipleInput
                    isAutoHeight
                    minHeight={250}
                    placeholder='结论1: (情景是啥?)是什么?为什么?怎么办?'
                    onFocus={() => this.setState({ inputFocusField: 'content' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='specific'
                title='任务具体内容?'
            >
                {inputFocusField === 'specific' && <div className='edit-input-tip'>任务是什么?为什么?啥跨度影响?对啥影响大?</div>}
                <CommonlyInputText key='specific'
                    value={specific || ''}
                    onChangeHandle={value => this.setState({ specific: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='任务是什么?为什么?啥跨度影响?对啥影响大?'
                    onFocus={() => this.setState({ inputFocusField: 'specific' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='measurable'
                title='任务完成标识?'
            >
                {inputFocusField === 'measurable' && <div className='edit-input-tip'>完成的标识是什么?为什么标志完成?核心因素?</div>}
                <CommonlyInputText key='measurable'
                    value={measurable || ''}
                    onChangeHandle={value => this.setState({ measurable: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='完成的标识是什么?为什么标志完成?核心因素?'
                    onFocus={() => this.setState({ inputFocusField: 'measurable' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='attainable'
                title='任务是否可以实现?'
            >
                {inputFocusField === 'attainable' && <div className='edit-input-tip'>为什么可以实现?未来自己接受呢? 决定因素?</div>}
                <CommonlyInputText key='attainable'
                    value={attainable || ''}
                    onChangeHandle={value => this.setState({ attainable: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='为什么可以实现?未来自己接受呢? 决定因素?'
                    onFocus={() => this.setState({ inputFocusField: 'attainable' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='relevant'
                title='任务和哪些需求相关?'
            >
                {inputFocusField === 'relevant' && <div className='edit-input-tip'>为什么和这个需求相关?时间跨度?本质?哪个角度?</div>}
                <CommonlyInputText key='relevant'
                    value={relevant || ''}
                    onChangeHandle={value => this.setState({ relevant: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='为什么和这个需求相关?时间跨度?本质?哪个角度?'
                    onFocus={() => this.setState({ inputFocusField: 'relevant' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='timeBound'
                title='明确的截止期限?'
            >
                {inputFocusField === 'timeBound' && <div className='edit-input-tip'>是什么?为什么设定这个时间?哪个角度?</div>}
                <CommonlyInputText key='timeBound'
                    value={timeBound || ''}
                    onChangeHandle={value => this.setState({ timeBound: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='期限1： 是什么?为什么设定这个时间?哪个角度?'
                    onFocus={() => this.setState({ inputFocusField: 'timeBound' })}
                />
            </CommonlyListItem>
            <CommonlyListItem key='filter'
                title='过滤条件?'
            >
                <>
                    {longTerm && longTerm.id && <FilterItem key='longTerm'>
                        longTerm: {longTerm.title}
                    </FilterItem>}
                    {tags && tags.length > 0 && <FilterItem key='tags'>
                        tags: {tags.map(({ name }) => name).join('、')}
                    </FilterItem>}
                    {effectTimestampString && <FilterItem key='effectTimestamp'>
                        effect timestamp: {effectTimestampString}
                    </FilterItem>}
                    {status && status.value && <FilterItem key='status'>
                        status: {status.label}
                    </FilterItem>}
                    {priority && priority.value && <FilterItem key='priority'>
                        priority: {priority.label}
                    </FilterItem>}
                    <Button key='filter-select-popup'
                        onClick={this.selectFilterHandle}
                    >选择过滤条件</Button>
                </>
            </CommonlyListItem>

            <div style={{ height: '425px' }} />
            <CommonlyBottomOperate
                leftElement={[{
                    key: 'confirm',
                    cilckHandle: this.confirmHandle,
                    element: '确认'
                }, {
                    key: 'save',
                    cilckHandle: this.temporaryStorageHandle,
                    element: '暂存'
                }, {
                    key: 'delete',
                    cilckHandle: this.deleteHandle,
                    element: '删除'
                }].filter(this.bottomOperateFilter)}
                rightElement={[{
                    cilckHandle: this.cancelHandle,
                    element: '取消'
                }]}
            />
        </div>
    }
}

const FilterItem = ({ children }) => <div style={{ paddingBottom: '5px' }}>{children}</div>

export default TaskEdit
