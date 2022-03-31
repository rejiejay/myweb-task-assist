import Confirm from './../../../../components/confirm';
import toast from './../../../../components/toast';
import {
    getLongTermDetailById,
    editLongTerm,
    setLongTermToTop,
    deleteLongTerm,
} from '../../../../service/long-term';

export default class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',

            title: '',

            content: '',
        }

        this.originTitle = '';
        this.originContent = '';

        const clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.minContainerHeight = `${clientHeight - 160}px`;
    }

    initById = async id => {
        const result = await getLongTermDetailById(id);
        if (result instanceof Error) return
        this.initData(result)
    }

    onContentChangeHandle = ({ target: { value } }) => {
        this.setState({ content: value })
    }

    onTitleChangeHandle = ({ target: { value } }) => {
        this.setState({ title: value })
    }

    editLongTermHandle = async () => {
        const { updateLongTerm } = this.props
        const longTermId = this.state.id
        const title = this.state.title
        let content = this.state.content
        const { originTitle, originContent } = this
        if (!title) return toast.show('标题不能为空')
        if (title === originTitle && content === originContent) return
        if (!content) content = 'null'

        const result = await editLongTerm(longTermId, title, content);
        if (result instanceof Error) return
        this.initData(result)
        updateLongTerm()
    }

    initData = result => {
        const title = result.name
        const content = result.description || ''
        this.setState({
            id: result.id,
            title,
            content,
        })
        this.originTitle = title;
        this.originContent = content;
    }

    setLongTermToTopHandle = async () => {
        const { updateLongTerm } = this.props
        const longTermId = this.state.id
        const result = await setLongTermToTop(longTermId);
        if (result instanceof Error) return
        updateLongTerm()
    }

    deleteLongTermHandle = async () => {
        const { updateLongTerm } = this.props
        const longTermId = this.state.id
        const confirmInstance = await Confirm('确定要删除长期任务吗?')
        if (confirmInstance.result !== 1) return
        const result = await deleteLongTerm(longTermId);
        if (result instanceof Error) return Confirm(result.message)
        updateLongTerm()
    }

    render() {
        const { minContainerHeight } = this
        const { id, title, content } = this.state

        return <>
            <div className="preview-header flex-start-center noselect">
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={() => window.open(`./../long-term-detail/?id=${id}`)}
                >进入</div>
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={this.editLongTermHandle}
                >保存</div>
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={this.setLongTermToTopHandle}
                >置顶</div>
                <div className="operat-item hover-item flex-center flex-rest"
                    onClick={this.deleteLongTermHandle}
                >删除</div>
            </div>
            <div className="preview-container flex-rest flex-column">
                <div className="preview-container-title">
                    <input
                        value={title}
                        onChange={this.onTitleChangeHandle}
                    />
                </div>
                <div className="preview-container-main flex-rest">
                    <div className="preview-container-content">
                        <textarea
                            style={{ minHeight: minContainerHeight }}
                            value={content || ''}
                            onChange={this.onContentChangeHandle}
                        />
                    </div>
                </div>
            </div>
        </>
    }
}
