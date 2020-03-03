import fetch from './../../components/async-fetch/fetch.js';
import toast from './../../components/toast.js';
import { getProcess, ProcessTask } from './../../components/process-task/index.jsx';

import jsonHandle from './../../utils/json-handle.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [
                /** CONST.ACCIORDING.DEMO */
            ],
            pageNo: 1,
            count: 0,
            sort: CONST.SORT.TIME.value
        }

        this.completeExpiredTimestamp = new Date().getTime()
    }

    async componentDidMount() {
        await this.initStatistics(true)
        await this.initDataByTime()
    }

    /**
     * 初衷: 避免消耗太多SQL性能
     * 定义: 1分钟刷新一次
     */
    async initStatistics(isForceRefresh) {
        const self = this
        const nowTimestamp = new Date().getTime()
        let { completeExpiredTimestamp } = this

        let query = {}
        const processTask = getProcess()
        processTask.result === 1 ? query.targetId = processTask.data.id : {}

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

    async initDataByTime(isForceRefresh) {
        const self = this
        const { pageNo, list, count } = this.state
        let query = { pageNo }
        const processTask = getProcess()
        processTask.result === 1 ? query.targetId = processTask.data.id : {}

        await fetch.get({ url: 'task/conclusion/list', query }).then(
            ({ data }) => {
                if (data.length === 0) return toast.show('已加载完成所有数据!')

                let newList = data
                if (list.length > 0 && pageNo > 1 && count > 1) {
                    /** 含义: 判断是否新增 */
                    newList = list.concat(data)
                }

                self.setState({ pageNo: pageNo + 1, list: newList })
            },
            error => { }
        )

        await this.initStatistics(isForceRefresh)
    }

    async initDataByRandom(isForceRefresh) {
        const self = this
        const { list, count } = this.state

        if (list.length > 0 && count > 0 && list.length === count) return toast.show('已加载完成所有数据!')

        let query = {}
        const processTask = getProcess()
        processTask.result === 1 ? query.targetId = processTask.data.id : {}

        const duplicate = list => {
            const filters = new Set()
            return list.filter(according => {
                const isRepeat = !Array.from(filters).includes(according.id)
                filters.add(according.id)
                return isRepeat
            })
        }

        await fetch.get({ url: 'task/conclusion/random', query }).then(
            ({ data }) => self.setState({ list: duplicate(list.concat(data)) }),
            error => { }
        )

        await this.initStatistics(isForceRefresh)
    }

    switchSortHandle() {
        const self = this
        const { sort } = this.state
        if (sort === CONST.SORT.TIME.value) {
            this.setState(
                { sort: CONST.SORT.RANDOM.value, list: [] },
                () => self.initDataByRandom(true)
            )
        } else {
            this.setState(
                { sort: CONST.SORT.TIME.value, pageNo: 1, list: [] },
                () => self.initDataByTime(true)
            )
        }
    }

    editHandle(task) {
        localStorage.setItem('task-conclusion-edit-id', task.id)
        window.location.href = './edit/index.html'
    }

    showBigImageHandle = imageUrl => previewImage.start({ urls: [imageUrl], current: imageUrl })

    showMoreHandle() {
        const self = this
        const { sort, pageNo } = this.state
        if (sort === CONST.SORT.TIME.value) {
            this.initDataByTime()
        } else {
            this.initDataByRandom()
        }
    }

    render() {
        const self = this
        const { list, count, sort } = this.state
        let diff = count - list.length
        diff = diff > 0 ? diff : 0

        return [
            <ProcessTask></ProcessTask>,

            <div className="sort">
                <div className="sort-container flex-center"
                    onClick={this.switchSortHandle.bind(this)}
                >{sort === CONST.SORT.TIME.value ? '时间排序' : '随机排序'}</div>
            </div>,

            <div className="conclusion">
                <div className="conclusion-list">{list.map((task, key) =>
                    <div className="conclusion-item" key={key}>
                        <div className="item-container">
                            <div className="item-title"
                                onClick={() => self.editHandle(task)}
                            >{task.title}</div>
                            {task.image && <div className="item-image"
                                onClick={() => self.showBigImageHandle(`${CONST.BASE_IMAGE_URL}${task.image}`)}
                            >
                                <img src={`${CONST.BASE_IMAGE_URL}${task.image}`} alt="image" />
                            </div>}
                            <div className="item-description"
                                onClick={() => self.editHandle(task)}
                                dangerouslySetInnerHTML={{ __html: task.conclusion.replace(/\n/g, "<br>") }}
                            ></div>
                        </div>
                    </div>
                )}</div>
                <div className="conclusion-load flex-center"
                    onClick={this.showMoreHandle.bind(this)}
                >加载更多 ({diff})</div>
            </div>,

            <div className="operating">
                <div className="operating-button">
                    <div className="button-container flex-center"
                        onClick={() => window.location.href = './edit/index.html'}
                    >新增结论</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.getElementById('react-render'));
