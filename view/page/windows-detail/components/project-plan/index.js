import ColumnItem from './column-item';

export default class ProjectPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uncategorized: [],
            project: [],
        }
    }

    render() {
        const { height } = this.props;
        const { uncategorized } = this.state;

        return <div className='project-plan noselect' style={{ height: `${height}px` }}>
            <div className='project-plan-container flex-start'>
                <ColumnItem mainName='整体目标' isMain list={uncategorized} />
                <ColumnItem mainName='第一目标' />
                <ColumnItem mainName='第二目标' />
                <ColumnItem mainName='第三目标' />
                <ColumnItem mainName='第四目标' />
            </div>
        </div>
    }
}
