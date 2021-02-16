import consequencer from './../../../../utils/consequencer'
import SqlHandle from './../../../../module/SQLite/sql-handle'
import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import CommonlyInputText from './../../../components/mobile/commonly-input-text'
import CommonlyListItem from './../../../components/mobile/commonly-list-item'

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
            title: '',
            record: '',
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
        const { title, record, detailCategoryIdentify } = longTermTask
        this.setState({ title, record })

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

    confirmHandle = () => { }

    render() {
        const { title, record, nodeTree } = this.state

        return <div className='record-detail'>
            <div className='record-detail-title' style={{ padding: '25px 15px 15px 15px' }}>
                <CommonlyInputText key='title'
                    value={title || ''}
                    onChangeHandle={value => this.setState({ title: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='长期任务的标题'
                />
            </div>
            <div className='record-detail-panel' style={{ padding: '0px 15px' }}>
                <CommonlyListItem key='record-panel'
                    title='得出什么结论?'
                    isRequiredHighlight
                >
                    <CommonlyInputText key='record-panel'
                        value={record || ''}
                        onChangeHandle={value => this.setState({ record: value })}
                        isMultipleInput
                        isAutoHeight
                        minHeight={120}
                        placeholder='结论1: (情景是啥?)是什么?为什么?怎么办?'
                    />
                </CommonlyListItem>
            </div>
            <div className='record-detail-content'>
            </div>

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

export default GroupPanelRecordDetail
