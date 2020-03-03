import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';
import { confirmPopUp } from './../../../components/confirm-popup.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            why: CONST.WHY.DEFAULTS
        }

        this.id = null
        this.status = CONST.PAGE_STATUS.DEFAULTS
    }

    async componentDidMount() {
        this.initPageStatus()
        await this.initData()
    }

    initPageStatus() {
        this.id = window.localStorage['task-why-edit-id']

        if (this.id) {
            this.status = CONST.PAGE_STATUS.EDIT
            window.localStorage['task-why-edit-id'] = ''
        } else {
            this.status = CONST.PAGE_STATUS.ADD
        }
    }

    async initData() {
        const self = this
        const { id } = this
        if (this.status !== CONST.PAGE_STATUS.EDIT) return

        await fetch.get({
            url: 'why/get/one',
            query: { id }
        }).then(
            ({ data }) => self.setState({ why: data }),
            error => { }
        )
    }

    inputHandle({ target: { value } }) {
        const { why } = this.state
        why.content = value
        this.setState({ why })
    }

    setToFullest(setToFullest) {
        const { id } = this
        if (!id) return toast.show('无法置顶新增任务!');
        fetch.post({
            url: 'why/edit/reasonable',
            body: { id, setToFullest }
        }).then(
            res => setTimeout(() => toast.show(setToFullest ? '成功顶置任务!' : '成功取消置顶!'), 200),
            error => { }
        )
    }

    modifyHandle() {
        const { why: { content } } = this.state
        const { id } = this
        if (!content) return toast.show('内容不能为空');
        fetch.post({
            url: 'why/edit',
            body: { id, content }
        }).then(
            res => window.location.href = './../index.html',
            error => { }
        )
    }

    addHandle() {
        const { why: { content } } = this.state
        const { data: { id } } = getProcess()
        if (!content) return toast.show('内容不能为空');
        fetch.post({
            url: 'why/add',
            body: { targetId: id, content }
        }).then(
            res => window.location.href = './../index.html',
            error => { }
        )
    }

    delHandle() {
        const { id } = this

        const handle = () => fetch.post({
            url: 'why/delete',
            body: { id }
        }).then(
            res => window.location.href = './../index.html',
            error => { }
        )

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
    }

    render() {
        const { why: { content } } = this.state
        const { status } = this

        return (<div class="reason-eidt flex-column-center">
            <textarea class="reason-textarea fiex-rest" type="text"
                placeholder="请输入理由"
                value={content}
                onChange={this.inputHandle.bind(this)}
            ></textarea>

            <div class="reason-operating flex-start">
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-sticky-reason flex-rest flex-center"
                    onClick={() => this.setToFullest(true)}
                >顶置理由</div>}
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-unpin-reason flex-rest flex-center"
                    onClick={() => this.setToFullest(false)}
                >取消置顶</div>}
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-confirm flex-rest flex-center"
                    onClick={this.modifyHandle.bind(this)}
                >修改</div>}
                {status === CONST.PAGE_STATUS.ADD && <div class="operating-confirm flex-rest flex-center"
                    onClick={this.addHandle.bind(this)}
                >新增</div>}
                {status === CONST.PAGE_STATUS.EDIT && <div class="operating-del flex-rest flex-center"
                    onClick={this.delHandle.bind(this)}
                >删除</div>}
                {status === CONST.PAGE_STATUS.ADD && <div class="operating-del flex-rest flex-center"
                    onClick={() => window.location.href = './../index.html'}
                >取消</div>}
            </div>
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
