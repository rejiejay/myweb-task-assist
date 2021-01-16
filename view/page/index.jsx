class MobileComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return <div>1</div>
    }
}

window.onload = () => ReactDOM.render(< MobileComponent />, document.body)
