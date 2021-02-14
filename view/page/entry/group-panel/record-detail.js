import service from './../service'

const props = {
    resolve: () => { },
    reject: () => { },
    longTermId: null
}

export class GroupPanelRecordDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            record: ''
        }
    }

    componentDidMount() { }

    render() {
        const { record } = this.state

        return <div className='record-detail' style={{ padding: '25px 15px 15px 15px' }}>GroupPanelRecordDetail</div>
    }
}

export default GroupPanelRecordDetail
