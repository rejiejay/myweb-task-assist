import { getProcess } from './../../components/process-task/index.jsx';
import fetch from './../../components/async-fetch/fetch.js';
import toast from './../../components/toast.js';

import jsonHandle from './../../utils/json-handle.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            statistics: {
                all: CONST.STATISTICS.DEFAULTS,
                target: CONST.STATISTICS.DEFAULTS
            }
        }
    }

    async componentDidMount() {
        await this.initStatistics()
    }

    async initStatistics() {
        const { data: { id } } = getProcess()
        const statisticsAllString = window.localStorage['task-todo-statistics-all']
        const statisticsTargetString = window.localStorage[`task-todo-statistics-${id}`]

        if (!statisticsAllString || !statisticsTargetString) return await this.getStatistics();
        const statisticsAllVerify = jsonHandle.verifyJSONString({
            jsonString: statisticsAllString
        })
        const statisticsTargetVerify = jsonHandle.verifyJSONString({
            jsonString: statisticsTargetString
        })

        if (!statisticsAllVerify.isCorrect || !statisticsTargetVerify.isCorrect) return await this.getStatistics();

        const statisticsAll = statisticsAllVerify.data
        const statisticsTarget = statisticsTargetVerify.data

        /**
         * 含义: 现在时间 超过 过期时间, 就表示过期
         */
        const nowTimestamp = new Date().getTime()
        if (!statisticsAll || !statisticsAll.expireTimestamp || (nowTimestamp > +statisticsAll.expireTimestamp)) return await this.getStatistics();
        if (!statisticsTarget || !statisticsTarget.expireTimestamp || (nowTimestamp > +statisticsAll.expireTimestamp)) return await this.getStatistics();

        this.setState({
            statistics: {
                all: statisticsAll,
                target: statisticsTarget,
            }
        })
    }

    /**
     * 含义: 统计一小时后过期
     * 初衷: 防止频繁调用统计接口
     */
    async getStatistics() {
        const expireTimestamp = new Date().getTime() + (1000 * 60 * 60)
        const { data: { id } } = getProcess()
        let statistics = {
            all: CONST.STATISTICS.DEFAULTS,
            target: CONST.STATISTICS.DEFAULTS
        }
        await fetch.get({
            url: 'task/statistics',
            query: {}
        }).then(
            res => {
                var statistics = {
                    expireTimestamp,
                    ...res.data
                }
                window.localStorage.setItem(`task-todo-statistics-all`, JSON.stringify(statistics))
                statistics.all = statistics
            },
            error => { }
        )

        await fetch.get({
            url: 'task/statistics',
            query: {
                targetId: id
            }
        }).then(
            res => {
                var statistics = {
                    expireTimestamp,
                    ...res.data
                }
                window.localStorage.setItem(`task-todo-statistics-${id}`, JSON.stringify(statistics))
                statistics.target = statistics
            },
            error => { }
        )

        this.setState({ statistics })
    }

    handleStatistics = ({
        monthCount,
        twoWeekCount,
        oneWeekCount,
        threeDayCount,
        towDayCount,
        oneDayCount
    }) => {
        let count = 0
        let time = '这个月'
        if (oneDayCount > 7) {
            count = oneDayCount
            time = '昨天'
        } else if (towDayCount > 7) {
            count = towDayCount
            time = '这两天'
        } else if (threeDayCount > 7) {
            count = threeDayCount
            time = '这三天'
        } else if (oneWeekCount > 7) {
            count = oneWeekCount
            time = '这星期'
        } else if (twoWeekCount > 7) {
            count = twoWeekCount
            time = '这两星期'
        } else {
            count = monthCount
            time = '这个月'
        }

        return {
            count,
            time
        }
    }

    render() {
        const { data: { name } } = getProcess()
        const { statistics } = this.state
        const statisticsInstance = {
            all: this.handleStatistics(statistics.all),
            target: this.handleStatistics(statistics.target)
        }

        return [
            <div className="statistics">
                <div className="statistics-title">{statisticsInstance.all.time}共完成<span>{statisticsInstance.all.count}</span>个任务</div>
                <div className="statistics-description">其中{statisticsInstance.target.time}完成<span>{statisticsInstance.target.count}</span>个“{name}”任务</div>
            </div>,

            <div className="spiritual">
                <div className="spiritual-container flex-center">状态觉察怎样?</div>
            </div>,

            <div className="reason">
                <div className="reason-title">为什么要"任务"?</div>
                <div className="reason-new"></div>
                <div className="reason-related">
                </div>
                <div className="reason-other">
                </div>
                <div className="reason-load">加载更多</div>
            </div>,
            <div className="operational">
                <div className="operational-item">
                    <div className="item-container">新增理由?</div>
                </div>
                <div className="operational-item">
                    <div className="item-container">有哪些事情可以做?</div>
                </div>
                <div className="operational-item">
                    <div className="item-container">具体计划是什么?</div>
                </div>
            </div>,
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
