import TimeHelper from './../../../../utils/time-helper'
import Confirm from './../../../components/confirm'

import service from './../../../service'
import utils from './../utils'

export class WindowsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedId: null,
            
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

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async selectedDetailHandle(task) {
        const {
            id,
            title, content, specific, measurable, attainable, relevant, timeBound,
            taskTagId, longTermId, minEffectTimestamp, maxEffectTimestamp, createTimestamp
        } = task

        let longTerm = { id: null, title: '' }
        if (longTermId) {
            const fetchLongTermTaskInstance = await service.getLongTermTask(longTermId)
            const longTermTask = fetchLongTermTaskInstance.data
            if (fetchLongTermTaskInstance.result === 1) longTerm = { id: longTermId, title: longTermTask.title }
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

        let tags = []
        if (taskTagId) {
            const fetchTaskTagInforInstance = await service.getTaskTagInfor(taskTagId)
            const taskTagInfor = fetchTaskTagInforInstance.data
            if (fetchTaskTagInforInstance.result === 1) tags = taskTagInfor.map(({ id, name }) => ({ id, name }))
        }
        
        this.setState({
            selectedId: id,
            title, content, specific, measurable, attainable, relevant, timeBound,
            minEffectTimestamp, maxEffectTimestamp, createTimestamp,
            longTerm, tags, status, priority
        })
    }

    renderEffectTime() {
        const { minEffectTimestamp, maxEffectTimestamp } = this.state
        if (!minEffectTimestamp && !maxEffectTimestamp) return ''
        const effectTimestampArray = []
        if (!!minEffectTimestamp) effectTimestampArray.push(`min ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+minEffectTimestamp))}`)
        if (!!maxEffectTimestamp) effectTimestampArray.push(`max ${TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+maxEffectTimestamp))}`)

        return effectTimestampArray.join(' - ')
    }

    renderLongTerm() {
        const { longTerm } = this.state
        if (longTerm.id) return longTerm.title
        return ''
    }

    renderTags() {
        const { tags } = this.state
        if (tags && tags.length > 0) return tags.map(({ name }) => name).join('、')
        return ''
    }

    renderStatus() {
        const { status } = this.state
        if (status && status.value) return status.label
        return ''
    }

    renderPriority() {
        const { priority } = this.state
        if (priority && priority.value) return priority.label
        return ''
    }

    getByRandom = () => {
        const { list } = this.props
        const index = Math.floor(Math.random() * list.length)

        this.selectedDetailHandle(list[index])
    }

    delTaskHandle = async () => {
        const { selectedId } = this.state
        const confirmInstance = await Confirm('确认删除吗?')
        if (confirmInstance.result !== 1) return

        const deleteInstance = await service.deleteTask(selectedId)
        if (deleteInstance.result !== 1) return Confirm(deleteInstance.message)

        this.setState({ selectedId: null })
        this.props.resetHandle()
    }

    render() {
        const { clientHeight } = this
        const minHeight = `${clientHeight - 185}px`
        const { list } = this.props
        const { 
            selectedId,
            title, content, specific, measurable, attainable, relevant, timeBound, createTimestamp
         } = this.state

        return <div className='windows-container flex-start-top' style={{ minHeight }}>
            <div className="content-list flex-rest">
                <div className="list-float noselect">{list.map((data, key) => (
                    <div className={`list-item ${selectedId === data.id ? 'list-item-selected' : ''}`} key={key}>
                        <div className="list-item-container"
                            onClick={() => this.selectedDetailHandle(data, key)}
                        >
                            <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                                <p>{data.title}</p>
                                {newText(data.content)}
                            </div>
                        </div>
                    </div>
                ))}</div>
            </div>

            {(!!selectedId || selectedId === 0) && 
                <div className='content-detail' style={{ minHeight }}>
                    <div className="content-detail-container">

                        <div className="detail-operate flex-start-center noselect">
                            <div className="flex-rest flex-center"
                                onClick={this.getByRandom}
                            >随机查看</div>
                            <div className="flex-rest flex-center">时间: {TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+createTimestamp))}</div>
                            <div className="flex-rest flex-center">编辑</div>
                            <div className="flex-rest flex-center"
                                onClick={this.delTaskHandle}
                            >删除</div>
                        </div>

                        <div className="detail-preview">
                            <div className="detail-preview-title">{newText(title)}</div>
                            <NotRequiredDescription field='结论' description={content} />
                            <NotRequiredDescription field='任务具体内容' description={specific} />
                            <NotRequiredDescription field='任务完成标识' description={measurable} />
                            <NotRequiredDescription field='任务是否可以实现' description={attainable} />
                            <NotRequiredDescription field='任务和哪些需求相关' description={relevant} />
                            <NotRequiredDescription field='明确的截止期限' description={timeBound} />
                            <NotRequiredDescription field='任务有效时间' description={this.renderEffectTime()} />
                            <NotRequiredDescription field='任务所属计划' description={this.renderLongTerm()} />
                            <NotRequiredDescription field='任务所属标签' description={this.renderTags()} />
                            <NotRequiredDescription field='任务状态' description={this.renderStatus()} />
                            <NotRequiredDescription field='过滤优先级' description={this.renderPriority()} />
                        </div>
                    </div>
                </div>
            }

        </div>
    }
}

const newText = text => text && text.split('\n').map((item, i) => <p key={i}>{item}</p>)

const NotRequiredDescription = ({ field, description }) => {
    if (!description) return null

    return <div className="detail-item">
        <div className="detail-item-title">{field}:</div>
        <div className="detail-item-description">{newText(description)}</div>
    </div>
}

export default WindowsContainer
