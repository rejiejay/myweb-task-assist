export default class Classification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            classifySelected,
            unClassifyCount,
            longTermProgramList,
            selectTermProgram,
            setClassifySelected,
        } = this.props

        return <>
            <div className="classification-header noselect">
                <div className={
                    `${classifySelected === 'un-classify' &&
                    'active-item'} classification-header-item hover-item flex-center`
                }
                    onClick={() => setClassifySelected('un-classify')}
                >未分类{unClassifyCount ? ` (${unClassifyCount})` : ''}</div>
            </div>
            <div className="classification-container noselect">{
                longTermProgramList
                    .map(program =>
                        <div className={
                            `${classifySelected === program.id && 'active-item'
                            } classification-item hover-item`}
                            onClick={() => selectTermProgram(program)}
                        >
                            <div className="classification-item-description">{program.count ? `${program.count} - ` : ''}{program.name}</div>
                        </div>
                    )
            }</div>
        </>
    }
}
