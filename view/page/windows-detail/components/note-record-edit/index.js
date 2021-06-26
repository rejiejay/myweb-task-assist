export default class NoteRecordEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { height } = this.props;

        return <div className='note-record-edit noselect' style={{ height: `${height}px` }}>
            NoteRecordEdit
        </div>
    }
}
