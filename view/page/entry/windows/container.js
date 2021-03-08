export class WindowsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedId: null
        }

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    selectedDetailHandle() { }

    render() {
        const { clientHeight } = this
        const minHeight = `${clientHeight - 185}px`
        const { list } = this.props
        const { selectedId } = this.state
        const newText = text => text && text.split('\n').map((item, i) => <p key={i}>{item}</p>)

        return <div className='windows-container flex-start-top' style={{ minHeight }}>
            <div className="content-list flex-rest">
                <div className="list-float noselect">{list.map((data, key) => (
                    <div className={`list-item ${selectedId === data.id ? 'list-item-selected' : ''}`} key={key}>
                        <div className="list-item-container"
                            onClick={() => this.selectedDetailHandle(data.id)}
                        >
                            <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                                <p>{data.title}</p>
                                {newText(data.content)}
                            </div>
                        </div>
                    </div>
                ))}</div>
            </div>

            <div className='content-detail' style={{ minHeight }}>
                <div className="content-detail-container">

                    <div className="detail-operate flex-start-center noselect">
                        <div className="flex-rest flex-center">随机查看</div>
                        <div className="flex-rest flex-center">时间</div>
                        <div className="flex-rest flex-center">编辑</div>
                        <div className="flex-rest flex-center">删除</div>
                    </div>

                    <div className="detail-preview">
                        <div className="detail-preview-title">title</div>
                        <div className="detail-item">
                            <div className="detail-item-title">title</div>
                            <div className="detail-item-description">{newText('description')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default WindowsContainer
