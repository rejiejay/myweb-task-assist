import { MoveTop, MoveBottom, MoveToMain } from './svg';

export default class RowSubItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            name,
            thisId, preId, nextId,
            switchProgressPlanPositionHandle,
            moveToMainProgressPlanHandle,
            editProgressPlanHandle,
        } = this.props;

        return <>
            <div className='column-sub-line' />
            <div className='column-sub-item flex-center'>
                <label
                    onClick={() => editProgressPlanHandle(thisId)}
                >{name}</label>
                {preId && <MoveTop
                    onClick={() => switchProgressPlanPositionHandle(thisId, preId)}
                />}
                {nextId && <MoveBottom
                    onClick={() => switchProgressPlanPositionHandle(thisId, nextId)}
                />}
                <MoveToMain
                    onClick={() => moveToMainProgressPlanHandle(thisId)}
                />
            </div>
        </>
    }
}
