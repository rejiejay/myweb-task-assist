export default class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            HeaderComponent,
            QuickRecallComponent,
            LongTermListComponent,
        } = this.props

        return <div className="long-term-select">
            {HeaderComponent}
            <div className="term-select-container">
                {QuickRecallComponent}
                {LongTermListComponent}
            </div>
        </div>
    }
}
