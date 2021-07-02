import service from './../../../service';

const SelectItem = ({
    selectHandle,
    disableHandle,
    isSelect,
    isDisable,
    children
}) => {
    let className = 'select-item-container flex-start-center'
    if (isSelect) className += ' select-item-select'
    if (isDisable) className += ' select-item-disable'
    return <div className="category-select-item">
        <div className={className}>
            <label
                onClick={selectHandle}
            >{children}</label>
            <div className="select-item-delete"
                onClick={disableHandle}
            >x</div>
        </div>
    </div>
}

const ResulItem = ({ unSelectHandle, children }) => {
    return <div className="category-select-item">
        <div className="select-item-container flex-start-center"
            onClick={unSelectHandle}
        >{children}</div>
    </div>
}

export class MultipleTaskCategoryTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelectAll: false,
            list: [],
        }
    }

    async componentDidMount() {
        this.getAllCategory()
    }

    async getAllCategory() {
        const fetchMap = item => this.initItem(item)

        const fetchInstance = await service.category.getAllCategory();
        if (fetchInstance.result !== 1) return
        const list = fetchInstance.data
        this.setState({ list: list.map(fetchMap) })
    }

    initItem = (item = {}, isSelect = false, isDisable = false) => ({
        ...item,
        isSelect,
        isDisable,
    })

    confirmHandle = async () => {
        const { resolve } = this.props
        const { list } = this.state

        resolve(list.filter(this.resulItemfilter));
    }

    selectAllHandle = () => {
        const selectAllMap = item => this.initItem(item, true, item.isDisable)
        this.setState({ list: this.state.list.map(selectAllMap) })
    }

    resulItemfilter = item => {
        if (item.isDisable) return false
        if (item.isSelect) return true
        return false
    }

    selectHandle = (item) => {
        const selectMap = i => {
            if (item.id === i.id) {
                return this.initItem(i, !i.isSelect, i.isDisable)
            }
            return this.initItem(i, i.isSelect, i.isDisable)
        }
        this.setState({ list: this.state.list.map(selectMap) })
    }

    disableHandle = (item) => {
        const disableMap = i => {
            if (item.id === i.id) {
                return this.initItem(i, i.isSelect, !i.isDisable)
            }
            return this.initItem(i, i.isSelect, i.isDisable)
        }
        this.setState({ list: this.state.list.map(disableMap) })
    }

    unSelectHandle = (item) => {
        const unSelectMap = i => {
            if (item.id === i.id) {
                return this.initItem(i, false, i.isDisable)
            }
            return this.initItem(i, i.isSelect, i.isDisable)
        }
        this.setState({ list: this.state.list.map(unSelectMap) })
    }

    render() {
        const { reject } = this.props
        const { list } = this.state

        return <div className='multiple-category-tag noselect'>
            <div className="category-tag-container flex-start">
                <div className="category-tag-left flex-rest">
                    <div className="category-select-all"
                        onClick={this.selectAllHandle}
                    >全选</div>
                    {list.map(item =>
                        <SelectItem
                            isSelect={item.isSelect}
                            isDisable={item.isDisable}
                            selectHandle={() => this.selectHandle(item)}
                            disableHandle={() => this.disableHandle(item)}
                        >{item.name}</SelectItem>
                    )}
                </div>
                <div className="category-tag-right flex-rest">
                    {list.filter(this.resulItemfilter).map(item =>
                        <ResulItem
                            unSelectHandle={() => this.unSelectHandle(item)}
                        >{item.name}</ResulItem>
                    )}
                </div>
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
