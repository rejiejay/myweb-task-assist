class SearchComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() { }

    render() {
        const { isShow } = this.props

        return [
            <div className="search" style={!!!isShow ? { display: 'none' } : {}}>
            </div>
        ]
    }
}

export default SearchComponent
