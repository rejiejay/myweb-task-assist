import service from '../../../../service';

export class MoveToMainProgressPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: [],
        }
    }

    selectHandle = async targetId => {
        const { resolve, taskId } = this.props

        const fetchInstance = await service.progress.switchProgressPlanPosition(taskId, targetId);

        if (fetchInstance.result !== 1) {
            return toast.show(fetchInstance.message);
        }

        resolve();
    }

    render() {
        const { reject, project } = this.props

        return <div className='move-to-main-progress-plan noselect'>
            <div className="move-progress-title">请选择要移动到的计划</div>
            <div className="move-progress-container">
                {project.map((item, key) =>
                    <div className="move-progress-item"
                        key={key}
                        onClick={() => this.selectHandle(item.id)}
                    >
                        {item.title}
                    </div>
                )}
            </div>
            <div className="move-progress-operate flex-start">
                <div className="move-progress-operate-item flex-center flex-rest"
                    onClick={() => reject('关闭')}
                >关闭</div>
            </div>
        </div>
    }
}
