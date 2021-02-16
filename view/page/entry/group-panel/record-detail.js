import service from './../service'

const props = {
    resolve: () => { },
    reject: () => { },
    longTermId: null
}

export class GroupPanelRecordDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            record: ''
        }
    }

    componentDidMount() {
        this.initRecordDetail()
    }

    initRecordDetail = async () => {
        const { longTermId } = this.props
        const longTermTaskInstance = await service.getLongTermTask(longTermId)
        if (longTermTaskInstance.result !== 1) return
        const longTermTask = longTermTaskInstance.data
        const { detailCategoryIdentify } = longTermTask

        const longTermRecordDetailInstance = await service.getLongTermRecordDetail(detailCategoryIdentify)
        if (longTermRecordDetailInstance.result !== 1) return
        const longTermRecordDetail = longTermRecordDetailInstance.data

        this.longTermTask = longTermTask
        this.longTermRecordDetail = longTermRecordDetail
    }

    render() {
        const { record } = this.state

        return <div className='record-detail' style={{ padding: '25px 15px 15px 15px' }}>GroupPanelRecordDetail</div>
    }
}

export default GroupPanelRecordDetail
