import { getProcess } from './../../components/process-task/index.jsx';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            processName: ''
        }
    }

    componentDidMount() {
        const processInstance = getProcess()
        if (processInstance.result !== 1) return /** 含义: 加载失败缓存 */
        const { name } = processInstance.data

        this.setState({ processName: name })
    }


    render() {
        const { processName } = this.state

        return (<div class="todo-assist-list flex-column-center">
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../conclusion/edit/index.html'}
                >新增{processName}结论?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../why/edit/index.html'}
                >新增{processName}理由?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../plan/edit/index.html'}
                >新增{processName}计划?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../plan/according-edit/index.html'}
                >新增{processName}计划依据?</div>
            </div>
            <div class="button-container">
                <div class="button noselect"
                    onClick={() => window.location.href = './../target/json-config/index.html'}
                >新增{processName}目标?</div>
            </div>
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
