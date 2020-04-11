import fetch from './../../../components/async-fetch/fetch.js';
import toast from './../../../components/toast.js'
import { confirmPopUp } from './../../../components/confirm-popup.js';
import { getProcess } from './../../../components/process-task/index.jsx';
import timeTransformers from './../../../utils/time-transformers.js';

import CONST from './const.js';

class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            copy: window.sessionStorage['task-copy-edit'],
            title: '',
            content: '',
            measure: '',
            span: '',
            aspects: '',
            worth: '',
            estimate: '',
            putoffTimestamp: null
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

    verifyEditDiff() {
        const { status } = this
        if (status !== CONST.PAGE_EDIT_STATUS.EDIT) return false

        const { title, content, measure, span, aspects, worth, estimate, putoffTimestamp } = this.state
        const task = this.task

        let isDiff = false
        if (title !== task.title) isDiff = true
        if (content !== task.content) isDiff = true
        if (measure !== task.measure) isDiff = true
        if (span !== task.span) isDiff = true
        if (aspects !== task.aspects) isDiff = true
        if (worth !== task.worth) isDiff = true
        if (estimate !== task.estimate) isDiff = true
        if (putoffTimestamp !== task.putoffTimestamp) isDiff = true
        return isDiff
    }

    closeHandle() {
        const { title, content } = this.state
        const { status } = this
        const { editTaskCloseHandle } = this.props

        if (status === CONST.PAGE_EDIT_STATUS.ADD && !!!title && !!!content) return editTaskCloseHandle({ isUpdate: false });
        if (this.verifyEditDiff() === false) return editTaskCloseHandle({ isUpdate: false });

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
                putoffTimestamp
            }
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )
    }

    editHandle() {
        const { editTaskCloseHandle } = this.props
        const { id } = this
        const { title, content, measure, span, aspects, worth, estimate, putoffTimestamp } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!content) return toast.show('内容不能为空');

        fetch.post({
            url: 'task/update',
            body: {
                id,
                title,
                content,
                conclusion,
                measure,
                span,
                aspects,
                worth,
                estimate,
                putoffTimestamp
            }
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )
    }

    delHandle() {
        const { editTaskCloseHandle } = this.props
        const { id } = this

        const handle = () => fetch.post({
            url: 'task/delete',
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

    copyHandle() {
        const { title, content, conclusion, measure, span, aspects, worth, estimate, putoffTimestamp } = this.state
        const copy = JSON.stringify({ title, content, conclusion, measure, span, aspects, worth, estimate, putoffTimestamp })
        window.sessionStorage.setItem('task-copy-edit', copy)
        this.setState({ copy })
    }

    copyClearHandle() {
        window.sessionStorage['task-copy-edit'] = ''
        this.setState({ copy: null })
    }

    pasteHandle() {
        const copy = window.sessionStorage['task-copy-edit']
        if (copy) this.setState(JSON.parse(copy))
    }

    render() {
        const self = this
        const { isShow } = this.props
        const {
            copy,
            title,
            content,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate,
            putoffTimestamp
        } = this.state
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
                    <div className="edit-other">
                        <div className="edit-other-container"
                            style={{ minHeight }}
                        >
                            <div className="other-operating">
                                <div className="other-operating-container flex-center close-container noselect"
                                    onClick={this.closeHandle.bind(this)}
                                >关闭</div>
                            </div>
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="other-operating">
                                <div className="other-operating-container flex-center noselect"
                                    onClick={this.copyHandle.bind(this)}
                                >复制</div>
                            </div>}
                            {copy && <div className="other-operating">
                                <div className="other-operating-container flex-center noselect"
                                    onClick={this.copyClearHandle.bind(this)}
                                >清除</div>
                            </div>}
                            {copy && <div className="other-operating">
                                <div className="other-operating-container flex-center noselect"
                                    onClick={this.pasteHandle.bind(this)}
                                >粘贴</div>
                            </div>}
                            <div className="other-input">
                                <div class="edit-title">衡量任务完成的标准?</div>
                                <div class="edit-input flex-start-center">
                                    <input type="text" placeholder="衡量任务完成的标准"
                                        value={measure}
                                        onChange={({ target: { value } }) => this.setState({ measure: value })}
                                    />
                                </div>
                            </div>
                            <div className="other-input">
                                <div class="edit-title">长时间跨度下这任务的意义?</div>
                                <div class="edit-input flex-start-center">
                                    <input type="text" placeholder="长时间跨度下这任务的意义"
                                        value={span}
                                        onChange={({ target: { value } }) => this.setState({ span: value })}
                                    />
                                </div>
                            </div>
                            <div className="other-input">
                                <div class="edit-title">任务影响涉及到哪些方面?好处?</div>
                                <div class="edit-input flex-start-center">
                                    <input type="text" placeholder="任务影响涉及到哪些方面?好处?"
                                        value={aspects}
                                        onChange={({ target: { value } }) => this.setState({ aspects: value })}
                                    />
                                </div>
                            </div>
                            <div className="other-input">
                                <div class="edit-title">任务的本质是为了什么?</div>
                                <div class="edit-input flex-start-center">
                                    <input type="text" placeholder="任务的本质是为了什么"
                                        value={worth}
                                        onChange={({ target: { value } }) => this.setState({ worth: value })}
                                    />
                                </div>
                            </div>
                            <div className="other-input">
                                <div class="edit-title">是否必须完成?何时?</div>
                                <div class="edit-input flex-start-center">
                                    <input type="text" placeholder="是否必须完成"
                                        value={estimate}
                                        onChange={({ target: { value } }) => this.setState({ estimate: value })}
                                    />
                                </div>
                            </div>
                            <div className="other-input">
                                <div class="edit-title">是否需要推迟完成?</div>
                                <div class="edit-input flex-start-center">
                                    <input readonly type="text"
                                        id="picka-date"
                                        value={putoffTimestamp ? timeTransformers.dateToYYYYmmDDhhMM(new Date(+putoffTimestamp)) : ''}
                                        placeholder="推迟?"
                                        onClick={this.putoffHandle.bind(this)}
                                    />
                                    <div class="picka-clear flex-center"
                                        onClick={this.putoffClearHandle.bind(this)}
                                    >取消</div>
                                </div>
                            </div>
                            {
                                conclusion && <div className="item-description-container">
                                    <div className="item-description"
                                        dangerouslySetInnerHTML={{ __html: conclusion.replace(/\n/g, "<br>") }}
                                    ></div>
                                </div>
                            }
                            {status === CONST.PAGE_EDIT_STATUS.ADD && <div className="other-operating">
                                <div className="other-operating-container flex-center noselect"
                                    onClick={this.addHandle.bind(this)}
                                >新增</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="other-operating">
                                <div className="other-operating-container flex-center noselect"
                                    onClick={this.editHandle.bind(this)}
                                >编辑</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="other-operating">
                                <div className="other-operating-container flex-center noselect"
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
