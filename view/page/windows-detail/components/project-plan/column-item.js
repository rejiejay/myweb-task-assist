import RowMainItem from './row-main-item';
import RowSubItem from './row-sub-item';

export default class ColumnItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { mainName, isMain } = this.props;

        return <div className='project-plan-column flex-start'>
            {!isMain && <div className='column-line' />}
            <div className='column-main flex-column-center'>
                <RowMainItem
                    name={mainName}
                    addMain={isMain}
                    moveLeft={!isMain}
                    moveRight={!isMain}
                />
                <RowSubItem name='未分類' />
            </div>
        </div>
    }
}
