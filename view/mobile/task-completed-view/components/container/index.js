export default class Container extends React.Component {
    constructor(props) {
        super(props)

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        const headerHeight = 32
        const bottomHeight = 45 + 1

        this.containerHeight = this.clientHeight - headerHeight - bottomHeight
    }

    render() {
        const {
            HeaderComponent,
            ListComponent,
            BottomComponent,
        } = this.props
        const {
            clientHeight,
            containerHeight,
        } = this

        return <div className="task-completed-view"
            style={{ height: `${clientHeight}px` }}
        >
            <div className='completed-view-header'>
                {HeaderComponent}
            </div>
            <div className="completed-view-container"
                style={{ height: `${containerHeight}px` }}
            >
                {ListComponent}
            </div>
            <div className='completed-view-bottom flex-start-center'>
                {BottomComponent}
            </div>
        </div>
    }
}
