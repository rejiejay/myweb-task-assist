import { loadPageVar } from './../../utils/url-helper';
import toast from './../../components/toast';
import Modal from './../../components/modal';

import service from './../../service';

import Header from './components/header';
import SideOperation from './components/side-operation';
import ProjectPlan from './components/project-plan';
import NoteRecordMind from './components/note-record-mind';
import NoteRecordEdit from './components/note-record-edit';

class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            task: null,
            editTaskId: null,
        }
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async componentDidMount() {
        this.initTaskDetail()
    }

    initTaskDetail = async () => {
        const id = loadPageVar('id');
        const fetchInstance = await service.task.getTaskById(id);
        if (fetchInstance.result !== 1) return
        const task = fetchInstance.data
        this.setState({
            task,
            editTaskId: task.id
        })
    }

    addTaskProgressPlanHandle = (parentId = null) => {
        const { task } = this.state
        const taskId = task.id

        toast.show()
        import('./components/project-plan/add-progress-plan.js').then(async ({ AddTaskProgressPlan }) => {
            toast.destroy()

            const addTaskProgressPlan = new Modal(AddTaskProgressPlan, { taskId, parentId });
            const result = await addTaskProgressPlan.show();

            if (result instanceof Error) return

            this.updateProgressPlan();
        })
    }

    updateProgressPlan = () => this.refs.projectPlan.initProgressPlan()

    setEditTaskId = id => this.setState({ editTaskId: id })

    selectNoteRecordMindHandle = id => this.refs.noteRecordEdit.initRecordHandle(id)

    render() {
        const { task, editTaskId } = this.state

        const { clientWidth, clientHeight } = this
        const sideWidth = 450
        const mainWidth = clientWidth - sideWidth - 1
        const mainHeight = clientHeight - 46
        const mainOffsetHeight = mainHeight - 180

        if (!task) return <div className="flex-center">正在加载...</div>

        return <>
            <div className="main-windows flex-column"
                style={{ width: `${mainWidth}px` }}
            >
                <Header
                    taskId={task.id}
                    isUrgent={task.isUrgent || null}
                    isImportant={task.isImportant || null}
                    addTaskProgressPlanHandle={this.addTaskProgressPlanHandle}
                    updateTaskCategoryTagHandle={this.initTaskDetail}
                />

                <ProjectPlan
                    ref='projectPlan'
                    taskId={task.id}
                    addTaskProgressPlanHandle={this.addTaskProgressPlanHandle}
                    editProgressPlanHandle={this.setEditTaskId}
                    height={Math.floor(mainOffsetHeight / 3)}
                />

                <NoteRecordMind
                    taskId={task.id}
                    selectHandle={this.selectNoteRecordMindHandle}
                    height={Math.floor(mainOffsetHeight * (2 / 3))}
                    width={`${mainWidth}px`}
                />

                <NoteRecordEdit
                    ref='noteRecordEdit'
                    taskId={task.id}
                    height={Math.floor(mainHeight * (2 / 3))}
                    width={mainWidth}
                />
            </div>
            <SideOperation
                width={`${sideWidth}px`}
                overallGoalTaskId={task.id}
                editTaskId={editTaskId}
                setEditTaskId={this.setEditTaskId}
            />
        </>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows flex-start'
    ReactDOM.render(<WindowsDetailComponent />, root)
}
