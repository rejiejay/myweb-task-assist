import service from './../../../../service';

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

    render() {
        const { height } = this.props;
        const { uncategorized, project } = this.state;

        return <div className='project-plan noselect' style={{ height: `${height}px` }}>
            <div className='project-plan-container flex-start'>
                <ColumnItem mainName='整体目标' isMain list={uncategorized} />
                {project.map((item, key) =>
                    <ColumnItem
                        key={key}
                        mainName={item.title}
                        list={item.children}
                    />
                )}
            </div>
        </div>
    }
}
