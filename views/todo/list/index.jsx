import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess, ProcessTask } from './../../../components/process-task/index.jsx'
import serviceStorage from './../../../components/service-storage/index.js'

import jsonHandle from './../../../utils/json-handle.js'
import timeTransformers from './../../../utils/time-transformers.js'

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            executableTask: [
                // CONST.TASK.DEFAULTS
            ],

            isShowPutoff: false,
            putoffTask: [
                // CONST.TASK.DEFAULTS
            ],

            isShowComplete: false,
            completeTask: [
                // CONST.TASK.DEFAULTS
            ]
        }

        this.completePageNo = 1
        this.completeCount = 0
        this.completeExpiredTimestamp = new Date().getTime()
    }

    async componentDidMount() {
        await this.initExecutableTask()
        await this.initPutoffTask()
        await this.initCompleteTask()
    }

    async initExecutableTask() {
        const self = this
        const processTask = getProcess()
        const query = processTask.result === 1 ? {
            targetId: processTask.data.id
        } : {}

        await fetch.get({
            url: 'task/get/list/executable',
            query
        }).then(
            ({ data }) => self.setState({ executableTask: data }),
            error => { }
        )
    }

    async initPutoffTask() {
        const self = this
        const processTask = getProcess()
        const query = processTask.result === 1 ? { targetId: processTask.data.id } : {}

        await fetch.get({
            url: 'task/get/list/putoff',
            query
        }).then(
            ({ data }) => self.setState({ putoffTask: data }),
            error => { }
        )
    }

    async initCompleteTask(isForceRefresh) {
        const self = this
        let { completeTask } = this.state
        const { completePageNo, completeCount } = this
        const query = { pageNo: completePageNo }
        const processTask = getProcess()
        processTask.result === 1 ? query.targetId = processTask.data.id : {}

        await fetch.get({
            url: 'task/get/list/complete',
            query
        }).then(
            ({ data }) => {
                if (data.length === 0) return

                /**
                 * 含义: 判断是否新增
                 */
                if (completeTask.length > 0 && completePageNo > 1 && completeCount > 1) {
                    completeTask = completeTask.concat(data)
                } else {
                    completeTask = data
                }

                self.setState({ completeTask })
            },
            error => { }
        )

        await this.initCompleteStatistics(isForceRefresh)
    }

    /**
     * 初衷: 避免消耗太多SQL性能
     * 定义: 1分钟刷新一次
     */
    async initCompleteStatistics(isForceRefresh) {
        const self = this
        let { completeExpiredTimestamp } = this
        const processTask = getProcess()
        const query = processTask.result === 1 ? { targetId: processTask.data.id } : {}

        const nowTimestamp = new Date().getTime()
        const statisticString = window.localStorage['task-complete-list-statistics']
        const verify = statisticString ? jsonHandle.verifyJSONString({
            jsonString: statisticString
        }) : { isCorrect: false }

        /**
         * 含义: 强制刷新就不需要做任何操作
         */
        if (!isForceRefresh) {
            if (verify.isCorrect) {
                /** 含义: 解析缓存失败成功, 继续判断是否过期 */
                completeExpiredTimestamp = +verify.data.expiredTimestamp
            } else {
                console.log('解析缓存“已完成任务的统计”失败了, 表示统计数据已经过期 ')
                /** 含义: 解析缓存失败情况, 就当过期 */
                completeExpiredTimestamp = nowTimestamp
            }

            /** 
             * 注意: 时间是递增的
             * 定义: 当前时间大于过期时间, 表示过期
             */
            if (nowTimestamp < +completeExpiredTimestamp) {
                /** 此处是未过期情况 */
                const { count } = verify.data
                console.log(`解析缓存“已完成任务的统计”成功, 共有${count}条已经完成任务, 还有${Math.ceil((completeExpiredTimestamp - nowTimestamp) / 1000)}秒过期!`)
                return this.completeCount = count
            }
        }

        await fetch.get({
            url: 'task/statistics/list/complete',
            query
        }).then(
            ({ data }) => {
                const expiredTimestamp = (nowTimestamp + (1000 * 60 * 1));
                console.log(`缓存统计数据(${data})一分钟(${timeTransformers.dateToYYYYmmDDhhMM(new Date(expiredTimestamp))}过期)`)
                window.localStorage['task-complete-list-statistics'] = JSON.stringify({
                    count: +data,
                    expiredTimestamp
                })
                self.completeCount = +data
                self.completeExpiredTimestamp = +expiredTimestamp
            },
            error => { }
        )
    }

    async unlockProcessTaskHandle() {
        this.completePageNo = 1
        this.completeCount = 0
        await this.initExecutableTask()
        await this.initPutoffTask()
        await this.initCompleteTask(true)
    }

    showMoreCompleteHandle() {
        let { completePageNo, completeCount } = this
        const diff = completeCount - (completePageNo * 10);

        if (diff <= 0) return toast.show('已经加载所有数据');

        this.completePageNo++
        this.initCompleteTask()
    }

    onClickTaskHandle(task) {
        serviceStorage.setItem({
            key: 'processTask',
            value: task
        }).then(
            res => window.location.href = './../index.html',
            error => { }
        )
    }

    render() {
        const self = this
        const {
            executableTask,
            isShowPutoff,
            putoffTask,
            isShowComplete,
            completeTask
        } = this.state
        const { completePageNo, completeCount } = this
        const diff = completeCount - (completePageNo * 10);

        return [
            <ProcessTask callbackHandle={this.unlockProcessTaskHandle.bind(this)}></ProcessTask>,

            <div class="list executable-task">{
                executableTask.length > 0 ? executableTask.map((task, key) =>
                    <div className="list-item" key={key}>
                        <div className="list-item-container"
                            onClick={() => self.onClickTaskHandle(task)}
                        >
                            <div className="list-item-title">{task.title}</div>
                        </div>
                    </div>
                ) : '已经完成所有任务'
            }</div>,

            isShowPutoff && <div className="list putoff-task">{
                putoffTask.length > 0 ? putoffTask.map((task, key) =>
                    <div className="list-item" key={key}>
                        <div className="list-item-container"
                            onClick={() => self.onClickTaskHandle(task)}
                        >
                            <div className="list-item-title">{task.title}</div>
                            <div className="list-item-time">推迟: {timeTransformers.dateToYYYYmmDDhhMM(new Date(+task.putoffTimestamp))}</div>
                        </div>
                    </div>
                ) : '不存在推迟任务'
            }</div>,
            !isShowPutoff && <div className="button-container">
                <div className="button noselect"
                    onClick={() => self.setState({ isShowPutoff: true })}
                >显示推迟</div>
            </div>,

            isShowComplete && <div className="list complete-task">{
                completeTask.length > 0 ? completeTask.map((task, key) =>
                    <div className="list-item" key={key}>
                        <div className="list-item-container"
                            onClick={() => self.onClickTaskHandle(task)}
                        >
                            <div className="list-item-title">{task.title}</div>
                            <div className="list-item-time">完成: {timeTransformers.dateToYYYYmmDDhhMM(new Date(+task.completeTimestamp))}</div>
                        </div>
                    </div>
                ) : '不存在已完成的任务'
            }</div>,

            isShowComplete && <div className="button-container">
                <div className="button noselect"
                    onClick={this.showMoreCompleteHandle.bind(this)}
                >显示更多({diff > 0 ? diff : 0})</div>
            </div>,
            !isShowComplete && <div className="button-container">
                <div className="button noselect"
                    onClick={() => self.setState({ isShowComplete: true })}
                >显示已完成</div>
            </div>,

            <div className="operation">
                <div className="operation-button">新增任务?</div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
