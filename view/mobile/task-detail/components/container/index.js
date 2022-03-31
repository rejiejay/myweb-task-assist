export default class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            HeaderComponent,
            MainComponent,
            FilterComponent,
            OperationalComponent,
        } = this.props

        return <div className="task-detail-container">
            <div className="task-detail-header flex-start-center">
                {HeaderComponent}
            </div>
            <div className="task-detail-main">
                {MainComponent}
                {FilterComponent}
            </div>
            <div className="task-detail-operational flex-start-center" >
                {OperationalComponent}
            </div>
        </div>
    }
}
