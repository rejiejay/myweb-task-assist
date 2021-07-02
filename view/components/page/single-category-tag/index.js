import { DeleteIcon } from './svg';

import service from '../../../service';

const SelectItem = ({
    isEditStatus,
    deleteHandle,
    selectHandle,
    isSelect,
    children
}) => {
    let className = 'select-item-container flex-start-center'
    if (isSelect) className += ' select-item-select'
    return <div className="category-select-item">
        <div className={className}>
            <label
                onClick={selectHandle}
            >{children}</label>
            {isEditStatus && <div className="category-select-delete flex-center">
                <DeleteIcon
                    onClick={deleteHandle}
                />
            </div>}
        </div>
    </div>
}

export class SingleTaskCategoryTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditStatus: false,
            list: [],
        }
    }

    async componentDidMount() {
        this.categoryId = await this.getTask()
        this.getAllCategory(this.categoryId)
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

    deleteHandle = async ({ id }) => {
        const fetchInstance = await service.category.delCategoryById(id);
        if (fetchInstance.result !== 1) return
        this.getAllCategory(this.categoryId)
    }

    confirmHandle = async ({ id }) => {
        const { resolve } = this.props
        const fetchInstance = await service.task.setTaskCategoryTagById(id);
        if (fetchInstance.result !== 1) return
        resolve();
    }

    render() {
        const { reject } = this.props
        const { list, isEditStatus } = this.state

        return <div className='single-category-tag noselect'>
            <div className="category-tag-container">
                {list.map(item =>
                    <SelectItem
                        isEditStatus={isEditStatus}
                        selectHandle={() => this.confirmHandle(item)}
                        isSelect={item.isSelect}
                        deleteHandle={() => this.deleteHandle(item)}
                    >{item.name}</SelectItem>
                )}
            </div>
            <div className="windows-operate flex-start">
                {!isEditStatus && <div className="windows-operate-item flex-center flex-rest"
                    onClick={() => this.setState({ isEditStatus: true })}
                >编辑</div>}
                {isEditStatus && <div className="windows-operate-item flex-center flex-rest"
                    onClick={() => this.setState({ isEditStatus: false })}
                >取消</div>}
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={() => reject('关闭')}
                >关闭</div>
            </div>
        </div>
    }
}
