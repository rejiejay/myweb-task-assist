import { AddIcon, MoveLeft, MoveRight } from './svg';

export default class RowMainItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { name, addMain, moveLeft, moveRight } = this.props;

        return <div className='column-main-item flex-center'>
            <label>{name}</label>
            {moveLeft && <MoveLeft />}
            {moveRight && <MoveRight />}
            {addMain && <AddIcon className='add-main-plan' />}
            <AddIcon className='add-sub-plan' />
        </div>
    }
}
