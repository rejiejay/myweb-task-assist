import { operation_width } from './../../const/fixed-size';
import service from './../../../../../service';
import toast from './../../../../../components/toast';
import TimeHelper from './../../../../../../utils/time-helper';

export default class Operation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '2021-01-21',
            category: '英语'
        }
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
    }

    componentDidMount() {
        this.getTaskByRandom()
    }

    getTaskByRandom = async () => {
        const fetchInstance = await service.task.getTaskByRandom()
        if (fetchInstance.result !== 1) {
            return toast.show(fetchInstance.message);
        }
        const data = fetchInstance.data
        const { timestamp, category } = data
        const date = TimeHelper.transformers.dateToFormat(new Date(timestamp))

        this.setState({ date, category })
    }

    render() {
        const { clientHeight } = this
        const { date, category } = this.state
        const minHeight = `${clientHeight - 40}px`
        const width = `${operation_width}px`

        return <div className="main-operation" style={{ minHeight, width }}>
            <div className="main-operation-header noselect flex-start">
                <div className="operation-header-item header-item-button flex-center flex-rest"
                    onClick={this.getTaskByRandom}
                >随机</div>
                <div className="operation-header-item header-item-button flex-center flex-rest">完成</div>
                <div className="operation-header-item flex-center flex-rest">{category}</div>
                <div className="operation-header-item flex-center flex-rest">{date}</div>
            </div>

            <div className="main-operation-block">任务内容</div>
            <div className="main-operation-block">任务进度</div>
            <div className="main-operation-block">任务笔记列表</div>
        </div>
    }
}
