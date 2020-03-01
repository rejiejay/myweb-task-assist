import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowPutoff: false,
            isShowComplete: false
        }
    }

    async componentDidMount() { }

    render() {
        const {
            isShowPutoff,
            isShowComplete
        } = this.state

        return [
            <ProcessTask></ProcessTask>,

            <div class="list executable-task">已经完成所有任务</div>,

            <div class="list putoff-task">
            </div>,

            <div class="list complete-task">
            </div>,

            <div class="operation">
                <div class="operation-button">新增任务?</div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
