/**
 * 用于操作数据库SQLite的GUI工具
 */
class GUIComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return <>
            <div>GUI</div>
            <div>GUI</div>
        </>
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'sql-lite-gui'
    ReactDOM.render(<GUIComponent />, root)
}
