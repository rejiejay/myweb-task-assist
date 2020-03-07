class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            processName: ''
        }
    }

    componentDidMount() {
    }

    render() {
        return (<div class="windows">
        </div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
