import fetch from './../../components/async-fetch/fetch.js';
import { confirmPopUp } from './../../components/confirm-popup.js';
import { getProcess } from './../../components/process-task/index.jsx';

import CONST from './const.js';

class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            conclusion: '',
            image: null
        }

        this.status = CONST.PAGE_EDIT_STATUS.DEFAULTS
        this.task = CONST.TASK.DEFAULTS
        this.id = null

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async init(id) {
        const self = this
        if (!!!id) return this.setState({
            title: '',
            conclusion: '',
            image: null
        }, () => self.status = CONST.PAGE_EDIT_STATUS.ADD)

        this.id = id

        await fetch.get({
            url: 'task/get/one',
            query: { taskId: id }
        }).then(
            ({ data }) => {
                self.task = data
                self.setState({
                    title: data.title,
                    conclusion: data.conclusion,
                    image: data.image
                })
            },
            error => { }
        )
    }

    closeHandle() {
        const { title, conclusion, image } = this.state
        const { editTaskHandle } = this.props
        const { status } = this
        const task = this.task

        /** 含义: 未有任何数据 */
        if (status === CONST.PAGE_EDIT_STATUS.ADD && !!!title && !!!conclusion && !!!image) return editTaskHandle();
        if (status === CONST.PAGE_EDIT_STATUS.EDIT && title === task.title && conclusion === task.conclusion && image === task.image) return editTaskHandle();

        confirmPopUp({
            title: `数据未保存, 你确认要退出吗?`,
            succeedHandle: () => editTaskHandle()
        })
    }

    addHandle() {
        const { editTaskHandle } = this.props
        const { title, conclusion, image } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        const { data: { id } } = getProcess()
        let body = {
            targetId: id,
            title,
            conclusion
        }
        image ? body.image = image : null

        fetch.post({
            url: 'task/conclusion/add',
            body: body
        }).then(
            res => editTaskHandle(true),
            error => { }
        )
    }

    editHandle() {
        const { editTaskHandle } = this.props
        const { id } = this
        const { title, conclusion, image } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        let body = {
            id,
            title,
            conclusion
        }
        image ? body.image = image : null

        fetch.post({
            url: 'task/conclusion/edit',
            body: body
        }).then(
            res => editTaskHandle(true),
            error => { }
        )
    }

    delHandle() {
        const { id } = this

        const handle = () => fetch.post({
            url: 'task/delete',
            body: { id }
        }).then(
            res => editTaskHandle(true),
            error => { }
        )

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
    }

    render() {
        const { isShow } = this.props
        const { title, conclusion, image } = this.state
        const { clientHeight, status } = this
        const minHeight = clientHeight - 46 - 26 - 52

        return [
            <div className="edit flex-center" style={!!!isShow ? { display: 'none' } : {}}>
                <div className="edit-container flex-start-top">
                    <div className="edit-operating flex-rest"
                        style={{ minHeight }}
                    >
                        <div className="title-input flex-center">
                            <input type="text" placeholder="请输入题目"
                                value={title}
                                onChange={({ target: { value } }) => this.setState({ title: value })}
                            />
                        </div>
                        <div className="content-input">
                            <textarea className="content-textarea fiex-rest" type="text"
                                placeholder="请输入结论"
                                style={{ height: minHeight - 63 - 32 }}
                                value={conclusion}
                                onChange={({ target: { value } }) => this.setState({ conclusion: value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="edit-preview">
                        <div className="edit-preview-container"
                            style={{ minHeight }}
                        >
                            <div className="preview-operating">
                                <div className="preview-operating-container flex-center close-container noselect"
                                    onClick={this.closeHandle.bind(this)}
                                >关闭</div>
                            </div>
                            <div className="item-description-container">
                                <div className="item-description"
                                    dangerouslySetInnerHTML={{ __html: conclusion.replace(/\n/g, "<br>") }}
                                ></div>
                            </div>
                            {!!!image && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect">图片</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.ADD && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.addHandle.bind(this)}
                                >新增</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.editHandle.bind(this)}
                                >编辑</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.delHandle.bind(this)}
                                >删除</div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        ]
    }
}

export default EditComponent
