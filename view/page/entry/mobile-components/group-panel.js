import Button from './../../../components/button'

import service from './../../../service'

const props = {
    longTermId: 0
}

class GroupPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            record: ''
        }
    }

    componentDidMount() {
        const { longTermId } = this.props
        if (longTermId) this.initGroupPanelData(longTermId)
    }

    componentDidUpdate(prevProps) {
        const { longTermId } = this.props
        if (longTermId && longTermId !== prevProps.longTermId) this.initGroupPanelData(longTermId)
    }

    refresh() {
        this.initGroupPanelData(this.props.longTermId)
    }

    initGroupPanelData = async longTermId => {
        const fetchInstance = await service.getLongTermTask(longTermId)
        if (fetchInstance.result !== 1) return
        const longTerm = fetchInstance.data

        this.setState({ title: longTerm.title, record: longTerm.record })
    }

    render() {
        const { longTermId, onEditHandle } = this.props
        if (!longTermId) return null

        const { title, record } = this.state

        return <div className='group-panel'>
            <div className='group-panel-container'>
                <div className='group-panel-title'>{title}</div>
                <div className='group-panel-content'>{record}</div>
                <div className='group-panel-operation flex-start'>
                    <div className='flex-rest'></div>
                    <Button style={{ minWidth: '45px', width: '45px', minHeight: '35px', fontSize: '12px', backgroundColor: '#fff', color: '#606266' }}
                        onClick={onEditHandle}
                    >编辑</Button>
                </div>
            </div>
        </div>
    }
}

export default GroupPanel
