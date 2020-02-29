import { getProcess, clearProcess } from './../../components/process-task/index.jsx';
import { confirmPopUp } from './../../components/confirm-popup.js';
import serviceStorage from './../../components/service-storage/index.js';

import consequencer from './../../utils/consequencer.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            processTarget: CONST.PROCESS_TARGET.DEFAULTS,
            processTask: CONST.TASK.DEFAULTS,
            todoTask: CONST.TASK.DEFAULTS
        }
    }

    async componentDidMount() {
        this.initProcessTarget()
        await this.initProcessTask()
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
        await new Promise((resolve, reject) => {
            serviceStorage.getItem({
                key: 'processTask',
                hiddenError: true
            }).then(
                res => {
                    self.setState({ processTask: res })
                    resolve()
                },
                error => reject()
            )
        })
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

        if (!processTask.id && !todoTask.id && processTask.id !== todoTask.id) confirmPopUp({
            title: '确定执行此任务?',
            succeedHandle: executeTask
        })
    }

    render() {
        const { processTarget, processTask, todoTask } = this.state

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
                    <div className="todo-title">标题</div>
                    <div className="todo-specific">具体任务内容</div>

                    <div className="todo-putoff flex-center">推迟的时间?</div>
                    <div className="todo-complete flex-center" >完成的时间?</div>

                    <div className="todo-operation flex-start-center">
                        <div className="todo-details-operation flex-rest flex-center" >任务详情?</div>
                        <div className="todo-conclusion-operation flex-rest flex-center" >显示结论/记录?</div>
                    </div>

                    <div className="todo-details">
                        <div className="todo-measure">衡量任务完成的标准?</div>
                        <div className="todo-span">长时间跨度下这任务的意义?</div>
                        <div className="todo-aspects">任务影响涉及到哪些方面?好处?</div>
                        <div className="todo-worth">任务的本质是为了什么?</div>
                        <div className="todo-time">是否必须完成?何时?</div>
                    </div>

                    <div className="todo-conclusions">任务结论</div>

                    <div className="todo-record-add flex-center" >新增结论/记录?</div>

                    <div className="todo-operation flex-start-center">
                        <div className="operation-item flex-rest flex-center" >完成?</div>
                        <input type="text" placeholder="YYYY-MM-DD hh:mm" />
                        <div className="operation-item flex-rest flex-center" >推迟?</div>
                        <div className="operation-item flex-rest flex-center" >编辑?</div>
                        <div className="operation-item flex-rest flex-center" >删除?</div>
                        <div className="operation-item flex-rest flex-center" >todo other?</div>
                    </div>
                </div>
            </div>,
            <div className="operation">
                <div className="operation-button">还有什么可以做?</div>
                <div className="dividing-line"></div>
                <div className="operation-button">为什么要做这个?</div>
                <div className="dividing-line"></div>
                <div className="operation-button">新增任务?</div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
