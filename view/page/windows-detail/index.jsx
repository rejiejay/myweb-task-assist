import Header from './components/header';
import SideOperation from './components/side-operation';
import ProjectPlan from './components/project-plan';

class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    render() {
        const { clientWidth } = this
        const sideWidth = 450
        const mainWidth = `${clientWidth - sideWidth}px`

        return <div className="windows-container flex-start">
            <div className="main-windows flex-column"
                style={{ width: mainWidth }}
            >
                <Header />
                <ProjectPlan />
            </div>
            <SideOperation width={`${sideWidth}px`} />
        </div>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows'
    ReactDOM.render(<WindowsDetailComponent />, root)
}
