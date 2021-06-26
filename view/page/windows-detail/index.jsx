import Header from './components/header';
import SideOperation from './components/side-operation';
import ProjectPlan from './components/project-plan';

class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return <div className="windows-container flex-start">
            <div className="main-windows flex-column flex-rest">
                <Header />
                <ProjectPlan />
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
