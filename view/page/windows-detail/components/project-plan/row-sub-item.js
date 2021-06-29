import { MoveTop, MoveBottom, MoveToMain } from './svg';

export default class RowSubItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { name } = this.props;

        return <>
            <div className='column-sub-line' />
            <div className='column-sub-item flex-center'>
                <label>{name}</label>
                <MoveTop />
                <MoveBottom />
                <MoveToMain />
            </div>
        </>
    }
}
