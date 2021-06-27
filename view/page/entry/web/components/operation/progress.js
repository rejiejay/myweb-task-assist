export default class Progress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { data } = this.props
        if (data.length <= 0) return <></>

        return <div className="main-operation-block">
            <div className="operation-progress">
                <div className="operation-progress-title">任务进度</div>
                {data.map((item, key) =>
                    <div key={key} className="operation-progress-item">
                        {key + 1}. {item.title}
                    </div>
                )}
            </div>
        </div>
    }
}
