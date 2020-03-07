class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() { }

    render() {
        const { isShow } = this.props

        return [
            <div className="edit" style={!!!isShow ? { display: 'none' } : {}}>
            </div>
        ]
    }
}

export default EditComponent
