import TaskUncategorizedNotes from './task-notes';
import TaskEdit from './task-edit';

export default class SideOperation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            width,
            overallGoalTaskId,
            editTaskId,
            setEditTaskId
        } = this.props

        return <div className='side-operation' style={{ width: width || '450px' }}>
            <TaskEdit
                overallGoalTaskId={overallGoalTaskId}
                editTaskId={editTaskId}
                setEditTaskId={setEditTaskId}
            />
            <TaskUncategorizedNotes />
        </div>
    }
}
