import consequencer from './../../../../utils/consequencer'
import SqlHandle from './../../../../module/SQLite/sql-handle'
import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import CommonlyInputText from './../../../components/mobile/commonly-input-text'
import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import Confirm from './../../../components/confirm'
import ActionSheet from './../../../components/action-sheet'
import Button from './../../../components/button'

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
            categoryIdentify: null,
            spreadZoomIdentify: null,
            isSelectedMove: false,
            recordDetail: [],

            /**
             * 作为对比使用
             */
            longTermTask: { id: null, title: null, record: null, spreadZoomIdentify: null, spreadZoomDepth: null, categoryIdentify: null }
        }

        /**
         * 作为对比使用
         */
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
        const { title, record, spreadZoomIdentify, detailCategoryIdentify } = longTermTask
        const categoryIdentify = detailCategoryIdentify

        const longTermRecordDetailInstance = await service.getLongTermRecordDetail(categoryIdentify)
        if (longTermRecordDetailInstance.result !== 1) return consequencer.error(longTermRecordDetailInstance.message)
        const longTermRecordDetail = longTermRecordDetailInstance.data

        this.longTermRecordDetail = longTermRecordDetail
        this.setState({ longTermTask, title, record, categoryIdentify, spreadZoomIdentify, recordDetail: longTermRecordDetail })

        return consequencer.success()
    }

    storageConfirmHandle = async () => {
        const { title, record, longTermTask } = this.state
        const editInstance = await service.editLongTermTaskRelational({ ...longTermTask, title, record })
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.setState({ longTermTask: { ...longTermTask, title, record } })
    }

    unfoldNodeHandle = async spreadZoomIdentify => {

        const { longTermTask } = this.state
        const newLongTermTask = { ...longTermTask, spreadZoomIdentify }
        const editInstance = await service.editLongTermTaskRelational(newLongTermTask)
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.setState({ spreadZoomIdentify, longTermTask: newLongTermTask })
        this.initRecordDetail()
    }

    backtrackHandle = async () => {
        if (this.storageConfirmVerify({ id: 'storage' })) {
            const confirmInstance = await Confirm('你有数据未提交, 你确定要返回吗?')
            if (confirmInstance.result !== 1) return
        }

        this.props.resolve(consequencer.success())
    }

    storageConfirmVerify = ({ id }) => {
        if (id === 'storage') {
            const { title, record, longTermTask } = this.state
            if (title !== longTermTask.title) return true
            if (record !== longTermTask.record) return true
        }

        return false
    }

    render() {
        const { title, record, recordDetail, spreadZoomIdentify, categoryIdentify } = this.state

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
                    categoryIdentify={categoryIdentify}
                    longTermRecordDetail={recordDetail}
                    spreadZoomIdentify={spreadZoomIdentify}
                    unfoldNodeHandle={this.unfoldNodeHandle}
                />
            </div>

            <div style={{ height: '425px' }} />
            <CommonlyBottomOperate
                leftElement={[{
                    id: 'storage',
                    cilckHandle: this.storageConfirmHandle,
                    element: '暂存'
                }].filter(this.storageConfirmVerify)}
                rightElement={[{
                    cilckHandle: this.backtrackHandle,
                    element: '确认'
                }]}
            />
        </>
    }
}

