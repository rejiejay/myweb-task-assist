import toast from './../../../../components/toast';
import Modal from './../../../../components/modal';

import TaskStatus from './task-status';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    selectCategoryTag = () => {
        const { taskId, updateTaskCategoryTagHandle } = this.props
        toast.show()
        import('./../../../../components/page/single-category-tag/index.js').then(async ({ SingleTaskCategoryTag }) => {
            toast.destroy()

            const taskCategoryTag = new Modal(SingleTaskCategoryTag, { taskId });
            const result = await taskCategoryTag.show();

            if (result instanceof Error) return

            updateTaskCategoryTagHandle();
        })
    }

    render() {
        const { taskId, isUrgent, isImportant, addTaskProgressPlanHandle } = this.props

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
                    onClick={() => addTaskProgressPlanHandle()}
                >新增计划</div>
            </div>
        </div>
    }
}
