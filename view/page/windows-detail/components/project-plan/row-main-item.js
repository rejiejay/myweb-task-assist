import { AddIcon, MoveLeft, MoveRight } from './svg';

export default class RowMainItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            id,
            name,
            addMain,
            addMainHandle,
            addSubHandle,
            moveLeft,
            moveRight,
            moveLeftHandle,
            moveRightHandle,
            editProgressPlanHandle,
        } = this.props;

        return <div className='column-main-item flex-center'>
            <label
                onClick={() => editProgressPlanHandle && editProgressPlanHandle(id)}
            >{name}</label>

            {moveLeft && <MoveLeft
                onClick={moveLeftHandle}
            />}

            {moveRight && <MoveRight
                onClick={moveRightHandle}
            />}

            {addMain && <AddIcon className='add-main-plan'
                onClick={addMainHandle}
            />}

            <AddIcon className='add-sub-plan'
                onClick={addSubHandle}
            />
        </div>
    }
}
