import jsxStyle from './../../../components/jsx-style'
import service from './../../../service'
import TimeHelper from './../../../../utils/time-helper'
import utils from './../utils'

const NotRequiredDescription = ({ field, description }) => {
    if (!description) return null

    return <div className={`other-content-${field}`}>{field}: {description}</div>
}

class CardAttachmentDetail extends React.Component {
    constructor(props) {
        super(props)

        const defaultDescription = { field: null, data: null }

        this.state = {
            tag: defaultDescription,
            effectTime: defaultDescription,
            status: defaultDescription,
            priority: defaultDescription
        }
    }

    componentDidMount() {
        this.initTaskTagInfor()
        this.initEffectTime()
        this.initStatus()
        this.initPriority()
    }

    initEffectTime() {
        const { data } = this.props
        const field = 'Effect Time'

        if (!data.minEffectTimestamp && !data.maxEffectTimestamp) return
        const minEffectTime = !!data.minEffectTimestamp ? TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+data.minEffectTimestamp)) : ''
        const maxEffectTime = !!data.maxEffectTimestamp ? TimeHelper.transformers.dateToYYYYmmDDhhMM(new Date(+data.maxEffectTimestamp)) : ''

        let description = ''
        if (!!data.minEffectTimestamp) description = `${minEffectTime}`
        if (!!data.maxEffectTimestamp) description = `${maxEffectTime}`
        if (!!data.minEffectTimestamp && !!data.maxEffectTimestamp) description = `${minEffectTime} - ${maxEffectTime}`

        this.setState({ effectTime: { field, description } })
    }

    initStatus() {
        const { data } = this.props
        if (!data.status) return

        const field = 'Task Status'
        const description = utils.initStatusLable(data.status)
        this.setState({ status: { field, description } })
    }

    initPriority() {
        const { data } = this.props
        if (!data.priority) return

        const field = 'Task Priority'
        const description = utils.initPriorityLable(data.priority)
        this.setState({ priority: { field, description } })
    }

    async initTaskTagInfor() {
        const { data } = this.props
        if (!data.taskTagId) return

        const fetchInstance = await service.getTaskTagInfor(data.taskTagId)
        if (fetchInstance.result !== 1) return

        const field = 'Task Tag'
        const tags = fetchInstance.data.map(({ name }) => name)
        const description = Object.keys(tags).reduce((accumulator, currentValue) => {
            if (currentValue === 'id' || currentValue === 'taskId') return accumulator
            if (+tags[currentValue] === 1) accumulator.push(currentValue)
            return accumulator
        }, []).join()

        this.setState({ tag: { field, description } })
    }

    render() {
        const { effectTime, status, priority, tag } = this.state

        return <div className='task-attachment-information'>
            <NotRequiredDescription key='effectTime' {...effectTime} />
            <NotRequiredDescription key='status' {...status} />
            <NotRequiredDescription key='priority' {...priority} />
            <NotRequiredDescription key='tag' {...tag} />
        </div>
    }
}

class TaskCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowAttachInfor: false
        }

        this.bigCardStyle = { minHeight: jsxStyle.client.heightPercentagePx(68) }
    }

    render() {
        const { data, isShowBigCard, editHandle } = this.props
        const { isShowAttachInfor } = this.state
        const newText = text => text && text.split('\n').map((item, i) => <p key={i}>{item}</p>)
        let style = {}
        if (!!isShowBigCard) style = this.bigCardStyle

        return <div className='task-card'>
            <div className='task-card-title'>{newText(data.title)}</div>
            <div className='card-content-container' style={style}>
                {isShowBigCard && <div className='big-card-content'>{newText(data.content)}</div>}
                {!isShowBigCard && <div className='small-card-content'>{newText(data.content)}</div>}
                {isShowBigCard && <div className='other-content-description'>
                    <NotRequiredDescription key='specific' field='specific' description={newText(data.specific)} />
                    <NotRequiredDescription key='measurable' field='measurable' description={newText(data.measurable)} />
                    <NotRequiredDescription key='attainable' field='attainable' description={newText(data.attainable)} />
                    <NotRequiredDescription key='relevant' field='relevant' description={newText(data.relevant)} />
                    <NotRequiredDescription key='timeBound' field='timeBound' description={newText(data.timeBound)} />
                </div>}
            </div>
            {isShowAttachInfor && <CardAttachmentDetail data={data} />}
            <div className={`task-card-operate ${isShowAttachInfor && 'operate-show-attach'}`}>
                <div className='card-operate-container flex-start-center'>
                    <div className='operate-left flex-rest flex-start'>
                        <div className='switch-attach-infor flex-center'
                            onClick={() => this.setState({ isShowAttachInfor: !isShowAttachInfor })}
                        >{isShowAttachInfor ? 'hide information' : 'show attach infor'}</div>
                    </div>
                    <div className='operate-right flex-start-center'>
                        {data.longTermId && <div className='operate-right-button long-term-task flex-center'
                            onClick={() => { }}
                        >Enter Long Term Task</div>}
                        <div className='operate-right-button operate-right-edit flex-center'
                            onClick={() => editHandle(data.id)}
                        >Edit</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

const TaskList = ({ list, isShowBigCard, editHandle }) => <div className='task-list-container'>{list.map(item =>
    <TaskCard
        key={item.id}
        data={item}
        isShowBigCard={isShowBigCard}
        editHandle={editHandle}
    />
)}</div>

export default TaskList
