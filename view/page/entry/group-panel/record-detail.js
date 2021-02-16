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
            spreadZoomIdentify: null,
            recordDetail: []
        }

        /**
         * 下面2条数据都是为了作为对比而使用, 所以是不进行改动的
         */
        this.longTermTask = { id: null, title: null, record: null, spreadZoomIdentify: null, spreadZoomDepth: null, detailCategoryIdentify: null }
        this.longTermRecordDetail = []
    }

    componentDidMount() {
        this.initRecordDetail()
    }

    initRecordDetail = async () => {
        const { longTermId } = this.props
        const longTermTaskInstance = await service.getLongTermTask(longTermId)
        if (longTermTaskInstance.result !== 1) return consequencer.error(longTermTaskInstance.message)
        const longTermTask = longTermTaskInstance.data
        const { title, record, detailCategoryIdentify } = longTermTask

        const longTermRecordDetailInstance = await service.getLongTermRecordDetail(detailCategoryIdentify)
        if (longTermRecordDetailInstance.result !== 1) return consequencer.error(longTermRecordDetailInstance.message)
        const longTermRecordDetail = longTermRecordDetailInstance.data

        this.longTermTask = longTermTask
        this.longTermRecordDetail = longTermRecordDetail
        this.setState({ title, record, spreadZoomIdentify: detailCategoryIdentify, recordDetail: longTermRecordDetail })

        return consequencer.success()
    }

    storageConfirmHandle = () => { }

    backtrackHandle = () => {
        this.props.reject(consequencer.error('取消'))
    }

    verifyInputChange = () => {
        const isTitleChange = false
        const isPanelChange = false
        const isDetailChange = false

        return isTitleChange || isPanelChange || isDetailChange
    }

    render() {
        const { title, record, recordDetail, spreadZoomIdentify } = this.state

        return <>
            <div className='record-detail-title' style={{ padding: '25px 15px 15px 15px' }}>
                <CommonlyInputText key='title'
                    value={title || ''}
                    onChangeHandle={value => this.setState({ title: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='长期任务的标题'
                />
            </div>
            <div className='record-detail-panel' style={{ padding: '0px 15px 15px 15px' }}>
                <CommonlyListItem key='record-panel'
                    title='长期任务面板简介'
                    isRequiredHighlight
                >
                    <CommonlyInputText key='record-panel'
                        value={record || ''}
                        onChangeHandle={value => this.setState({ record: value })}
                        isMultipleInput
                        isAutoHeight
                        minHeight={120}
                        placeholder='请输入长期任务面板简介'
                    />
                </CommonlyListItem>
            </div>
            <div className='record-detail-content'>
                <RecordDetailElement
                    longTermRecordDetail={recordDetail}
                    spreadZoomIdentify={spreadZoomIdentify}
                />
            </div>

            <div style={{ height: '425px' }} />
            <CommonlyBottomOperate
                leftElement={[{
                    cilckHandle: this.storageConfirmHandle,
                    element: '暂存'
                }]}
                rightElement={[{
                    cilckHandle: this.backtrackHandle,
                    element: '确认'
                }]}
            />
        </>
    }
}

const MultipleInputTextarea = ({ id, value, onChangeHandle, placeholder }) => {
    let wrapConut = !!value ? 0 : 1
    // 存在换行按钮 \n， 换一行
    if (!!value) wrapConut += value.split(/[\n]/).length
    // 超过24个字自动换一行
    if (!!value) wrapConut += Math.floor(value.length / 24)
    const wrapHeight = wrapConut * 16

    return <textarea type="text"
        key={id}
        className='multiple-input-textarea'
        style={{ height: `${wrapHeight}px` }}
        value={value}
        onChange={({ target: { value } }) => onChangeHandle(value)}
        placeholder={placeholder}
    />
}

class RecordDetailElement extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recordDetail: [],
            nodeTree: []
        }
    }

    componentDidMount() {
        const { longTermRecordDetail, spreadZoomIdentify } = this.props
        this.initRecordNodeTree(longTermRecordDetail, spreadZoomIdentify)
    }

    componentDidUpdate(prevProps) {
        const { longTermRecordDetail, spreadZoomIdentify } = this.props

        if (
            JSON.stringify(longTermRecordDetail) !== JSON.stringify(prevProps.longTermRecordDetail) ||
            spreadZoomIdentify !== prevProps.spreadZoomIdentify
        ) {
            this.initRecordNodeTree(longTermRecordDetail, spreadZoomIdentify)
        }
    }

    initRecordNodeTree = (recordDetail, id) => {
        const sqlHandle = new SqlHandle()
        const nodeTree = sqlHandle.tableToNodeTreeConver(recordDetail, id)
        this.setState({ recordDetail, nodeTree })
    }

    multipleInputChangeHandle = (value, id) => {
        const { spreadZoomIdentify } = this.props
        let recordDetail = JSON.parse(JSON.stringify(this.state.recordDetail))
        recordDetail.forEach(element => {
            if (element.id === id) {
                element.detail = value
                element.isChange = true
            }
        })

        this.setState({ recordDetail }, () => this.initRecordNodeTree(recordDetail, spreadZoomIdentify))
    }

    renderNode = node => {
        const slef = this
        const { id, uniquelyIdentify, parentUniquelyIdentify, detail } = node

        const children = node.children.map(node => slef.renderNode(node))

        return <div className='node-item' key={uniquelyIdentify}>
            <div className='node-item-container flex-start-center'>
                <div className='node-item-input flex-rest flex-start-center'>
                    <MultipleInputTextarea key={uniquelyIdentify}
                        id={uniquelyIdentify}
                        value={detail || ''}
                        onChangeHandle={value => this.multipleInputChangeHandle(value, id)}
                        placeholder='请输入长期任务面板简介'
                    />
                </div>
                <div className='node-item-operation'>
                    <svg t="1613468857817" className="className" viewBox="0 0 1024 1024" width="16" height="16">
                        <path d="M420.9664 32.8704c-24.576 22.016-36.9664 48.9472-36.9664 80.896 0 32.0512 12.3392 58.9312 36.9664 80.896 24.7296 21.9136 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.248 37.7344-50.5344 36.9664-80.896 0-32-12.288-58.88-36.9664-80.896C578.304 10.9568 547.9424 0 512 0 475.9552 0 445.696 10.9568 420.9664 32.8704z m0 398.2336C396.3904 453.0688 384 480 384 512c0 32 12.3392 58.88 36.9664 80.896 24.7296 21.8624 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.2992 37.7344-50.5856 36.9664-80.896 0-32.0512-12.288-58.9312-36.9664-80.896-24.6784-21.9136-55.04-32.8704-90.9824-32.8704-36.0448 0-66.304 10.9568-91.0336 32.8704z m0 398.1824c-24.576 22.016-36.9664 48.9472-36.9664 80.896 0 32.0512 12.3392 58.9312 36.9664 80.896 24.7296 21.9136 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.248 37.7344-50.5344 36.9664-80.896 0-32-12.288-58.88-36.9664-80.896-24.6784-21.8624-55.04-32.8704-90.9824-32.8704-36.0448 0-66.304 11.008-91.0336 32.8704z" fill="#909399" />
                    </svg>
                </div>
            </div>

            <div className='node-item-children'>{children}</div>
        </div>
    }

    render() {
        const slef = this
        const { nodeTree } = this.state

        const NodeElements = () => nodeTree.map(node => slef.renderNode(node))

        return <div className='record-detail-elements'>
            <NodeElements />
        </div>
    }
}

export default GroupPanelRecordDetail
