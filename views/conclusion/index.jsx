import fetch from './../../components/async-fetch/fetch.js';
import { getProcess, ProcessTask } from './../../components/process-task/index.jsx';

import timeTransformers from './../../utils/time-transformers.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    async componentDidMount() {
    }

    render() {
        const self = this
        const { } = this.state

        return [
            <ProcessTask></ProcessTask>,

            <div className="sort">
                <div className="sort-container flex-center">时间排序</div>
            </div>,

            <div className="conclusion">
                <div className="conclusion-list">
                    <div className="conclusion-item">
                        <div className="item-container">
                            <div className="item-title">这是标题</div>
                            <div className="item-description">这是内容</div>
                        </div>
                    </div>
                </div>
                <div className="conclusion-load flex-center">加载更多</div>
            </div>,

            <div className="operating">
                <div className="operating-button">
                    <div className="button-container flex-center">新增结论</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
