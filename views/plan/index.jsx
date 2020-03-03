import fetch from './../../components/async-fetch/fetch.js';
import { getProcess } from './../../components/process-task/index.jsx';

import timeTransformers from './../../utils/time-transformers.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [
                /** CONST.PROGRAM.DEMO */
            ],
            count: 0,
            pageNo: 1,
        }
    }

    async componentDidMount() {
        await this.initData()
    }

    async initData() {
        const self = this
        const { pageNo, list, count } = this.state
        const { data: { id } } = getProcess()

        /** 注意: 因数量不多, 所以不做持久化统计count需求 */
        await fetch.get({
            url: 'plan/get/program/list',
            query: { pageNo, targetId: id }
        }).then(
            ({ data }) => {
                const newList = data.list
                const newCount = data.count
                if (newList.length === 0) return

                /**
                 * 含义: 判断是否新增
                 */
                let myList = newList
                if (list.length > 0 && pageNo > 1 && count > 1) myList = list.concat(newList);
                self.setState({ list: myList, count: newCount })
            }, error => { }
        )
    }

    showMore() {
        const self = this
        const { pageNo, count } = this.state
        const diff = count - (10 * pageNo)
        if (diff > 0) this.setState({ pageNo: pageNo + 1 }, () => self.initData())
    }

    /** 注意: type有2中eidt show */
    editHandle(type, plan) {
        window.localStorage.setItem(`task-plan-program-${type}-id`, plan.id)
        window.location.href = './edit/index.html'
    }

    render() {
        const self = this
        const { pageNo, list, count } = this.state
        const { data: { name } } = getProcess()
        let diff = count - (10 * pageNo)
        diff = diff > 0 ? diff : 0
        const latest = list.length > 0 ? JSON.parse(JSON.stringify(list[0])) : null;
        const otherList = list.length > 0 ? list.filter((program, index) => index !== 0) : [];

        return [
            <div class="plan-title">“{name}”具体计划是什么?</div>,

            !!latest && <div class="plan-content">
                <div class="content-container"
                    onClick={() => self.editHandle('edit', latest)}
                >
                    <div class="content-title">方案{count}</div>
                    <div class="content-description"
                        dangerouslySetInnerHTML={{ __html: latest.program ? latest.latest.program.replace(/\n/g, "<br>") : '' }}
                    ></div>
                </div>
            </div>,

            <div class="plan-list">
                <div class="list-container">{otherList.map((item, key) =>
                    <div class="content-container" key={key}>
                        <div class="plan-other flex-start-center"
                            onClick={() => self.editHandle('show', item)}
                        >方案{count - (key + 1)}（{timeTransformers.dateToYYYYmmDDhhMM(new Date(+item.sqlTimestamp))}）</div>
                    </div>
                )}</div>
            </div>,

            <div class="plan-more">
                <div class="more-container flex-center"
                    onClick={this.showMore.bind(this)}
                >更多方案{diff}</div>
            </div>,

            <div class="plan-operating">
                <div class="add-plan">
                    <div class="flex-center"
                        onClick={() => window.location.href = './edit/index.html'}
                    >新增方案</div>
                </div>
                <div class="plan-according">
                    <div class="flex-center"
                        onClick={() => window.location.href = './according-list/index.html'}
                    >方案有什么依据?</div>
                </div>
                <div class="add-plan">
                    <div class="flex-center"
                        onClick={() => window.location.href = './according-edit/index.html'}
                    >新增依据</div>
                </div>
                <div class="todo">
                    <div class="flex-center"
                        onClick={() => window.location.href = './../todo/list/index.html'}
                    >有啥任务可以做的?</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
