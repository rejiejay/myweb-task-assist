import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [
                /** CONST.ACCIORDING.DEMO */
            ],
            count: 0,
        }
    }

    async componentDidMount() {
        await this.initData()
    }

    async initData() {
        const self = this
        const { list } = this.state

        const { data: { id } } = getProcess()

        const duplicate = list => {
            const filters = new Set()
            return list.filter(according => {
                const isRepeat = !Array.from(filters).includes(according.id)
                filters.add(according.id)
                return isRepeat
            })
        }

        await fetch.get({
            url: 'plan/get/according/random',
            query: { targetId: id }
        }).then(
            ({ data: { random, count } }) => {
                if (random.length === 0) return toast.show('已加载完成所有数据!')

                /**
                 * 含义: 每次组合时, 都需要去重一次;
                 */
                self.setState({
                    list: duplicate(list.concat(random)),
                    count
                })
            },
            error => { }
        )
    }

    editHandle(item) {
        window.localStorage.setItem('task-plan-according-id', item.id)
        window.location.href = './../according-edit/index.html'
    }

    render() {
        const self = this
        const { list, count } = this.state
        let diff = count - list.length
        diff = diff > 0 ? diff : 0

        return [
            <div class="according">
                <div class="according-container">{list.map((item, key) =>
                    <div class="according-item"
                        onClick={() => self.editHandle(item)}
                        dangerouslySetInnerHTML={{ __html: item.according.replace(/\n/g, "<br>") }}
                    ></div>
                )}
                </div>
                <div class="operating-container">
                    <div class="according-operating"
                        onClick={this.initData.bind(this)}
                    >显示更多 ({diff})</div>
                </div>
            </div>,

            <div class="operating">
                <div class="operating-button">
                    <div class="button-container"
                        onClick={() => window.location.href = './../according-edit/index.html'}
                    >新增依据</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
