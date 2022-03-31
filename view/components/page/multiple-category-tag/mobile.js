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

export class MultipleCategoryTag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {
                //     id: key,
                //     isKill: false,
                //     isSelect: false,
                //     value: 'for code handle',
                //     lable: 'for show'
                // }
            ],
        }
    }

    async componentDidMount() {
        this.getAllCategory()
    }

    async getAllCategory() {
        const { tag } = this.props
        this.setState({ list: tag })
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
        const { list } = this.state
        const isSelectAll = list.filter(({ isSelect }) => isSelect).length === 0;
        const selectAllMap = item => this.initItem(item, isSelectAll, item.isDisable)
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

        return <div className='mobile-category-tag noselect flex-column'>
            <div className="category-tag-container flex-rest flex-start">
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
                        >{item.lable}</SelectItem>
                    )}
                </div>
                <div className="category-tag-right flex-rest">
                    {list.filter(this.resulItemfilter).map(item =>
                        <ResulItem
                            unSelectHandle={() => this.unSelectHandle(item)}
                        >{item.lable}</ResulItem>
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
