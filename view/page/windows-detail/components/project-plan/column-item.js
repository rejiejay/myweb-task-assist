import RowMainItem from './row-main-item';
import RowSubItem from './row-sub-item';

export default class ColumnItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { mainName, isMain, list } = this.props;

        return <div className='project-plan-column flex-start'>
            {!isMain && <div className='column-line' />}
            <div className='column-main flex-column-center'>
                <RowMainItem
                    name={mainName}
                    addMain={isMain}
                    moveLeft={!isMain}
                    moveRight={!isMain}
                />
                {list.map((item, key) =>
                    <RowSubItem
                        key={key}
                        name={item.title}
                    />
                )}
            </div>
        </div>
    }
}
