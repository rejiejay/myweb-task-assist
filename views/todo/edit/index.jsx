import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';
import { confirmPopUp } from './../../../components/confirm-popup.js';
import serviceStorage from './../../../components/service-storage/index.js'

import timeTransformers from './../../../utils/time-transformers.js';
import jsonHandle from './../../../utils/json-handle.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            task: CONST.TASK.DEFAULTS,
            title: null,
            content: null,
            conclusion: null,
            measure: null,
            span: null,
            aspects: null,
            worth: null,
            estimate: null,
            putoffTimestamp: null
        }

        this.status = CONST.PAGE_STATUS.DEFAULTS
        this.id = null
    }

    async componentDidMount() {
        this.initPageStatus()
        await this.initDate()
    }

    initPageStatus() {
        const id = window.localStorage['task-todo-edit-id']

        if (id && id !== 'null') {
            window.localStorage['task-todo-edit-id'] = ''
            this.status = CONST.PAGE_STATUS.EDIT
            this.id = id
        } else {
            this.status = CONST.PAGE_STATUS.ADD

            const templateStr = window.localStorage['task-todo-template']
            const templateVerify = templateStr ? jsonHandle.verifyJSONString({
                jsonString: templateStr
            }) : { isCorrect: false }

            if (templateVerify.isCorrect) this.setState({
                title: templateVerify.data.title,
                content: templateVerify.data.content,
                conclusion: templateVerify.data.conclusion,
                measure: templateVerify.data.measure,
                span: templateVerify.data.span,
                aspects: templateVerify.data.aspects,
                worth: templateVerify.data.worth,
                estimate: templateVerify.data.estimate,
            })
            window.localStorage['task-todo-template'] = ''
        }
    }

    async initDate() {
        const self = this
        const { status, id } = this

        if (status !== CONST.PAGE_STATUS.EDIT) return

        await fetch.get({
            url: 'task/get/one',
            query: {
                taskId: id
            }
        }).then(
            ({ data }) => self.setState({
                task: data,
                title: data.title,
                content: data.content,
                conclusion: data.conclusion,
                measure: data.measure,
                span: data.span,
                aspects: data.aspects,
                worth: data.worth,
                estimate: data.estimate,
                putoffTimestamp: data.putoffTimestamp
            }),
            error => { }
        )
    }

    putoffHandle() {
        const self = this
        const nowYear = new Date().getFullYear()
        const handle = data => self.setState({ putoffTimestamp: data })

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

    saveHandle() {
        const self = this
        const {
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
        if (!title) return toast.show('标题不能为空');
        if (!content) return toast.show('内容不能为空');

        const process = getProcess()

        fetch.post({
            url: 'task/add',
            body: {
                targetId: process.data.id,
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
            ({ data }) => serviceStorage.setItem({
                key: 'processTask',
                value: data
            }).then(
                res => window.location.replace('./../index.html'),
                error => { }
            ),
            error => { }
        )
    }

    editHandle() {
        const { id } = this
        const {
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
            () => window.location.replace('./../index.html'),
            error => { }
        )
    }

    completeHandle() {
        const { id } = this.state.task
        const handle = () => fetch.post({
            url: 'task/complete',
            body: { id }
        }).then(
            () => window.location.replace('./../index.html'),
            error => { }
        )
        confirmPopUp({
            title: `确认要完成任务?`,
            succeedHandle: handle
        })
    }

    cancelHandle() {
        const handle = () => window.location.replace('./../index.html');
        confirmPopUp({
            title: `确认要返回?`,
            succeedHandle: handle
        })
    }

    deleteHandle() {
        const { id } = this.state.task
        const handle = () => fetch.post({
            url: 'task/delete',
            body: { id }
        }).then(
            res => serviceStorage.clearItem({ key: 'processTask' }).then(
                res => window.location.replace('./../index.html'),
                error => { }
            ),
            error => { }
        )

        confirmPopUp({
            title: `确认要解除删除?`,
            succeedHandle: handle
        })
    }

    render() {
        const self = this
        const {
            task,
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
        const status = this.status

        return [
            <div class="edit">
                <div class="edit-title edit-required">*简单描述/提问:</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="简单描述/提问"
                        value={title}
                        onChange={({ target: { value } }) => this.setState({ title: value })}
                    />
                </div>
                <div class="edit-title edit-required">*任务具体内容是什么:</div>

                <div class="edit-input flex-start-center">
                    <textarea rows="5" type="text" placeholder="任务具体内容是什么"
                        value={content}
                        onChange={({ target: { value } }) => this.setState({ content: value })}
                    ></textarea>
                </div>

                <div class="edit-title">衡量任务完成的标准?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="衡量任务完成的标准"
                        value={measure}
                        onChange={({ target: { value } }) => this.setState({ measure: value })}
                    />
                </div>

                <div class="edit-title">长时间跨度下这任务的意义?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="长时间跨度下这任务的意义"
                        value={span}
                        onChange={({ target: { value } }) => this.setState({ span: value })}
                    />
                </div>

                <div class="edit-title">任务影响涉及到哪些方面?好处?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="任务影响涉及到哪些方面?好处?"
                        value={aspects}
                        onChange={({ target: { value } }) => this.setState({ aspects: value })}
                    />
                </div>

                <div class="edit-title">任务的本质是为了什么?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="任务的本质是为了什么"
                        value={worth}
                        onChange={({ target: { value } }) => this.setState({ worth: value })}
                    />
                </div>

                <div class="edit-title">是否必须完成?何时?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="是否必须完成"
                        value={estimate}
                        onChange={({ target: { value } }) => this.setState({ estimate: value })}
                    />
                </div>

                <div class="edit-title">是否需要推迟完成?</div>
                <div class="edit-input flex-start-center">
                    <input readonly type="text"
                        id="picka-date"
                        value={putoffTimestamp ? timeTransformers.dateToYYYYmmDDhhMM(new Date(putoffTimestamp)) : ''}
                        placeholder="推迟?"
                        onClick={this.putoffHandle.bind(this)}
                    />
                    <div class="picka-clear flex-center"
                        onClick={this.putoffClearHandle.bind(this)}
                    >取消</div>
                </div>

                <div class="edit-title">得出什么结论?</div>
                <div class="edit-input flex-start-center">
                    <textarea rows="5" type="text" placeholder="结论"
                        value={conclusion}
                        onChange={({ target: { value } }) => this.setState({ conclusion: value })}
                    ></textarea>
                </div>
            </div>,

            <div class="operation">
                <div class="operation-container flex-start-center">
                    {status === CONST.PAGE_STATUS.ADD && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.saveHandle.bind(this)}
                        >保存</div>
                    ]}
                    {status === CONST.PAGE_STATUS.EDIT && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.editHandle.bind(this)}
                        >修改</div>
                    ]}
                    {status === CONST.PAGE_STATUS.EDIT && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.completeHandle.bind(this)}
                        >done</div>
                    ]}
                    {status === CONST.PAGE_STATUS.ADD && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.cancelHandle.bind(this)}
                        >取消</div>
                    ]}
                    {status === CONST.PAGE_STATUS.EDIT && [
                        <div class="vertical-line"></div>,
                        <div class="operation-button flex-center flex-rest"
                            onClick={this.deleteHandle.bind(this)}
                        >删除</div>
                    ]}
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
