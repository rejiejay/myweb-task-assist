import { Mind } from './mind'

export default class NoteRecordMind extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.initMind()
    }

    async initMind() {
        const { taskId } = this.props;
        this.refs.jsmind.initMind(taskId)
    }

    render() {
        const { height, width, selectHandle } = this.props;

        return <div className='note-record-mind noselect' style={{ height: `${height}px` }}>
            <div className="operation">
                <div className="operation-container flex-start">
                    <div className="operation-item">
                        <div className="operation-item-container flex-center">新增</div>
                    </div>
                </div>
            </div>

            <Mind
                ref='jsmind'
                height={height}
                width={width}
                selectHandle={selectHandle}
            />
        </div>
    }
}
