import { getProcess, clearProcess } from './../../components/process-task/index.jsx';
import { confirmPopUp } from './../../components/confirm-popup.js';
import { inputPopUpDestroy, inputPopUp } from './../../components/input-popup.js';
import fetch from './../../components/async-fetch/fetch.js';
import serviceStorage from './../../components/service-storage/index.js';
import toast from './../../components/toast.js';

import timeTransformers from './../../utils/time-transformers.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            processTarget: CONST.PROCESS_TARGET.DEFAULTS,
            processTask: CONST.TASK.DEFAULTS,
            todoTask: CONST.TASK.DEFAULTS,
            isShowDetails: false,
            isShowConclusion: false,
        }
    }

    async componentDidMount() {
        this.initProcessTarget()
        await this.initProcessTask()
        await this.initTodoTask()
    }

    initProcessTarget() {
        const processInstance = getProcess()
        if (processInstance.result !== 1) return /** 含义: 加载失败缓存 */
        const { id, name } = processInstance.data
        this.setState({
            processTarget: { id, name }
        })
    }

    processTargetHandle() {
        const self = this
        const { processTarget } = this.state
        const delHandle = () => {
            clearProcess()
            self.setState({ processTarget: CONST.PROCESS_TARGET.DEFAULTS })
        }
        const selectHandle = () => window.location.href = './../target/index.html?redirect=selectTodoTarget'
        const isSelectStatus = (!!processTarget && processTarget.id);

        /** 选中状态需要删除 */
        isSelectStatus ? confirmPopUp({
            title: `确认要解除锁定“${processTarget.name}”?`,
            succeedHandle: delHandle
        }) : confirmPopUp({
            title: `你要选择目标范围?`,
            succeedHandle: selectHandle
        })
    }

    async initProcessTask() {
        var self = this
        await serviceStorage.getItem({
            key: 'processTask',
            hiddenError: true
        }).then(
            res => {
                self.setState({ processTask: res })
            },
            error => { }
        )
    }

    processTaskHandle() {
        const self = this
        const { processTask, todoTask } = this.state
        const executeTask = () => serviceStorage.setItem({
            key: 'processTask',
            value: todoTask
        }).then(
            res => self.setState({ processTask: todoTask }),
            error => { }
        )

        if (processTask.id && todoTask.id && processTask.id !== todoTask.id) confirmPopUp({
            title: '确定执行此任务?',
            succeedHandle: executeTask
        })
    }

    async initTodoTask(isSwitch) {
        const self = this
        const { processTarget, processTask } = this.state

        let query = {}
        if (processTask && processTask.id && !isSwitch) {
            /** 含义: 如果有正在执行的任务，并且非强制切换的情况 */
            query.taskId = processTask.id
        } else if (processTarget && processTarget.id) {
            query.targetId = processTarget.id
        }
        await fetch.get({
            url: 'task/get/one',
            query
        }).then(
            ({ data }) => self.setState({
                isShowDetails: false,
                isShowConclusion: false,
                todoTask: data
            }),
            error => { }
        )
    }

    showItem(field) {
        let state = {}
        state[field] = true
        this.setState(state)
    }

    editHandle() {
        const { id } = this.state.todoTask
        if (!id) return
        window.localStorage.setItem('task-todo-edit-id', id)
        window.location.href = './edit/index.html'
    }

    completeHandle() {
        const self = this
        const { completeTimestamp, id } = this.state.todoTask

        if (completeTimestamp) return toast.show('任务已被完成');

        const handle = () => {
            fetch.post({
                url: 'task/complete',
                body: {
                    id
                }
            }).then(
                ({ data }) => self.setState({ todoTask: data }),
                error => { }
            )
        }

        confirmPopUp({
            title: `确认要完成此任务??`,
            succeedHandle: handle
        })
    }

    putoffHandle() {
        const self = this
        const nowYear = new Date().getFullYear()
        const handle = data => {
            let myTodoTask = JSON.parse(JSON.stringify(self.state.todoTask))
            myTodoTask.putoffTimestamp = timeTransformers.YYYYmmDDhhMMToTimestamp(data)

            fetch.post({
                url: 'task/update',
                body: myTodoTask
            }).then(
                ({ data }) => self.setState({ todoTask: data }),
                error => { }
            )
        }

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

    addConclusionHandle() {
        const self = this
        const handle = input => {
            let myTodoTask = JSON.parse(JSON.stringify(self.state.todoTask))
            myTodoTask.conclusion += `\n${input}`

            fetch.post({
                url: 'task/update',
                body: myTodoTask
            }).then(
                ({ data }) => self.setState({ todoTask: data }, () => inputPopUpDestroy()),
                error => { }
            )
        }
        inputPopUp({
            title: '得出什么结论?记录什么?',
            inputHandle: handle
        })
    }

    delHandle() {
        const self = this
        const { id } = this.state.todoTask

        const handle = () => {
            fetch.post({
                url: 'task/delete',
                body: {
                    id
                }
            }).then(
                () => self.initTodoTask(true),
                error => { }
            )
        }

        confirmPopUp({
            title: `你确认要删除吗??`,
            succeedHandle: handle
        })
    }

    addTaskHandle() {
        const { processTarget } = this.state
        window.localStorage['task-todo-edit-id'] = '';

        (processTarget && processTarget.id) ? window.location.href = './edit/index.html' : window.location.href = './../target/index.html?redirect=addTodo'
    }

    render() {
        const self = this
        const {
            processTarget,
            processTask,
            todoTask,
            isShowDetails,
            isShowConclusion
        } = this.state
        let {
            title,
            content,
            completeTimestamp,
            putoffTimestamp,
            conclusion,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = todoTask

        content = content ? content.replace(/\n/g, "<br>") : ''
        conclusion = conclusion ? conclusion.replace(/\n/g, "<br>") : ''

        /** 注意: 结论可以跳转到任务的情况(暂时未修复)(细分的需求不重要) */
        let specific = '具体任务内容'
        if (content) {
            specific = content
        } else if (conclusion) {
            specific = `结论: ${conclusion}`
        }

        var nowTimestamp = new Date().getTime()

        return [
            <div className="caching flex-start">
                <div className="caching-container target-container flex-start flex-rest">
                    <div className="task-item flex-rest flex-center"
                        onClick={this.processTargetHandle.bind(this)}
                    >范围: {processTarget ? processTarget.name : '全部'}</div>
                </div>
                <div className="caching-container doing-container flex-start flex-rest">
                    <div className="task-item flex-center flex-rest"
                        onClick={this.processTaskHandle.bind(this)}
                    >{(processTask.id && todoTask.id && processTask.id === todoTask.id) ? '正在执行中' : '执行此任务?'}</div>
                </div>
            </div>,

            <div className="todo">
                <div className="todo-container">
                    {completeTimestamp && <div className="todo-complete flex-center">完成时间: {timeTransformers.dateToYYYYmmDDhhMM(new Date(+completeTimestamp))}</div>}
                    {(!completeTimestamp && putoffTimestamp && putoffTimestamp > nowTimestamp) && <div className="todo-putoff flex-center">推迟的时间: {timeTransformers.dateToYYYYmmDDhhMM(new Date(+putoffTimestamp))}</div>}


                    <div className="todo-title">{title ? title : '标题'}</div>
                    <div className="todo-specific">{specific}</div>

                    {isShowDetails ? (<div className="todo-details">
                        <div className="todo-measure">{measure ? `<span>衡量任务完成的标准?</span>- ${measure}` : '衡量任务完成的标准?'}</div>
                        <div className="todo-span">{span ? `<span>长时间跨度下这任务的意义?</span>- ${span}` : '长时间跨度下这任务的意义?'}</div>
                        <div className="todo-aspects">{aspects ? `<span>任务影响涉及到哪些方面?</span>- ${aspects}` : '任务影响涉及到哪些方面?'}</div>
                        <div className="todo-worth">{worth ? `<span>任务的本质是为了什么?</span>- ${worth}` : '任务的本质是为了什么?'}</div>
                        <div className="todo-time">{estimate ? `<span>是否必须完成?何时?</span>- ${estimate}` : '是否必须完成?何时?'}</div>
                    </div>) : (<div className="todo-operation flex-start-center">
                        <div className="todo-details-operation flex-rest flex-center"
                            onClick={() => self.showItem('isShowDetails')}
                        >显示任务详情?</div>
                    </div>)}

                    {isShowConclusion ? (
                        <div className="todo-conclusions">{conclusion ? conclusion : '暂无任务结论'}</div>
                    ) : (<div className="todo-operation flex-start-center">
                        <div className="todo-conclusion-operation flex-rest flex-center"
                            onClick={() => self.showItem('isShowConclusion')}
                        >显示结论?</div>
                    </div>)}

                    <div className="todo-operation flex-start-center">
                        <div className="operation-item flex-rest flex-center"
                            onClick={this.editHandle.bind(this)}
                        >编辑?</div>
                        <span></span>
                        <div className="operation-item flex-rest flex-center"
                            onClick={() => this.initTodoTask(true)}
                        >todo other?</div>
                        <span></span>
                        <div className="operation-item flex-rest flex-center"
                            onClick={this.completeHandle.bind(this)}
                        >完成?</div>
                    </div>

                    <div className="todo-operation flex-start-center">
                        <input type="text" id="picka-date" placeholder="YYYY-MM-DD hh:mm" />
                        <div className="operation-item flex-rest flex-center"
                            onClick={this.putoffHandle.bind(this)}
                        >推迟?</div>
                        <span></span>
                        <div className="operation-item flex-rest flex-center"
                            onClick={this.addConclusionHandle.bind(this)}
                        >新增结论?</div>
                        <span></span>
                        <div className="operation-item flex-rest flex-center"
                            onClick={this.delHandle.bind(this)}
                        >删除?</div>
                    </div>
                </div>
            </div>,
            <div className="operation">
                <div className="operation-button"
                    onClick={() => window.location.href = './list/index.html'}
                >还有什么可以做?</div>
                <div className="dividing-line"></div>
                <div className="operation-button"
                    onClick={() => window.location.href = './../why/index.html'}
                >为什么要做这个?</div>
                <div className="dividing-line"></div>
                <div className="operation-button"
                    onClick={this.addTaskHandle.bind(this)}
                >新增任务?</div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
