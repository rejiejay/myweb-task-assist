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
            pageSize: 10,
            count: 1
        }

        this.completeExpiredTimestamp = new Date().getTime()
    }

    async init() {
        await this.initStatistics(true)
        await this.initDataByTime()
    }

    async initDataByTime(isForceRefresh) {
        const self = this
        const { pageNo, list, count } = this.state
        const { data: { id } } = getProcess()
        let query = { pageNo, targetId: id }

        await fetch.get({ url: 'task/conclusion/list', query }).then(
            ({ data }) => {
                if (data.length === 0) return toast.show('已加载完成所有数据!')

                let newList = data
                if (list.length > 0 && pageNo > 1 && count > 1) {
                    /** 含义: 判断是否新增 */
                    newList = list.concat(data)
                }

                self.setState({ list: newList })
            },
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
                // return this.setState({ count })
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
                // self.setState({ count: +data })
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

    render() {
        const { list, pageNo, pageSize, count } = this.state
        const { isShow } = this.props

        return <div className="list flex-column-center" style={!!!isShow ? { display: 'none' } : {}}>
            <div className="container flex-rest">
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
