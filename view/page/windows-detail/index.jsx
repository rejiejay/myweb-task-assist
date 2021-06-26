import Header from './components/header';
import SideOperation from './components/side-operation';

class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return <div className="windows-container flex-start">
            <div className="main-windows flex-column flex-rest">
                <Header />
            </div>
            <SideOperation />
        </div>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows'
    ReactDOM.render(<WindowsDetailComponent />, root)
}
