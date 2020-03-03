import fetch from './../../../components/async-fetch/fetch.js'
import serviceStorage from './../../../components/service-storage/index.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';


import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            plan: CONST.PLAN.DEFAULTS
        }

        this.id = null
        this.status = CONST.PAGE_STATUS.DEFAULTS
    }

    async componentDidMount() {
        this.initPageStatus()
        if (this.status === CONST.PAGE_STATUS.ADD) await this.initDateByStorage();
        if (this.status === CONST.PAGE_STATUS.EDIT || this.status === CONST.PAGE_STATUS.SHOW) await this.initDateByServer();
    }

    initPageStatus() {
        const editId = window.localStorage['task-plan-program-edit-id']
        const showId = window.localStorage['task-plan-program-show-id']

        if (editId) {
            this.id = editId
            this.status = CONST.PAGE_STATUS.EDIT
        }

        if (showId) {
            this.id = showId
            this.status = CONST.PAGE_STATUS.SHOW
        }

        if (!editId && !showId) {
            this.status = CONST.PAGE_STATUS.ADD
        }

        window.localStorage['task-plan-program-edit-id'] = ''
        window.localStorage['task-plan-program-show-id'] = ''
    }

    async initDateByStorage() {
        const self = this

        await serviceStorage.getItem({
            key: 'draftPlanDesign'
        }).then(
            ({ program }) => self.setState({ plan: { program } }),
            error => { }
        )
    }

    async initDateByServer() {
        const self = this
        const { id } = this

        await fetch.get({
            url: 'plan/get/one',
            query: { id }
        }).then(
            ({ data }) => self.setState({ plan: data }),
            error => { }
        )
    }

    inputHandle({ target: { value } }) {
        let { plan } = this.state
        plan.program = value
        this.setState({ plan })
    }

    editHandle() {
        const { id } = this
        const { plan: { program } } = this.state
        if (!program) return toast.show('内容不能为空');
        fetch.post({
            url: 'plan/program/edit',
            body: { id, program }
        }).then(
            res => window.location.href = './../index.html',
            error => { }
        )
    }

    addHandle() {
        const { id } = this
        const { plan: { program } } = this.state
        if (!program) return toast.show('内容不能为空');
        fetch.post({
            url: 'plan/add',
            body: { id, program }
        }).then(
            res => window.location.href = './../index.html',
            error => { }
        )
    }

    draftHandle() {
        const { plan: { program } } = this.state
        if (!program) return toast.show('内容不能为空');
        serviceStorage.setItem({
            key: 'draftPlanDesign',
            value: { program }
        }).then(
            res => toast.show('保存草稿成功!'),
            error => { }
        )
    }

    render() {
        const self = this
        const { plan: { program } } = this.state
        const { status } = this

        return (<div class="plan-eidt flex-column-center">
            <textarea class="plan-textarea fiex-rest" type="text"
                value={program}
                onChange={this.inputHandle.bind(this)}
                placeholder="请输入计划"
            ></textarea>

            {status !== CONST.PAGE_STATUS.SHOW && <div class="plan-operating flex-start">
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-deploy flex-rest flex-center"
                    onClick={self.editHandle.bind(self)}
                >编辑计划</div>}
                {status === CONST.PAGE_STATUS.ADD && <div class="operating-deploy flex-rest flex-center"
                    onClick={self.addHandle.bind(self)}
                >发布计划</div>}
                {status === CONST.PAGE_STATUS.ADD && <div class="operating-yes flex-rest flex-center"
                    onClick={self.draftHandle.bind(self)}
                >保存草稿</div>}
            </div>}
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
