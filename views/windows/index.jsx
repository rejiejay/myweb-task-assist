import { getProcess, setProcess } from './../../components/process-task/index.jsx';
import login from './../../components/login.js';
import { dropDownSelectPopup } from './../../components/drop-down-select-popup.js';
import serviceStorage from './../../components/service-storage/index.js';
import consequencer from './../../utils/consequencer.js';

import ListComponent from './list.jsx';
import SearchComponent from './search.jsx';
import EditComponent from './edit.jsx';
import CONST from './const.js';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            processTarget: CONST.PROCESS_TARGET.DEFAULTS,
            pageStatus: CONST.PAGE_STATUS.DEFAULTS
        }

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async componentDidMount() {
        await login()
        const processInstance = this.initProcess()
        if (processInstance.result !== 1) return this.showProcessSelected()

        await this.refs.list.init()
    }

    initProcess() {
        const processInstance = getProcess()
        /** 含义: 这里必须选择目标 */
        if (processInstance.result !== 1) return consequencer.error()

        const { id, name } = processInstance.data
        this.setState({ processTarget: { id, name } })

        return consequencer.success()
    }

    async showProcessSelected() {
        const self = this
        const allTargetInstance = await serviceStorage.getItem({
            key: 'allTarget',
            isArray: true
        }).then(
            res => consequencer.success(res),
            msg => consequencer.error(msg)
        )

        const handle = async ({ value, label }) => {
            const processTarget = { id: value, name: label }
            setProcess(processTarget)
            self.setState({ processTarget })
            self.refs.list.init()
        }

        if (allTargetInstance.result === 1) {
            dropDownSelectPopup({
                list: allTargetInstance.data.map(({ id, name }) => ({
                    value: id,
                    label: name
                })),
                handle
            })
        } else {
            window.location.href = './../target/json-config/index.html'
        }
    }

    render() {
        const { processTarget: { id, name }, pageStatus } = this.state
        const { clientHeight } = this
        return [
            <div className="headder flex-start-center">
                <div className="process-task hover-item"
                    onClick={this.showProcessSelected.bind(this)}
                >目标范围: {name}</div>

                <div className="search flex-rest flex-center">
                    搜索功能
                </div>

                <div className="fast-operating flex-start-center">
                    <div className="operat-item hover-item">理由</div>
                    <div className="operat-item hover-item">计划</div>
                    <div className="operat-item hover-item">新建任务</div>
                </div>
            </div>,

            <div className="content-container-area"
                style={{ minHeight: (clientHeight - 46 - 61 - 52) }}
            >
                <ListComponent
                    ref="list"
                    isShow={pageStatus === CONST.PAGE_STATUS.DEFAULTS || pageStatus === CONST.PAGE_STATUS.LIST}
                ></ListComponent>
                <SearchComponent
                    isShow={pageStatus === CONST.PAGE_STATUS.SEARCH}
                ></SearchComponent>
                <EditComponent
                    isShow={pageStatus === CONST.PAGE_STATUS.EDIT}
                ></EditComponent>
            </div>,

            <div class="copyright-component"><div class="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div></div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
