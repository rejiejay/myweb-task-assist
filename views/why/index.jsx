import { getProcess } from './../../components/process-task/index.jsx';
import fetch from './../../components/async-fetch/fetch.js';
import toast from './../../components/toast.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
    }

    render() {
        return [
            <div className="statistics">
                <div className="statistics-title" >所有任务统计</div>
                <div className="statistics-description" >这个月完成<span>0</span>个任务</div>
            </div>,

            <div className="spiritual">
                <div className="spiritual-container flex-center">状态觉察怎样?</div>
            </div>,

            <div className="reason">
                <div className="reason-title" >为什么要"任务"?</div>
                <div className="reason-new" ></div>
                <div className="reason-related" >
                </div>
                <div className="reason-other" >
                </div>
                <div className="reason-load" >加载更多</div>
            </div>,
            <div className="operational">
                <div className="operational-item">
                    <div className="item-container" >新增理由?</div>
                </div>
                <div className="operational-item">
                    <div className="item-container" >有哪些事情可以做?</div>
                </div>
                <div className="operational-item">
                    <div className="item-container" >具体计划是什么?</div>
                </div>
            </div>,
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
