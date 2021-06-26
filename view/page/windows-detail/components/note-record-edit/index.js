export default class NoteRecordEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { height } = this.props;

        return <div className='note-record-edit flex-start' style={{ minHeight: `${height}px` }}>
            <div className='record-edit-navigation noselect' style={{ height: `${height}px` }}>
                <div className='edit-navigation-container'>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h3'>标题3</div>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h3'>标题3</div>
                    <div className='edit-navigation-h4'>标题4</div>
                </div>
            </div>
        </div>
    }
}
