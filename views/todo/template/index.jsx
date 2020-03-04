import serviceStorage from './../../../components/service-storage/index.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

    }

    async componentDidMount() {
        await this.initDate()
    }

    async initDate() { }

    render() {
        const self = this
        const { } = this.state

        return [
            <div></div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
