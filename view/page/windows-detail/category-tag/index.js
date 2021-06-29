import service from './../../../service';

const SelectItem = ({ selectHandle, isSelect, children }) => {
    let className = 'select-item-container'
    if (isSelect) className += ' select-item-select'
    return <div className="category-select-item">
        <div className={className} onClick={selectHandle}>
            {children}
        </div>
    </div>
}

export class TaskCategoryTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelectAll: false,
            list: [],
        }
    }

    async componentDidMount() {
        const categoryId = await this.getTask()
        this.getAllCategory(categoryId)
    }

    async getTask() {
        const { taskId } = this.props
        const fetchInstance = await service.task.getTaskById(taskId);
        if (fetchInstance.result !== 1) return
        const task = fetchInstance.data
        return task.categoryId
    }

    async getAllCategory(categoryId) {
        const fetchMap = item => this.initItem(item, categoryId === item.id)

        const fetchInstance = await service.category.getAllCategory();
        if (fetchInstance.result !== 1) return
        const list = fetchInstance.data
        this.setState({ list: list.map(fetchMap) })
    }

    initItem = (item = {}, isSelect = false) => ({
        ...item,
        isSelect,
    })

    confirmHandle = async item => {
        const { resolve } = this.props

        resolve(item);
    }

    render() {
        const { reject } = this.props
        const { list } = this.state

        return <div className='task-category-tag noselect'>
            <div className="category-tag-container">
                {list.map(item =>
                    <SelectItem
                        selectHandle={() => this.confirmHandle(item)}
                        isSelect={item.isSelect}
                    >{item.name}</SelectItem>
                )}
            </div>
            <div className="windows-operate flex-start">
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={() => reject('关闭')}
                >关闭</div>
            </div>
        </div>
    }
}
