import { operation_width } from './../../const/fixed-size';
import service from './../../../../../service';
import toast from './../../../../../components/toast';
import Confirm from './../../../../../components/confirm';

import Task from './task';
import Progress from './progress';
import Notes from './notes';

export default class Operation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',
            category: '',
            progress: [],
            notes: [],
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
        this.initTaskByData(data)
    }


    initTaskByData = (data) => {
        const {
            category, id,
            title, content, specific, measurable, attainable, relevant, timeBound
        } = data

        this.setState({
            category, id,
            title, content, specific, measurable, attainable, relevant, timeBound
        }, () => {
            this.getMainProgressPlanByTask()
            this.getNotesRandomByTask()
        })
    }

    getMainProgressPlanByTask = async () => {
        const { id } = this.state
        const fetchInstance = await service.progress.getMainProgressPlanByTask(id);
        if (fetchInstance.result !== 1) return
        const progress = fetchInstance.data
        this.setState({ progress })
    }

    getNotesRandomByTask = async () => {
        const { id } = this.state
        const fetchInstance = await service.notes.getNotesRandomByTask(id);
        if (fetchInstance.result !== 1) return
        const notes = fetchInstance.data
        this.setState({ notes })
    }

    initTaskById = async id => {
        if (id === this.state.id) return

        const fetchInstance = await service.task.getTaskById(id)
        if (fetchInstance.result !== 1) {
            return toast.show(fetchInstance.message);
        }
        const data = fetchInstance.data
        this.initTaskByData(data)
    }

    completeTaskHandle = async () => {
        const confirmInstance = await Confirm('是否完成此任务?');
        if (confirmInstance.result !== 1) return

        const { id } = this.state
        const fetchInstance = await service.task.completeTask(id)
        if (fetchInstance.result !== 1) return

        this.getTaskByRandom();
    }

    editHandle = id => window.open(`./windows-detail/?id=${id}`)

    showTaskNotesDetailHandle = noteId => {
        const { id } = this.state
        window.open(`./windows-detail/?id=${id}&&noteId=${noteId}`)
    }

    render() {
        const { clientHeight } = this
        const {
            category, id,
            title, content, specific, measurable, attainable, relevant, timeBound,
            progress, notes
        } = this.state
        const minHeight = `${clientHeight - 40}px`
        const width = `${operation_width}px`

        return <div className="main-operation" style={{ minHeight, width }}>
            <div className="main-operation-header noselect flex-start">
                <div className="operation-header-item header-item-button flex-center flex-rest"
                    onClick={this.getTaskByRandom}
                >随机</div>
                <div className="operation-header-item header-item-button flex-center flex-rest"
                    onClick={() => this.editHandle(id)}
                >编辑</div>
                <div className="operation-header-item header-item-button flex-center flex-rest"
                    onClick={this.completeTaskHandle}
                >完成</div>
                <div className="operation-header-item header-item-button flex-center flex-rest">{category || '标签(未分类)'}</div>
            </div>

            <Task
                title={title}
                content={content}
                specific={specific}
                measurable={measurable}
                attainable={attainable}
                relevant={relevant}
                timeBound={timeBound}
            />

            <Progress data={progress} />

            <Notes
                data={notes}
                showTaskNotesDetailHandle={this.showTaskNotesDetailHandle}
            />
        </div>
    }
}
