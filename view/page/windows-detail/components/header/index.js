import toast from './../../../../components/toast';
import Modal from './../../../../components/modal';
import service from './../../../../service';

import TaskStatus from './task-status';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    selectCategoryTag = () => {
        const { taskId } = this.props
        toast.show()
        import('./../../category-tag/index.js').then(async ({ TaskCategoryTag }) => {
            toast.destroy()

            const taskCategoryTag = new Modal(TaskCategoryTag, { taskId });
            const result = await taskCategoryTag.show();

            if (result instanceof Error) return

            service.task.setTaskCategoryTagById(taskId, result.id)
        })
    }

    addPlanTask = () => {
        const { taskId, addTaskProgressPlanHandle } = this.props
        toast.show()
        import('./add-progress-plan.js').then(async ({ AddTaskProgressPlan }) => {
            toast.destroy()

            const addTaskProgressPlan = new Modal(AddTaskProgressPlan, { taskId });
            const result = await addTaskProgressPlan.show();

            if (result instanceof Error) return

            addTaskProgressPlanHandle();
        })
    }

    render() {
        const { taskId, isUrgent, isImportant } = this.props

        return <div className='windows-header flex-start-center noselect'>
            <div className="left-operating flex-start-center flex-rest">
                <div className="operat-item hover-item"
                    onClick={this.selectCategoryTag}
                >标签分类</div>
                <TaskStatus
                    taskId={taskId}
                    isUrgent={isUrgent}
                    isImportant={isImportant}
                />
            </div>

            <div className="right-operating flex-start-center">
                <div className="operat-item hover-item"
                    onClick={this.addPlanTask}
                >新增计划</div>
            </div>
        </div>
    }
}
