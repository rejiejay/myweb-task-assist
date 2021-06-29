import Header from './components/header';
import SideOperation from './components/side-operation';
import ProjectPlan from './components/project-plan';
import NoteRecordMind from './components/note-record-mind';
import NoteRecordEdit from './components/note-record-edit';

import service from './../../service';
import { loadPageVar } from './../../utils/url-helper';

class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            task: null,
        }
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async componentDidMount() {
        this.initTaskDetail()
    }

    async initTaskDetail() {
        const id = loadPageVar('id');
        const fetchInstance = await service.task.getTaskById(id);
        if (fetchInstance.result !== 1) return
        const task = fetchInstance.data
        this.setState({ task })
    }

    render() {
        const { task } = this.state

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
                />

                <ProjectPlan
                    height={Math.floor(mainOffsetHeight / 3)}
                />

                <NoteRecordMind
                    height={Math.floor(mainOffsetHeight * (2 / 3))}
                    width={`${mainWidth}px`}
                />

                <NoteRecordEdit
                    height={Math.floor(mainHeight * (2 / 3))}
                    width={mainWidth}
                />
            </div>
            <SideOperation width={`${sideWidth}px`} />
        </>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows flex-start'
    ReactDOM.render(<WindowsDetailComponent />, root)
}
