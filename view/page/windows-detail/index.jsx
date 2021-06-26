class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return <div className="windows-container">task detail</div>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows'
    ReactDOM.render(<WindowsDetailComponent />, root)
}