class MultipleInputTextarea extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }

        this.isChange = false
    }

    componentDidMount() {
        this.initContent()
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props
        if (value !== prevProps.value) this.initContent()
    }

    initContent() {
        const { value } = this.props
        this.setState({ content: value })
    }

    onChangeHandle(value) {
        this.setState({ content: value.trim() })
    }

    initStyle = value => {
        let wrapConut = !!value ? 0 : 1
        // 存在换行按钮 \n， 换一行
        if (!!value) wrapConut += value.split(/[\n]/).length
        // 超过24个字自动换一行
        if (!!value) wrapConut += Math.floor(value.length / 24)
        const wrapHeight = wrapConut * 16
        return { height: `${wrapHeight}px` }
    }

    verifyInputChange = () => {
        const { content } = this.state

        /** 不允许提交空内容 */
        if (!content) return false

        return this.props.value !== content
    }

    multipleInputSubmit = () => {
        const { content } = this.state
        this.props.onChangeHandle(content)
    }

    render() {
        const { placeholder } = this.props
        const { content } = this.state

        return <div className='flex-start-center'>
            <textarea type="text"
                className='multiple-input-textarea'
                style={this.initStyle(content)}
                value={content}
                onChange={({ target: { value } }) => this.onChangeHandle(value)}
                placeholder={placeholder}
            />
            {this.verifyInputChange() &&
                <div className='multiple-input-submit'
                    onClick={this.multipleInputSubmit}
                >提交</div>
            }
        </div>
    }
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
        const { categoryIdentify } = this.props
        const sqlHandle = new SqlHandle()
        const nodeTree = sqlHandle.tableToNodeTreeConver(recordDetail, id || categoryIdentify)
        this.setState({ recordDetail, nodeTree })
    }

    setRecordDetail = (id, node) => {
        const { spreadZoomIdentify } = this.props
        let recordDetail = JSON.parse(JSON.stringify(this.state.recordDetail))
        recordDetail = recordDetail.map(element => {
            if (element.id === id) element = { ...element, ...node }
            return element
        })

        this.setState({ recordDetail }, () => this.initRecordNodeTree(recordDetail, spreadZoomIdentify))
    }

    multipleInputChangeHandle = async (value, { id, uniquelyIdentify, parentUniquelyIdentify, createTimestamp }) => {
        const editInstance = await service.editLongTermRecordDetail(id, { uniquelyIdentify, parentUniquelyIdentify, createTimestamp, detail: value })
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.setRecordDetail(id, { detail: value, isChange: true })
    }

    deleteNodeHandle = async node => {
        const deleteInstance = await service.deleteLongTermRecordDetail(node.id)
        if (deleteInstance.result !== 1) return Confirm(deleteInstance.message)

        const { spreadZoomIdentify } = this.props
        const recordDetail = this.state.recordDetail.filter(({ id }) => id !== node.id)
        this.setState({ recordDetail }, () => this.initRecordNodeTree(recordDetail, spreadZoomIdentify))
    }

    setNodeNewHandle = async node => {
        const { id, uniquelyIdentify, parentUniquelyIdentify, detail } = node
        const createTimestamp = new Date().getTime()

        const editInstance = await service.editLongTermRecordDetail(id, { uniquelyIdentify, parentUniquelyIdentify, detail, createTimestamp })
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.setRecordDetail(id, { createTimestamp })
    }

    setNodeMoveStatusHandle = (node, isMove = true, setRecordParam = {}) => {
        const { id, uniquelyIdentify, parentUniquelyIdentify, detail } = node
        this.setState({ isSelectedMove: isMove }, () => this.setRecordDetail(id, { isMove: isMove, ...setRecordParam }))
    }

    setNodeMoveTreeHandle = async uniquelyIdentify => {
        const moveNode = this.state.recordDetail.find(record => !!record.isMove)
        const { categoryIdentify } = this.props

        if (categoryIdentify === uniquelyIdentify) return this.setNodeMoveStatusHandle(moveNode, false)

        const editInstance = await service.editLongTermRecordDetail(moveNode.id, { uniquelyIdentify: moveNode.uniquelyIdentify, detail: moveNode.detail, createTimestamp: moveNode.createTimestamp, parentUniquelyIdentify: uniquelyIdentify })
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.setNodeMoveStatusHandle(moveNode, false, { parentUniquelyIdentify: uniquelyIdentify })
    }

    addNewNodeHandle = async parentUniquelyIdentify => {
        const { categoryIdentify, spreadZoomIdentify } = this.props
        const addInstance = await service.addLongTermRecordDetail({ parentUniquelyIdentify, categoryIdentify })
        if (addInstance.result !== 1) return Confirm(addInstance.message)
        const newNode = addInstance.data
        const recordDetail = [...this.state.recordDetail, newNode]

        this.setState({ recordDetail }, () => this.initRecordNodeTree(recordDetail, spreadZoomIdentify))
    }

    showOperationAticon = async node => {
        const { categoryIdentify, spreadZoomIdentify, unfoldNodeHandle } = this.props
        const { id, uniquelyIdentify, parentUniquelyIdentify, detail, children } = node

        const isCanUnfold = () => {
            if (children.length === 0) return false
            if (categoryIdentify === parentUniquelyIdentify) return false
            if (spreadZoomIdentify === parentUniquelyIdentify) return false
            return true
        }

        const addNewAction = { value: 4528, label: '增同级' }
        const addChildAction = { value: 7946, label: '增子级' }
        const unfoldAction = { value: 4563, label: '展开' }
        const setNewAction = { value: 2843, label: '置新' }
        const setMoveAction = { value: 1532, label: '移动' }
        const deleteAction = { value: 2176, label: '删除' }
        let aticonOptions = [addNewAction, addChildAction, setNewAction, setMoveAction]
        if (isCanUnfold()) aticonOptions = [addNewAction, addChildAction, unfoldAction, setNewAction, setMoveAction]
        if (!children || (children && children.length === 0)) aticonOptions.push(deleteAction)
        const selectInstance = await ActionSheet({ title: '请选择操作方式', options: aticonOptions })
        if (selectInstance.result !== 1) return
        const selected = selectInstance.data

        if (selected.value === addNewAction.value) {
            this.addNewNodeHandle(parentUniquelyIdentify)
        }

        if (selected.value === addChildAction.value) {
            this.addNewNodeHandle(uniquelyIdentify)
        }

        if (selected.value === deleteAction.value) {
            const confirmInstance = await Confirm('是否确认删除?')
            if (confirmInstance.result !== 1) return
            this.deleteNodeHandle(node)
        }

        if (selected.value === setNewAction.value) {
            const confirmInstance = await Confirm('是否置为最新?')
            if (confirmInstance.result !== 1) return
            this.setNodeNewHandle(node)
        }

        if (selected.value === setMoveAction.value) {
            this.setNodeMoveStatusHandle(node)
        }

        if (selected.value === unfoldAction.value) {
            unfoldNodeHandle(node.parentUniquelyIdentify)
        }
    }

    renderNode = node => {
        const slef = this
        const { isSelectedMove } = this.state
        const { id, uniquelyIdentify, parentUniquelyIdentify, detail, createTimestamp, isMove } = node

        const children = node.children.sort((a, b) => a.createTimestamp - b.createTimestamp).map(node => slef.renderNode(node))

        if (!!isSelectedMove) return <div className='record-detail-elements'>
            <div className='node-item-container flex-start-center'>
                <div className='node-item-input flex-rest'>{detail}</div>
                {!!isMove && <div className='node-item-operation'
                    onClick={() => this.setNodeMoveStatusHandle(node, false)}
                >取消</div>}
                {!isMove && <div className='node-item-operation'
                    onClick={() => this.setNodeMoveTreeHandle(uniquelyIdentify, false)}
                >移动到此</div>}
            </div>

            {!isMove && <div className='node-item-children'>{children}</div>}
        </div>

        return <div className='node-item' key={uniquelyIdentify}>
            <div className='node-item-container flex-start-center'>
                <div className='node-item-input flex-rest'>
                    <MultipleInputTextarea key={uniquelyIdentify}
                        value={detail || ''}
                        onChangeHandle={value => this.multipleInputChangeHandle(value, { id, uniquelyIdentify, parentUniquelyIdentify, createTimestamp })}
                        placeholder='请输入长期任务面板简介'
                    />
                </div>
                <div className='node-item-operation'
                    onClick={() => this.showOperationAticon(node)}
                >
                    <svg t="1613468857817" className="className" viewBox="0 0 1024 1024" width="16" height="16">
                        <path d="M420.9664 32.8704c-24.576 22.016-36.9664 48.9472-36.9664 80.896 0 32.0512 12.3392 58.9312 36.9664 80.896 24.7296 21.9136 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.248 37.7344-50.5344 36.9664-80.896 0-32-12.288-58.88-36.9664-80.896C578.304 10.9568 547.9424 0 512 0 475.9552 0 445.696 10.9568 420.9664 32.8704z m0 398.2336C396.3904 453.0688 384 480 384 512c0 32 12.3392 58.88 36.9664 80.896 24.7296 21.8624 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.2992 37.7344-50.5856 36.9664-80.896 0-32.0512-12.288-58.9312-36.9664-80.896-24.6784-21.9136-55.04-32.8704-90.9824-32.8704-36.0448 0-66.304 10.9568-91.0336 32.8704z m0 398.1824c-24.576 22.016-36.9664 48.9472-36.9664 80.896 0 32.0512 12.3392 58.9312 36.9664 80.896 24.7296 21.9136 55.04 32.8704 91.0336 32.8704a132.096 132.096 0 0 0 90.9824-32.8704c24.3712-21.248 37.7344-50.5344 36.9664-80.896 0-32-12.288-58.88-36.9664-80.896-24.6784-21.8624-55.04-32.8704-90.9824-32.8704-36.0448 0-66.304 11.008-91.0336 32.8704z" fill="#909399" />
                    </svg>
                </div>
            </div>

            <div className='node-item-children'>{children}</div>
        </div>
    }

    isShowUnSpreadZoom = () => {
        const { categoryIdentify, spreadZoomIdentify } = this.props

        if (!spreadZoomIdentify) return false
        if (spreadZoomIdentify === categoryIdentify) return false
        return true
    }

    unSpreadZoomHandle = () => {
        const { recordDetail } = this.state
        const { unfoldNodeHandle, spreadZoomIdentify, categoryIdentify } = this.props

        if (spreadZoomIdentify === categoryIdentify) return

        const node = recordDetail.find(node => node.uniquelyIdentify === spreadZoomIdentify)
        if (!node) return unfoldNodeHandle(categoryIdentify)

        unfoldNodeHandle(node.parentUniquelyIdentify)
    }

    render() {
        const slef = this
        const { nodeTree, isSelectedMove } = this.state
        const { categoryIdentify } = this.props

        const NodeElements = () => nodeTree.sort((a, b) => a.createTimestamp - b.createTimestamp).map(node => slef.renderNode(node))

        if (!isSelectedMove) return <>
            {this.isShowUnSpreadZoom() &&
                <div className='record-detail-zoom'>
                    <Button key='record-detail-zoom'
                        onClick={this.unSpreadZoomHandle}
                    >返回上一层级</Button>
                </div>
            }
            <div className='record-detail-elements'><NodeElements /></div>
            <div className='record-detail-add'>
                <Button key='record-detail-add'
                    onClick={() => this.addNewNodeHandle(categoryIdentify)}
                >新增</Button>
            </div>

        </>

        return <div className='record-detail-elements'>
            <div className='node-item-container flex-start-center'>
                <div className='node-item-input flex-rest'>Root</div>
                <div className='node-item-operation'
                    onClick={() => this.setNodeMoveTreeHandle(categoryIdentify)}
                >移动到此</div>
            </div>

            <div className='node-item-children'><NodeElements /></div>

        </div>
    }
}

export default GroupPanelRecordDetail
