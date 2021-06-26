import FilterEdit from './../../components/page/filter-edit'

import { loadPageVar } from './../../utils/url-helper'

import toast from './../../components/toast'
import Confirm from './../../components/confirm'

import service from './../../service'
import PageCommonUtils from './../../utils/page-common'
import CONSTS from '../../../library/consts'

class WindowsEditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageStatus: 'add',
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

        this.filterEditRef = React.createRef()

        this.task = { id: null, title: '', content: '', specific: '', measurable: '', attainable: '', relevant: '', timeBound: '', longTerm: { id: null, title: '' }, tags: [], minEffectTimestamp: null, maxEffectTimestamp: null, status: { value: null, label: null }, priority: { value: null, label: null } }

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async componentDidMount() {
        const id = loadPageVar('id')

        await this.initFilter()
        if (id) this.initPageData(id)
    }

    initFilter = async () => {
        const filterEditRef = this.filterEditRef.current
        const filter = await PageCommonUtils.pageVarToFilter()
        console.log('filter', filter)

        return new Promise(resolve => this.setState(filter, () => {
            filterEditRef.initTaskFilter()
            resolve()
        })).catch(error => error);
    }

    initPageData = async id => {
        const filterEditRef = this.filterEditRef.current
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
            status.label = PageCommonUtils.initStatusLable(task.status)
        }

        let priority = { value: null, label: null }
        if (task.priority) {
            priority.value = task.priority
            priority.label = PageCommonUtils.initPriorityLable(task.priority)
        }

        this.task = {
            id,
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        }
        this.setState(this.task, () => filterEditRef.initTaskFilter())
    }

    onFilterEditChangeHandle = () => {
        const filterEditRef = this.filterEditRef.current
        const { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority } = this.state
        const { tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, statusFilter, statusMultipleFilter, priorityFilter, priorityMultipleFilter } = filterEditRef.getResult()

        this.setState({
            longTerm: longTermFilter.id ? longTermFilter : longTerm,
            tags: tagFilter.length > 0 ? tagFilter : tags,
            minEffectTimestamp: minEffectTimestampFilter || minEffectTimestamp,
            maxEffectTimestamp: maxEffectTimestampFilter || maxEffectTimestamp,
            status: statusFilter.value ? statusFilter : status,
            priority: priorityFilter.value ? priorityFilter : priority,
        })
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

    confirmHandle = async (isDirect = false) => {
        const { id } = this.state
        const isEdit = !!id

        const {
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        } = this.state

        if (!title) return toast.show('标题不能为空')
        if (!content) return toast.show('内容不能为空')

        if (!isDirect) {
            const confirmInstance = await Confirm('确认要提交吗?')
            if (confirmInstance.result !== 1) return
        }

        const submitData = this.initSubmitData()

        const fetchInstance = isEdit ? await service.editTask({ id, ...submitData }) : await service.addTask(submitData)
        if (fetchInstance.result !== 1) return Confirm(`${isEdit ? '编辑' : '添加'}任务失败, 原因: ${fetchInstance.message}`)

        this.initPageData(isEdit ? id : fetchInstance.data.id)
    }

    locationBackHandle = () => window.location.href = './../'

    deleteHandle = async () => {
        const { id } = this.state
        const confirmInstance = await Confirm('确认删除吗?')
        if (confirmInstance.result !== 1) return

        const deleteInstance = await service.deleteTask(id)
        if (deleteInstance.result !== 1) return Confirm(deleteInstance.message)
        this.locationBackHandle()
    }

    cancelHandle = async () => {
        if (this.verifyTaskDiff()) {
            const confirmInstance = await Confirm('你有东西未保存，你确定要关闭吗?')
            if (confirmInstance.result !== 1) return
        }

        this.locationBackHandle()
    }

    completedHandle = async () => {
        const { id } = this.state
        let submitData = this.initSubmitData()
        const confirmInstance = await Confirm('确认完成此任务吗?')
        if (confirmInstance.result !== 1) return

        submitData.status = CONSTS.task.status.completed.serviceValue
        const fetchInstance = await service.editTask({ id, ...submitData })
        if (fetchInstance.result !== 1) return Confirm(`操作失败, 原因: ${fetchInstance.message}`)

        this.locationBackHandle()
    }

    render() {
        const {
            id,
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority,
            inputFocusField
        } = this.state
        const { clientHeight } = this
        const minHeight = clientHeight - 125
        const isMultipleFilter = false
        const initFilter = { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority }
        const isEdit = !!id
        const isDiff = this.verifyTaskDiff()

        return <div className="windows flex-column-center">

            <div className="windows-operate flex-start">
                {!isEdit && <div className="windows-operate-item flex-center flex-rest"
                    onClick={this.confirmHandle}
                >新增</div>}
                {isEdit && <div className="windows-operate-item flex-center flex-rest"
                    onClick={this.completedHandle}
                >完成</div>}
                {isEdit && <div className="windows-operate-item flex-center flex-rest"
                    onClick={this.deleteHandle}
                >删除</div>}
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={this.cancelHandle}
                >关闭</div>
            </div>

            <div className="windows-container flex-start-top" style={{ minHeight }}>
                <div className="windows-container-left flex-rest">
                    <div className="title-input flex-center">
                        <input type="text" placeholder="简单描述/提问"
                            value={title || ''}
                            onChange={({ target: { value } }) => this.setState({ title: value })}
                            onFocus={() => this.setState({ inputFocusField: 'title' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        />
                    </div>
                    {inputFocusField === 'title' && <div className='edit-input-tip'>情景? + Action/冲突/方案</div>}
                    {inputFocusField === 'content' && <div className='edit-input-tip'>结论1: (情景是啥?)是什么?为什么?怎么办?</div>}
                    <div className="content-input">
                        <textarea className="content-textarea fiex-rest" type="text"
                            placeholder='任务结论'
                            style={{ height: minHeight / 2 }}
                            value={content || ''}
                            onChange={({ target: { value } }) => this.setState({ content: value })}
                            onFocus={() => this.setState({ inputFocusField: 'content' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        ></textarea>
                    </div>

                    <div className="content-filter-edit">
                        <FilterEdit
                            ref={this.filterEditRef}
                            onChangeHook={this.onFilterEditChangeHandle}
                            isMultipleFilter={isMultipleFilter}
                            initFilter={initFilter}
                        />
                    </div>
                </div>

                <div className="windows-separation"></div>

                <div className="windows-container-right flex-rest">

                    <div className="soft-operate flex-start">
                        {isDiff && <div className="soft-operate-item flex-center flex-rest"
                            onClick={() => this.confirmHandle(true)}
                        >暂存</div>}
                        <div className="soft-operate-item flex-center flex-rest"
                            onClick={this.cancelHandle}
                        >关闭</div>
                    </div>

                    <div className="other-input">
                        <Otherinput
                            key='specific'
                            title='任务具体内容?'
                            placeholder='任务是什么?为什么?啥跨度影响?对啥影响大?'
                            value={specific}
                            onChange={value => this.setState({ specific: value })}
                            isFocus={inputFocusField === 'specific'}
                            onFocus={() => this.setState({ inputFocusField: 'specific' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        />
                        <Otherinput
                            key='measurable'
                            title='任务完成标识?'
                            placeholder='完成的标识是什么?为什么标志完成?核心因素?'
                            value={measurable}
                            onChange={value => this.setState({ measurable: value })}
                            isFocus={inputFocusField === 'measurable'}
                            onFocus={() => this.setState({ inputFocusField: 'measurable' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        />
                        <Otherinput
                            key='attainable'
                            title='任务是否可以实现?'
                            placeholder='为什么可以实现?未来自己接受呢? 决定因素?'
                            value={attainable}
                            onChange={value => this.setState({ attainable: value })}
                            isFocus={inputFocusField === 'attainable'}
                            onFocus={() => this.setState({ inputFocusField: 'attainable' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        />
                        <Otherinput
                            key='relevant'
                            title='任务和哪些需求相关?'
                            placeholder='为什么和这个需求相关?时间跨度?本质?哪个角度?'
                            value={relevant}
                            onChange={value => this.setState({ relevant: value })}
                            isFocus={inputFocusField === 'relevant'}
                            onFocus={() => this.setState({ inputFocusField: 'relevant' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        />
                        <Otherinput
                            key='timeBound'
                            title='明确的截止期限?'
                            placeholder='期限1： 是什么?为什么设定这个时间?哪个角度?'
                            value={timeBound}
                            onChange={value => this.setState({ timeBound: value })}
                            isFocus={inputFocusField === 'timeBound'}
                            onFocus={() => this.setState({ inputFocusField: 'timeBound' })}
                            onBlur={() => this.setState({ inputFocusField: '' })}
                        />
                    </div>
                </div>
            </div>
        </div>
    }
}

const Otherinput = ({ title, placeholder, value, onChange, isFocus, onBlur, onFocus }) => {
    return <div className="content-input">
        <div className="content-input-title">{isFocus ? placeholder : title}</div>
        <textarea className="content-textarea fiex-rest" type="text"
            placeholder={placeholder}
            style={{ height: '105px' }}
            value={value || ''}
            onChange={({ target: { value } }) => onChange(value)}
            onBlur={onBlur}
            onFocus={onFocus}
        ></textarea>
    </div>
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows-edit'
    ReactDOM.render(<WindowsEditComponent />, root)
}
