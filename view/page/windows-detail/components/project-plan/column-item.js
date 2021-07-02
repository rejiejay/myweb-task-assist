import RowMainItem from './row-main-item';
import RowSubItem from './row-sub-item';

export default class ColumnItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderRowSubItem = () => {
        const {
            list,
            switchProgressPlanPositionHandle,
            moveToMainProgressPlanHandle,
            editProgressPlanHandle,
        } = this.props;

        let render = []
        for (let index = 0; index < list.length; index++) {
            const isFirst = index === 0
            const isLast = index === (list.length - 1)
            const preElement = isFirst ? null : list[index - 1];
            const thisElement = list[index];
            const nextElement = isLast ? null : list[index + 1];

            let result = {
                ...thisElement,
                preId: preElement ? preElement.id : null,
                nextId: nextElement ? nextElement.id : null,
            }

            render.push(result)
        }

        return render.map((item, key) =>
            <RowSubItem
                key={key}
                name={item.title}
                preId={item.preId}
                thisId={item.id}
                nextId={item.nextId}
                switchProgressPlanPositionHandle={switchProgressPlanPositionHandle}
                moveToMainProgressPlanHandle={moveToMainProgressPlanHandle}
                editProgressPlanHandle={editProgressPlanHandle}
            />
        )
    }

    render() {
        const {
            mainName,
            isMain,
            overallGoalTaskId,
            thisId,
            preId,
            nextId,
            switchProgressPlanPositionHandle,
            addTaskProgressPlanHandle,
            editProgressPlanHandle
        } = this.props;

        return <div className='project-plan-column flex-start'>
            {!isMain && <div className='column-line' />}
            <div className='column-main flex-column-center'>

                <RowMainItem
                    id={thisId}
                    name={mainName}
                    addMain={isMain}
                    addMainHandle={() => addTaskProgressPlanHandle(overallGoalTaskId)}
                    addSubHandle={() => addTaskProgressPlanHandle()}
                    moveLeft={preId}
                    moveLeftHandle={() => switchProgressPlanPositionHandle(thisId, preId)}
                    moveRight={nextId}
                    moveRightHandle={() => switchProgressPlanPositionHandle(thisId, nextId)}
                    editProgressPlanHandle={editProgressPlanHandle}
                />

                {this.renderRowSubItem()}

            </div>
        </div>
    }
}
