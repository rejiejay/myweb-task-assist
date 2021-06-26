import { AddIcon, MoveLeft, MoveRight } from './svg';

const ColumnMainItem = ({ name, addMain, moveLeft, moveRight }) => {
    return <div className='column-main-item flex-center'>
        <label>{name}</label>
        {moveLeft && <MoveLeft />}
        {moveRight && <MoveRight />}
        {addMain && <AddIcon className='add-main-plan' />}
        <AddIcon className='add-sub-plan' />
    </div>
}

const PlanColumnItem = ({ mainName, isMain }) => {
    return <div className='project-plan-column flex-start'>
        {!isMain && <div className='column-line' />}
        <div className='column-main flex-column-center'>
            <ColumnMainItem
                name={mainName}
                addMain={isMain}
                moveLeft={!isMain}
                moveRight={!isMain}
            />
        </div>
    </div>
}

export default class ProjectPlan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className='project-plan noselect'>
            <div className='project-plan-container flex-start'>
                <PlanColumnItem mainName='整体目标' isMain />
                <PlanColumnItem mainName='第一目标' />
                <PlanColumnItem mainName='第二目标' />
                <PlanColumnItem mainName='第三目标' />
                <PlanColumnItem mainName='第四目标' />
            </div>
        </div>
    }
}
