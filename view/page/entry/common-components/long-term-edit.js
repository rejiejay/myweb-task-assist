import consequencer from './../../../../utils/consequencer'

import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import Prompt from './../../../components/prompt'
import Confirm from './../../../components/confirm'
import jsxStyle from './../../../components/jsx-style'
import Button from './../../../components/button'

import service from './../service'

const props = {
    resolve: () => { },
    reject: () => { }
}

export class LongTermEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            longTermOptions: [
                // { value: '', label: '' }
            ]
        }
    }

    async componentDidMount() {
        this.initAllTaskLongTermInfor()
    }

    async initAllTaskLongTermInfor() {
        const fetchInstance = await service.getAllLongTermTask()
        if (fetchInstance.result !== 1) return
        const allLongTermTask = fetchInstance.data

        const longTermOptions = allLongTermTask.map(longTerm => ({ value: longTerm.id, label: longTerm.title }))
        this.setState({ longTermOptions })
    }

    addTagHandle = async () => {
        const promptInstance = await Prompt({ title: '请输入新增长期任务的名字', placeholder: '请输入新增长期任务的名字' })
        if (promptInstance.result !== 1) return

        const longTermTaskName = promptInstance.data
        const addInstance = await service.addLongTermTaskTaskRelational(longTermTaskName)
        if (addInstance.result !== 1) return Confirm(addInstance.message)

        this.initAllTaskLongTermInfor()
    }

    editHandle = async ({ id, name }) => {
        const promptInstance = await Prompt({ title: '请输入编辑长期任务的名字', placeholder: '请输入编辑长期任务的名字', defaultValue: name })
        if (promptInstance.result !== 1) return

        const longTermTaskName = promptInstance.data
        const editInstance = await service.editLongTermTaskRelational({ id, title: longTermTaskName })
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.initAllTaskLongTermInfor()
    }

    deleteHandle = async ({ id }) => {
        const confirmInstance = await Confirm('确定要删除这个长期任务吗?')
        if (confirmInstance.result !== 1) return

        const deleteInstance = await service.deleteLongTermTaskTaskRelational({ id })
        if (deleteInstance.result !== 1) return Confirm(deleteInstance.message)

        this.initAllTaskLongTermInfor()
    }

    confirmResolveHandle = async () => {
        const { resolve } = this.props
        const { longTermOptions } = this.state
        resolve(consequencer.success(longTermOptions))
    }

    cancelRejectHandle = async () => {
        const { reject } = this.props
        reject(consequencer.error('cancel'))
    }

    render() {
        const { longTermOptions } = this.state

        return <div className='tag-edit-container' style={{ padding: '25px 15px 15px 15px', backgroundColor: '#f1f1f1' }}>
            <div style={{ paddingBottom: '15px' }}>{longTermOptions.map((tag, key) =>
                <LongTermEditItem key={key}
                    editHandle={() => this.editHandle({ id: tag.value, name: tag.label })}
                    deleteHandle={() => this.deleteHandle({ id: tag.value })}
                >{tag.label}</LongTermEditItem>
            )}</div>

            <Button onClick={this.addTagHandle}>新增长期任务</Button>

            <div style={{ height: jsxStyle.client.heightPx() }} />
            <CommonlyBottomOperate
                leftElement={[{
                    cilckHandle: this.confirmResolveHandle,
                    element: '确认'
                }]}
                rightElement={[{
                    cilckHandle: this.cancelRejectHandle,
                    element: '取消'
                }]}
            />
        </div>
    }
}

const LongTermEditItem = ({ children, editHandle, deleteHandle }) => <div style={{ paddingBottom: '15px' }}>
    <div style={{ backgroundColor: '#fff', minHeight: '45px', ...jsxStyle.basicFlex.startCenter }}>
        <div style={{ ...jsxStyle.basicFlex.rest, padding: '0px 15px' }}>{children}</div>

        <div style={{ padding: '0px 15px', borderLeft: '1px solid #ddd' }}
            onClick={editHandle}
        >编辑</div>

        <div style={{ padding: '0px 15px', borderLeft: '1px solid #ddd' }}
            onClick={deleteHandle}
        >删除</div>
    </div>
</div>

export default LongTermEdit
