import TaskDetail from './../../../../components/page/task-detail';
import toast from './../../../../components/toast';
import Confirm from './../../../../components/confirm';

import service from './../../../../service';

export default class TaskEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',
            isCompleted: false,
        }

        this.data = {}
        this.editId
    }

    componentDidMount() {
        const { overallGoalTaskId } = this.props

        this.editId = overallGoalTaskId
        this.initTaskById(overallGoalTaskId)
    }

    componentDidUpdate() {
        const { editTaskId } = this.props
        if (editTaskId !== this.editId) {
            this.updateTaskCheck()
        }
    }

    initTaskById = async id => {
        const fetchInstance = await service.task.getTaskById(id)
        if (fetchInstance.result !== 1) return toast.show(fetchInstance.message);
        this.data = fetchInstance.data
        const { title, content, specific, measurable, attainable, relevant, timeBound, isCompleted } = this.data
        this.setState({ title, content, specific, measurable, attainable, relevant, timeBound, isCompleted })
    }

    async updateTaskCheck() {
        const { editTaskId, setEditTaskId } = this.props

        const isDiff = this.verifyEditDiff();
        if (isDiff) {
            const confirmInstance = await Confirm('你有数据未保存, 是否加载新数据?');
            if (confirmInstance.result !== 1) return setEditTaskId(this.editId)
        }

        this.editId = editTaskId
        this.initTaskById(editTaskId)
    }

    onChangeHandle = (value, field) => {
        let newState = {};
        newState[field] = value;
        this.setState(newState);
    }

    verifyEditDiff = () => {
        const {
            title,
            content,
            specific,
            measurable,
            attainable,
            relevant,
            timeBound,
        } = this.state
        const data = this.data

        let isDiff = false
        if (title !== data.title) isDiff = true
        if (content !== data.content) isDiff = true
        if (specific !== data.specific) isDiff = true
        if (measurable !== data.measurable) isDiff = true
        if (attainable !== data.attainable) isDiff = true
        if (relevant !== data.relevant) isDiff = true
        if (timeBound !== data.timeBound) isDiff = true

        return isDiff
    }

    editHandle = async () => {
        const { title, content, specific, measurable, attainable, relevant, timeBound } = this.state
        const {
            editTaskId,
            overallGoalTaskId,
        } = this.props
        const fetchEditHandle = (editTaskId !== overallGoalTaskId ? service.progress.editProgressPlanById : service.task.editTaskById);
        const fetchInstance = await fetchEditHandle(editTaskId, { title, content, specific, measurable, attainable, relevant, timeBound })
        if (fetchInstance.result !== 1) return

        this.initTaskById(editTaskId)
    }

    completedHandle = async () => {
        const isPlan = editTaskId !== overallGoalTaskId
        const confirmInstance = await Confirm(`确定要完成此${isPlan ? '计划' : '任务'}?`);
        if (confirmInstance.result !== 1) return

        const {
            editTaskId,
            overallGoalTaskId,
            setEditTaskId,
        } = this.props
        const fetchEditHandle = (isPlan ? service.progress.completedProgressPlanById : service.task.completedTaskById);
        const fetchInstance = await fetchEditHandle(editTaskId)
        if (fetchInstance.result !== 1) return

        setEditTaskId(overallGoalTaskId)
    }

    render() {
        const {
            title,
            content,
            specific,
            measurable,
            attainable,
            relevant,
            timeBound,
            isCompleted
        } = this.state
        const {
            editTaskId,
            overallGoalTaskId,
            setEditTaskId
        } = this.props

        return <>
            <div className="side-operation-header noselect flex-start">
                {isCompleted && <div className="operation-header-item flex-center flex-rest">已完成</div>}
                {!isCompleted && <div className="operation-header-item header-item-button flex-center flex-rest"
                    onClick={this.completedHandle}
                >完成</div>}
                {this.verifyEditDiff() &&
                    <div className="operation-header-item header-item-button flex-center flex-rest"
                        onClick={this.editHandle}
                    >暂存</div>
                }
                {editTaskId !== overallGoalTaskId &&
                    <div className="operation-header-item header-item-button flex-center flex-rest"
                        onClick={() => setEditTaskId(overallGoalTaskId)}
                    >取消</div>
                }
            </div>

            <TaskDetail
                title={title}
                content={content}
                specific={specific}
                measurable={measurable}
                attainable={attainable}
                relevant={relevant}
                timeBound={timeBound}
                onChangeHandle={this.onChangeHandle}
            />
        </>
    }
}
