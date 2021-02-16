import service from './../service'
import consequencer from './../../../../utils/consequencer'
import SqlHandle from './../../../../module/SQLite/sql-handle'

const props = {
    resolve: () => { },
    reject: () => { },
    longTermId: null
}

export class GroupPanelRecordDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            nodeTree: []
        }

        this.longTermTask = { id: null, title: null, record: null, spreadZoomIdentify: null, spreadZoomDepth: null, detailCategoryIdentify: null }
        this.longTermRecordDetail = []
    }

    async componentDidMount() {
        const mountRecordDetailInstance = await this.initRecordDetail()
        if (mountRecordDetailInstance.result !== 1) return

        const { detailCategoryIdentify } = this.longTermTask
        this.initRecordNodeTree(detailCategoryIdentify)
    }

    initRecordDetail = async () => {
        const { longTermId } = this.props
        const longTermTaskInstance = await service.getLongTermTask(longTermId)
        if (longTermTaskInstance.result !== 1) return consequencer.error(longTermTaskInstance.message)
        const longTermTask = longTermTaskInstance.data
        const { detailCategoryIdentify } = longTermTask

        const longTermRecordDetailInstance = await service.getLongTermRecordDetail(detailCategoryIdentify)
        if (longTermRecordDetailInstance.result !== 1) return consequencer.error(longTermRecordDetailInstance.message)
        const longTermRecordDetail = longTermRecordDetailInstance.data

        this.longTermTask = longTermTask
        this.longTermRecordDetail = longTermRecordDetail

        return consequencer.success()
    }

    initRecordNodeTree = id => {
        const sqlHandle = new SqlHandle()
        const nodeTree = sqlHandle.tableToNodeTreeConver(this.longTermRecordDetail, id)
        this.setState({ nodeTree })
    }

    render() {
        const { nodeTree } = this.state

        return <div className='record-detail' style={{ padding: '25px 15px 15px 15px' }}>GroupPanelRecordDetail</div>
    }
}

export default GroupPanelRecordDetail
