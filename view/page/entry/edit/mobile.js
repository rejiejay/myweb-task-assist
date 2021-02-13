import TimeHelper from './../../../../utils/time-helper'
import consequencer from './../../../../utils/consequencer'

import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import CommonlyInputText from './../../../components/mobile/commonly-input-text'
import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import Button from './../../../components/button'
import toast from './../../../components/toast'
import FullscreenIframe from './../../../components/fullscreen-iframe'
import Confirm from './../../../components/confirm'

import service from './../service'
import utils from './../utils'

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
            priority: { value: null, label: null }
        }
    }

    componentDidMount() {
        const { id } = this.props

        if (id) this.initPageData()
    }

    initPageData = async () => {
        const { id } = this.props
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

        this.setState({
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        })
    }

    selectFilterHandle = async () => {
        const isMultipleFilter = false
        const { longTerm, tags, status, priority, minEffectTimestamp, maxEffectTimestamp } = this.state
        const initFilter = { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority }

        const selectInstance = await utils.showOperateFilterEdit(isMultipleFilter, initFilter)
        if (selectInstance.result !== 1) return
        const filter = selectInstance.data

        this.setState({
            longTerm: filter.longTermFilter,
            tags: filter.tagFilter,
            minEffectTimestamp: filter.minEffectTimestampFilter,
            maxEffectTimestamp: filter.maxEffectTimestampFilter,
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

    confirmHandle = async () => {
        const { id, resolve } = this.props
        const isEdit = !!id

        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        } = this.state

        if (!title) return toast.show('标题不能为空')
        if (!content) return toast.show('内容不能为空')

        const confirmInstance = await Confirm('确认要提交吗?')
        if (confirmInstance.result !== 1) return

        let submitData = { title, content, specific, measurable, attainable, relevant, timeBound }
        if (!!longTerm.id) submitData.longTermId = longTerm.id
        if (!!minEffectTimestamp) submitData.minEffectTimestamp = minEffectTimestamp
        if (!!maxEffectTimestamp) submitData.maxEffectTimestamp = maxEffectTimestamp
        if (tags.length > 0) submitData.tagsId = tags.map(tag => tag.id)
        if (status.length > 0) submitData.status = status
        if (priority.length > 0) submitData.priority = priority

        const addInstance = isEdit ? await service.editTask({ id, ...submitData }) : await service.addTask(submitData)
        if (addInstance.result !== 1) return Confirm(`${isEdit ? '编辑' : '添加'}任务失败, 原因: ${addInstance.message}`)

        resolve(consequencer.success(addInstance.data))
    }

    render() {
        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, status, priority
        } = this.state
        const effectTimestampString = this.renderEffectTimestamp()

        return <div className='task-edit-container' style={{ padding: '25px 15px 15px 15px' }}>
            <CommonlyListItem key='title'
                title='简单描述/提问/归纳'
                isRequiredHighlight
            >
                <CommonlyInputText key='title'
                    value={title || ''}
                    onChangeHandle={value => this.setState({ title: value })}
                    height={250}
                    placeholder='情景? + Action/冲突/方案'
                />
            </CommonlyListItem>
            <CommonlyListItem key='content'
                title='得出什么结论?'
                isRequiredHighlight
            >
                <CommonlyInputText key='content'
                    value={content || ''}
                    onChangeHandle={value => this.setState({ content: value })}
                    isMultipleInput
                    isAutoHeight
                    minHeight={250}
                    placeholder='结论1: (情景是啥?)是什么?为什么?怎么办?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='specific'
                title='任务具体内容?'
            >
                <CommonlyInputText key='specific'
                    value={specific || ''}
                    onChangeHandle={value => this.setState({ specific: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='任务是什么?为什么?啥跨度影响?对啥影响大?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='measurable'
                title='任务完成标识?'
            >
                <CommonlyInputText key='measurable'
                    value={measurable || ''}
                    onChangeHandle={value => this.setState({ measurable: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='完成的标识是什么?为什么标志完成?核心因素?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='attainable'
                title='任务是否可以实现?'
            >
                <CommonlyInputText key='attainable'
                    value={attainable || ''}
                    onChangeHandle={value => this.setState({ attainable: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='为什么可以实现?未来自己接受呢? 决定因素?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='relevant'
                title='任务和哪些需求相关?'
            >
                <CommonlyInputText key='relevant'
                    value={relevant || ''}
                    onChangeHandle={value => this.setState({ relevant: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='为什么和这个需求相关?时间跨度?本质?哪个角度?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='timeBound'
                title='明确的截止期限?'
            >
                <CommonlyInputText key='timeBound'
                    value={timeBound || ''}
                    onChangeHandle={value => this.setState({ timeBound: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='期限1： 是什么?为什么设定这个时间?哪个角度?'
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
                    cilckHandle: this.confirmHandle,
                    element: '确认'
                }]}
                rightElement={[{
                    cilckHandle: () => this.props.reject(consequencer.error('取消')),
                    element: '取消'
                }]}
            />
        </div>
    }
}

const FilterItem = ({ children }) => <div style={{ paddingBottom: '5px' }}>{children}</div>

export default TaskEdit
