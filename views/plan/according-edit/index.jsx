import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';
import { confirmPopUp } from './../../../components/confirm-popup.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            plan: CONST.ACCIORDING.DEFAULTS
        }

        this.id = null
        this.status = CONST.PAGE_STATUS.DEFAULTS
    }

    async componentDidMount() {
        this.initPageStatus()
        await this.initData()
    }

    async initData() {
        const self = this
        const { status, id } = this
        if (status !== CONST.PAGE_STATUS.EDIT) return;

        await fetch.get({
            url: 'plan/get/one',
            query: { id }
        }).then(
            ({ data }) => self.setState({ plan: data }),
            error => { }
        )
    }

    initPageStatus() {
        this.id = window.localStorage['task-plan-according-id']
        this.status = this.id ? CONST.PAGE_STATUS.EDIT : CONST.PAGE_STATUS.ADD
        window.localStorage['task-plan-according-id'] = ''
    }

    inputHandle({ target: { value } }) {
        let { plan } = this.state
        plan.according = value
        this.setState({ plan })
    }

    editHandle() {
        const { id } = this
        const { plan: { according } } = this.state
        if (!according) return toast.show('内容不能为空');
        fetch.post({
            url: 'plan/according/edit',
            body: { id, according }
        }).then(
            res => window.location.replace('./../according-list/index.html'),
            error => { }
        )
    }

    addHandle() {
        const { data: { id } } = getProcess()
        const { plan: { according } } = this.state
        if (!according) return toast.show('内容不能为空');
        fetch.post({
            url: 'plan/add',
            body: { targetId: id, according }
        }).then(
            res => window.location.replace('./../according-list/index.html'),
            error => { }
        )
    }

    delHandle() {
        const { id } = this

        const handle = () => fetch.post({
            url: 'plan/del',
            body: { id }
        }).then(
            res => window.location.replace('./../according-list/index.html'),
            error => { }
        )

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
    }

    render() {
        const self = this
        const { status } = this
        const { plan: { according } } = this.state

        return (<div class="according-eidt flex-column-center">
            <textarea class="according-textarea fiex-rest" type="text"
                value={according}
                onChange={this.inputHandle.bind(this)}
                placeholder="请输入依据"
            ></textarea>

            <div class="according-operating flex-start">
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-yes flex-rest flex-center"
                    onClick={this.editHandle.bind(this)}
                >编辑</div>}
                {status === CONST.PAGE_STATUS.ADD && <div class="operating-yes flex-rest flex-center"
                    onClick={this.addHandle.bind(this)}
                >新增</div>}
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-del flex-rest flex-center"
                    onClick={this.delHandle.bind(this)}
                >删除</div>}
            </div>
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
