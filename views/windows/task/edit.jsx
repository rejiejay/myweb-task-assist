import fetch from './../../../components/async-fetch/fetch.js';
import toast from './../../../components/toast.js'
import { confirmPopUp } from './../../../components/confirm-popup.js';
import { getProcess } from './../../../components/process-task/index.jsx';

import CONST from './const.js';

class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
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

        if (!!!id) {
            this.status = CONST.PAGE_EDIT_STATUS.ADD
            return this.setState({
                title: '',
                content: '',
                measure: '',
                span: '',
                aspects: '',
                worth: '',
                estimate: '',
                putoffTimestamp: null
            })
        }

        this.id = id
        this.status = CONST.PAGE_EDIT_STATUS.EDIT

        await fetch.get({
            url: 'task/get/one',
            query: { taskId: id }
        }).then(
            ({ data }) => {
                self.task = data
                self.setState({
                    title: data.title,
                    content: data.content,
                    measure: data.measure,
                    span: data.span,
                    aspects: data.aspects,
                    worth: data.worth,
                    estimate: data.estimate,
                    putoffTimestamp: data.putoffTimestamp
                })
            },
            error => { }
        )
    }

    closeHandle() {
        const { title, content } = this.state
        const { status } = this
        const { editTaskCloseHandle } = this.props

        if (status === CONST.PAGE_EDIT_STATUS.ADD && !!!title && !!!content) return editTaskCloseHandle({ isUpdate: false });

        confirmPopUp({
            title: '你确认要退出吗?',
            succeedHandle: () => editTaskCloseHandle({ isUpdate: true })
        })
    }

    addHandle() {
        const { editTaskCloseHandle } = this.props
        const { title, content, measure, span, aspects, worth, estimate, putoffTimestamp } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!content) return toast.show('内容不能为空');

        const process = getProcess()

        fetch.post({
            url: 'task/add',
            body: {
                targetId: process.data.id,
                title,
                content,
                measure,
                span,
                aspects,
                worth,
                estimate,
                putoffTimestamp: putoffTimestamp ? timeTransformers.YYYYmmDDhhMMToTimestamp(putoffTimestamp) : null
            }
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )
    }

    editHandle() {
        const { editTaskCloseHandle } = this.props
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
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )
    }

    delHandle() {
        const { editTaskCloseHandle } = this.props
        const { id } = this

        const handle = () => fetch.post({
            url: 'task/conclusion/delete',
            body: { id }
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
    }

    putoffHandle() {
        const self = this
        const nowYear = new Date().getFullYear()
        const handle = data => self.setState({ putoffTimestamp: timeTransformers.YYYYmmDDhhMMToTimestamp(data) })

        const datepicker = new Rolldate({
            el: '#picka-date',
            format: 'YYYY-MM-DD hh:mm',
            beginYear: nowYear,
            endYear: nowYear + 10,
            lang: {
                title: '推迟到什么时候?'
            },
            confirm: function confirm(date) {
                const nowTime = new Date().getTime()
                const pickerTime = new Date(date.replace(/\-/g, "\/")).getTime()

                if (nowTime > pickerTime) {
                    toast.show('不能小于当前的日期')
                    return false;
                }

                handle(date)
            }
        })

        datepicker.show()
    }

    putoffClearHandle() {
        document.getElementById('picka-date').value = ''
        this.setState({ putoffTimestamp: null });
    }

    render() {
        const self = this
        const { isShow } = this.props
        const { title, content, conclusion } = this.state
        const { clientHeight, status } = this
        const minHeight = clientHeight - 46 - 26 - 52

        return [
            <div className="edit flex-center" style={!!!isShow ? { display: 'none' } : {}}>
                <div className="edit-container flex-start-top">
                    <div className="edit-operating flex-rest"
                        style={{ minHeight }}
                    >
                        <div className="title-input flex-center">
                            <input type="text" placeholder="简单描述/提问"
                                value={title}
                                onChange={({ target: { value } }) => this.setState({ title: value })}
                            />
                        </div>
                        <div className="content-input">
                            <textarea className="content-textarea fiex-rest" type="text"
                                placeholder="任务具体内容是什么"
                                style={{ height: minHeight - 63 - 32 }}
                                value={content}
                                onChange={({ target: { value } }) => this.setState({ content: value })}
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
                            {
                                conclusion && <div className="item-description-container">
                                    <div className="item-description"
                                        dangerouslySetInnerHTML={{ __html: conclusion.replace(/\n/g, "<br>") }}
                                    ></div>
                                </div>
                            }
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
