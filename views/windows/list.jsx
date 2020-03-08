import fetch from './../../components/async-fetch/fetch.js';
import PaginationComponent from './../../components/pagination.jsx';
import { getProcess } from './../../components/process-task/index.jsx';
import toast from './../../components/toast.js';
import jsonHandle from './../../utils/json-handle.js';

import CONST from './const.js';

class ListComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [
                /** CONST.TASK.DEMO */
            ],
            pageNo: 1,
            pageSize: 15,
            count: 1,

            selectedTaskId: null
        }

        this.completeExpiredTimestamp = new Date().getTime()
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth

    }

    async init() {
        await this.initStatistics(true)
        await this.initDataByTime()
    }

    async initDataByTime(isForceRefresh) {
        const self = this
        const { pageNo, pageSize, list, count } = this.state
        const { data: { id } } = getProcess()
        let query = { pageNo, pageSize, targetId: id }

        await fetch.get({ url: 'task/conclusion/list', query }).then(
            ({ data }) => self.setState({ list: data }),
            error => { }
        )

        await this.initStatistics(isForceRefresh)
    }

    /**
     * 初衷: 避免消耗太多SQL性能
     * 定义: 1分钟刷新一次
     */
    async initStatistics(isForceRefresh) {
        const self = this
        const nowTimestamp = new Date().getTime()
        let { completeExpiredTimestamp } = this

        const { data: { id } } = getProcess()
        let query = { targetId: id }

        const statisticString = window.localStorage['task-conclusion-list-statistics']
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
                console.log('解析缓存“结论”失败了, 表示统计数据已经过期 ')
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
                console.log(`解析缓存“结论”成功, 共有${count}条已经完成任务, 还有${Math.ceil((completeExpiredTimestamp - nowTimestamp) / 1000)}秒过期!`)
                return this.setState({ count })
            }
        }

        await fetch.get({
            url: 'task/conclusion/statistics',
            query
        }).then(
            ({ data }) => {
                const expiredTimestamp = (nowTimestamp + (1000 * 60 * 1));
                self.completeExpiredTimestamp = +expiredTimestamp
                window.localStorage.setItem('task-conclusion-list-statistics', JSON.stringify({
                    expiredTimestamp: (nowTimestamp + (1000 * 60 * 1)),
                    count: +data
                }))
                self.setState({ count: +data })
            },
            error => { }
        )
    }

    pageNoChangeHandle(newPageNo) {
        this.setState(
            { pageNo: newPageNo },
            this.initDataByTime
        )
    }

    selectedTaskHandle(id) {
        const { selectedTaskId } = this.state
        if (id !== selectedTaskId) return this.setState({ selectedTaskId: id });

    }

    render() {
        const self = this
        const { list, pageNo, pageSize, count, selectedTaskId } = this.state
        const { isShow } = this.props
        const { clientHeight } = this
        let style = { minHeight: (clientHeight - 46 - 26 - 52) }
        !!!isShow ? style.display = 'none' : '';

        return <div className="list flex-column-center"
            style={style}
        >
            <div className="task-container flex-rest flex-column-center">
                <div className="task-float noselect">{list.map(({
                    id,
                    targetId,
                    title,
                    content,
                    conclusion,
                    measure,
                    span,
                    aspects,
                    worth,
                    estimate,
                    image,
                    putoffTimestamp,
                    completeTimestamp,
                    sqlTimestamp
                }, key) => <div className={`task-item ${selectedTaskId === id ? 'task-item-selected' : ''}`} key={key}>
                        <div className="task-item-container"
                            onClick={() => self.selectedTaskHandle(id)}
                        >
                            {selectedTaskId === id ? conclusion : title}
                        </div>
                    </div>
                )}</div>
            </div>
            <div className="pagination flex-center">
                <PaginationComponent
                    pageNo={pageNo}
                    pageTotal={Math.ceil(count / pageSize)}
                    handle={this.pageNoChangeHandle.bind(this)}
                ></PaginationComponent>
            </div>
        </div>
    }
}

export default ListComponent
