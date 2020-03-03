import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';
import { confirmPopUp } from './../../../components/confirm-popup.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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

    render() {
        const self = this
        const { status } = this
        const { } = this.state

        return [
            <div class="conclusion-input">
                <div class="title-input flex-center">
                    <input type="text" placeholder="请输入题目" />
                </div>
                <div class="content-input">
                    <textarea id="content-input" class="content-textarea fiex-rest" type="text" placeholder="请输入结论"></textarea>
                </div>

                <input type="file" name="file" />
                <div class="image-upload">
                    <div class="image-button flex-center">上传图片</div>
                    <div></div>
                </div>
            </div>,

            <div class="operating">
                <div class="operating-container flex-start">
                    <div class="operating-yes flex-rest flex-center">确认</div>
                    <div class="operating-task flex-rest flex-center">任务</div>
                    <div class="operating-no flex-rest flex-center">删除</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
