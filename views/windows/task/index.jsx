import { getProcess, setProcess } from './../../../components/process-task/index.jsx';
import { dropDownSelectPopup } from './../../../components/drop-down-select-popup.js';
import serviceStorage from './../../../components/service-storage/index.js';
import consequencer from './../../../utils/consequencer.js';

import ListComponent from './list.jsx';
import EditComponent from './edit.jsx';
import CONST from './const.js';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            processTarget: CONST.PROCESS_TARGET.DEFAULTS,
            pageStatus: CONST.PAGE_STATUS.DEFAULTS,
            searchInput: null
        }
    }

    async componentDidMount() {
    }

    selectedTaskHandle(id) {
        this.setState({ pageStatus: CONST.PAGE_STATUS.EDIT })
        this.refs.edit.init(id)
    }

    editTaskCloseHandle({ isUpdate }) {
        this.setState({ pageStatus: CONST.PAGE_STATUS.LIST })
        !!isUpdate ? this.refs.list.init() : null
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
        return [
            <div className="headder flex-start-center noselect">
                <div className="process-task hover-item"
                    onClick={this.showProcessSelected.bind(this)}
                >目标范围: {name}</div>

                <div className="center flex-rest"></div>

                <div className="fast-operating flex-start-center">
                    <div className="operat-item hover-item"
                        onClick={() => window.location.href = "./../todo/template/index.html"}
                    >新建任务</div>
                </div>
            </div >,

            <div className="content-container-area">
            <ListComponent
                ref="list"
                isShow={pageStatus === CONST.PAGE_STATUS.DEFAULTS || pageStatus === CONST.PAGE_STATUS.LIST}
                selectedTaskHandle={this.selectedTaskHandle.bind(this)}
            ></ListComponent>
            <EditComponent
                ref="edit"
                isShow={pageStatus === CONST.PAGE_STATUS.EDIT}
                editTaskCloseHandle={this.editTaskCloseHandle.bind(this)}
            ></EditComponent>
            </div>,

            <div class="copyright-component"><div class="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div></div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
