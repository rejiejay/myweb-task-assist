class ListComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() { }

    async init() {

    }

    render() {
        const { isShow } = this.props

        return [
            <div className="list" style={!!!isShow ? { display: 'none' } : {}}>
            </div>
        ]
    }
}

export default ListComponent
