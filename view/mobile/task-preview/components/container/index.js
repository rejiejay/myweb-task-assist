export default class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            goTaskDeatil,
            HeaderComponent,
            MainComponent,
            FilterComponent,
        } = this.props

        return <div className="task-preview-container">
            <div className="task-preview-header flex-start-center">
                {HeaderComponent}
            </div>
            <div className="task-preview-main">
                {MainComponent}
                {FilterComponent}
            </div>
            <div className="task-preview-edit flex-center"
                onClick={goTaskDeatil}
            >
                编辑
            </div>
        </div>
    }
}
