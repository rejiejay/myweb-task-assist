import jsxStyle from './../../../components/jsx-style'
import service from './../service'

class CardAttachmentDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tagsNameList: []
        }
    }

    componentDidMount() {
        const { data } = this.props

        if (data.taskTagId) this.initTaskTagInfor(data.taskTagId)
    }

    async initTaskTagInfor(taskTagId) {
        const fetchInstance = await service.getTaskTagInfor(taskTagId)
        if (fetchInstance.result !== 1) return

        this.setState({ tagsNameList: fetchInstance.data })
    }

    render() {
        return <div className='task-attachment-information'>
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

    notRequiredDescription = ({ field, data }) => {
        if (!data) return null

        return <div className={`other-content-${field}`}>{field}: {data}</div>
    }

    render() {
        const { data, isShowBigCard } = this.props
        const { isShowAttachInfor } = this.state
        const NotRequiredDescription = this.notRequiredDescription
        const newText = text => text && text.split('\n').map((item, i) => <p key={i}>{item}</p>)
        let style = {}
        if (!!isShowBigCard) style = this.bigCardStyle

        return <div className='task-card'>
            <div className='task-card-title'>{newText(data.title)}</div>
            <div className='card-content-container' style={style}>
                {isShowBigCard && <div className='big-card-content'>{newText(data.content)}</div>}
                {!isShowBigCard && <div className='small-card-content'>{newText(data.content)}</div>}
                {isShowBigCard && <div className='other-content-description'>
                    <NotRequiredDescription key='specific' field='specific' data={newText(data.specific)} />
                    <NotRequiredDescription key='measurable' field='measurable' data={newText(data.measurable)} />
                    <NotRequiredDescription key='attainable' field='attainable' data={newText(data.attainable)} />
                    <NotRequiredDescription key='relevant' field='relevant' data={newText(data.relevant)} />
                    <NotRequiredDescription key='timeBound' field='timeBound' data={newText(data.timeBound)} />
                </div>}
            </div>
            {isShowAttachInfor && <CardAttachmentDetail data={data} />}
            <div className='task-card-operate'>
                <div className='card-operate-container flex-start-center'>
                    <div className='operate-left flex-rest flex-start'>
                        <div className='switch-attach-infor flex-center'
                            onClick={() => this.setState({ isShowAttachInfor: !isShowAttachInfor })}
                        >{isShowAttachInfor ? 'hide information' : 'show attach infor'}</div>
                    </div>
                    <div className='operate-right flex-start-center'>
                        {data.longTermId && <div className='operate-right-button long-term-task flex-center'
                            onClick={() => {}}
                        >Enter Long Term Task</div>}
                        <div className='operate-right-button operate-right-edit flex-center'
                            onClick={() => {}}
                        >Edit</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

const TaskList = ({ list, isShowBigCard }) => <div className='task-list-container'>{list.map(item => 
    <TaskCard
        key={item.id}
        data={item}
        isShowBigCard={isShowBigCard}
    />
)}</div>

export default TaskList
