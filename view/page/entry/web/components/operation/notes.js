export default class Notes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { data } = this.props
        if (data.length <= 0) return <></>

        return <div className="main-operation-block">
            <div className="operation-notes">
                <div className="operation-notes-title">任务笔记列表</div>
                {data.map((item, key) =>
                    <div className="operation-notes-item noselect" key={key}>
                        <div className="operation-notes-container">
                            {item.title}
                        </div>
                    </div>
                )}
            </div>
        </div>
    }
}
