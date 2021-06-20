import consequencer from './../../../../utils/consequencer'

import CommonlyBottomOperate from './../../../components/mobile/commonly-bottom-operate'
import Prompt from './../../../components/prompt'
import Confirm from './../../../components/confirm'
import jsxStyle from './../../../components/jsx-style'
import Button from './../../../components/button'

import service from '../../../service'

const props = {
    resolve: () => { },
    reject: () => { }
}

export class TagEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tagOptions: [
                // { value: '', label: '' }
            ]
        }
    }

    async componentDidMount() {
        this.initAllTaskTagInfor()
    }

    async initAllTaskTagInfor() {
        const fetchInstance = await service.getAllTaskTagInfor()
        if (fetchInstance.result !== 1) return
        const tags = fetchInstance.data

        this.setState({ tagOptions: tags.map(tag => ({ value: tag.id, label: tag.name })) })
    }

    addTagHandle = async () => {
        const promptInstance = await Prompt({ title: '请输入新增tags名字', placeholder: '请输入新增tags名字' })
        if (promptInstance.result !== 1) return

        const tagName = promptInstance.data
        const addInstance = await service.addTag(tagName)
        if (addInstance.result !== 1) return Confirm(addInstance.message)

        this.initAllTaskTagInfor()
    }

    editHandle = async ({ id, name }) => {
        const promptInstance = await Prompt({ title: '请输入新增tags名字', placeholder: '请输入新增tags名字', defaultValue: name })
        if (promptInstance.result !== 1) return

        const tagName = promptInstance.data
        const editInstance = await service.editTag({ id, name: tagName })
        if (editInstance.result !== 1) return Confirm(editInstance.message)

        this.initAllTaskTagInfor()
    }

    deleteHandle = async ({ id }) => {
        const confirmInstance = await Confirm('确定要删除这个标签吗?')
        if (confirmInstance.result !== 1) return

        const deleteInstance = await service.deleteTag({ id })
        if (deleteInstance.result !== 1) return Confirm(deleteInstance.message)

        this.initAllTaskTagInfor()
    }

    confirmResolveHandle = async () => {
        const { resolve } = this.props
        const { tagOptions } = this.state
        resolve(consequencer.success(tagOptions))
    }

    cancelRejectHandle = async () => {
        const { reject } = this.props
        reject(consequencer.error('cancel'))
    }

    render() {
        const { tagOptions } = this.state

        return <div className='tag-edit-container' style={{ padding: '25px 15px 15px 15px', backgroundColor: '#f1f1f1' }}>
            <div style={{ paddingBottom: '15px' }}>{tagOptions.map((tag, key) =>
                <TagEditItem key={key}
                    editHandle={() => this.editHandle({ id: tag.value, name: tag.label })}
                    deleteHandle={() => this.deleteHandle({ id: tag.value })}
                >{tag.label}</TagEditItem>
            )}</div>

            <Button onClick={this.addTagHandle}>新增标签</Button>

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

const TagEditItem = ({ children, editHandle, deleteHandle }) => <div style={{ paddingBottom: '15px' }}>
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

export default TagEdit