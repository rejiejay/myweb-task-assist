export class TaskCategoryTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    confirmHandle = async () => {
        const { resolve } = this.props
        resolve();
    }

    render() {
        const { reject } = this.props

        return <div className='task-category-tag'>
            <div className="task-tag-container">
            </div>
            <div className="windows-operate flex-start">
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={this.confirmHandle}
                >确定</div>
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={() => reject('关闭')}
                >关闭</div>
            </div>
        </div>
    }
}
