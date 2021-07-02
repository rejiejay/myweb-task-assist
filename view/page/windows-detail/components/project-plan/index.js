import service from './../../../../service';
import toast from './../../../../components/toast';
import Modal from './../../../../components/modal';

import ColumnItem from './column-item';

export default class ProjectPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uncategorized: [],
            project: [],
        }
    }

    componentDidMount() {
        this.initProgressPlan();
    }

    initProgressPlan = async () => {
        const { taskId } = this.props;

        const fetchInstance = await service.progress.getAllProgressPlanByTask(taskId);
        if (fetchInstance.result !== 1) return
        const { uncategorized, project } = fetchInstance.data
        this.setState({ uncategorized, project })
    }

    renderMainColumnProjectPlan = () => {
        const { project } = this.state;
        const { addTaskProgressPlanHandle, editProgressPlanHandle } = this.props;

        let render = []
        for (let index = 0; index < project.length; index++) {
            const isFirst = index === 0
            const isLast = index === (project.length - 1)
            const preElement = isFirst ? null : project[index - 1];
            const thisElement = project[index];
            const nextElement = isLast ? null : project[index + 1];

            let result = {
                ...thisElement,
                preId: preElement ? preElement.id : null,
                nextId: nextElement ? nextElement.id : null,
            }

            render.push(result)
        }

        return render.map((item, key) =>
            <ColumnItem
                key={key}
                preId={item.preId}
                thisId={item.id}
                nextId={item.nextId}
                mainName={item.title}
                list={item.children}
                switchProgressPlanPositionHandle={this.switchProgressPlanPositionHandle}
                addTaskProgressPlanHandle={addTaskProgressPlanHandle}
                moveToMainProgressPlanHandle={this.moveToMainProgressPlanHandle}
                editProgressPlanHandle={editProgressPlanHandle}
            />
        )
    }

    switchProgressPlanPositionHandle = async (taskId, targetId) => {
        if (!taskId || !targetId) return

        const fetchInstance = await service.progress.switchProgressPlanPosition(taskId, targetId);
        if (fetchInstance.result !== 1) return

        this.initProgressPlan();
    }

    moveToMainProgressPlanHandle = async taskId => {
        const { project } = this.state;

        toast.show()
        import('./move-to-main-progress-plan.js').then(async ({ MoveToMainProgressPlan }) => {
            toast.destroy()

            const moveToMainProgressPlann = new Modal(MoveToMainProgressPlan, { taskId, project });
            const result = await moveToMainProgressPlann.show();

            if (result instanceof Error) return

            this.initProgressPlan();
        })
    }

    render() {
        const {
            height,
            addTaskProgressPlanHandle,
            taskId,
            editProgressPlanHandle,
        } = this.props;
        const { uncategorized } = this.state;

        return <div className='project-plan noselect' style={{ height: `${height}px` }}>
            <div className='project-plan-container flex-start'>
                <ColumnItem
                    mainName='整体目标'
                    isMain
                    list={uncategorized}
                    overallGoalTaskId={taskId}
                    thisId={taskId}
                    addTaskProgressPlanHandle={addTaskProgressPlanHandle}
                    switchProgressPlanPositionHandle={this.switchProgressPlanPositionHandle}
                    moveToMainProgressPlanHandle={this.moveToMainProgressPlanHandle}
                    editProgressPlanHandle={editProgressPlanHandle}
                />

                {this.renderMainColumnProjectPlan()}
            </div>
        </div>
    }
}
