export default class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            HeaderComponent,
            SelectLongTermProgramComponent,
            UnCategorizedItemComponent,
            CategorizedItemComponent,
        } = this.props

        return <>
            <div className="long-term-list-header flex-start-center">
                {HeaderComponent}
            </div>
            <div className="long-term-list">
                <div className="term-list-container">
                    {SelectLongTermProgramComponent}
                    {UnCategorizedItemComponent}
                    {CategorizedItemComponent}
                </div>
            </div>
        </>
    }
}
