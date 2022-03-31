export default class Classification extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            unClassifyCount,
            recentlyCount,
            mostlyCount,
            classifySelected,
            setClassifySelected,
            timestampStatistics,
            selectTimeStatistics,
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
            <div className="classification-header noselect">
                <div className={
                    `${classifySelected === 'recently' &&
                    'active-item'} classification-header-item hover-item flex-center`
                }
                    onClick={() => setClassifySelected('recently')}
                >最近阅读{recentlyCount ? ` (${recentlyCount})` : ''}</div>
            </div>
            <div className="classification-header noselect">
                <div className={
                    `${classifySelected === 'mostly' &&
                    'active-item'} classification-header-item hover-item flex-center`
                }
                    onClick={() => setClassifySelected('mostly')}
                >最多阅读{mostlyCount ? ` (${mostlyCount})` : ''}</div>
            </div>
            <div className="classification-container noselect">{
                timestampStatistics
                    .map(time =>
                        <div className={
                            `${classifySelected === time.title && 'active-item'
                            } classification-item hover-item flex-center`}
                            onClick={() => selectTimeStatistics(time)}
                        >{time.title} ({time.count})
                        </div>
                    )
            }</div>
        </>
    }
}
