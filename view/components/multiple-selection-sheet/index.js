import consequencer from './../../../utils/consequencer';
import style from './style.js'

const CONST = {
    MULTIPLE_SELECT: {
        DEFAULT: [],
        ITEM: {
            isKill: false,
            isSelect: false,
            value: 'for code handle',
            label: 'for show'
        }
    }
}

class Utils extends React.Component {
    constructor(props) {
        super(props)
    }

    getSelectedResult() {
        const { selectList } = this.state
        const canSelectList = selectList.filter(item => item.isKill === false)
        const resultList = canSelectList.filter(item => item.isSelect)

        return resultList
    }

    fastSelectHandle({ isSelect }) {
        this.setState({
            selectList: this.state.selectList.map(item => {
                if (item.isKill) return { ...item, isSelect: false }
                return { ...item, isSelect }
            })
        })
    }

    listSelectHandle({ isKill, isSelect, index }) {
        const { selectList } = this.state
        this.setState({
            selectList: selectList.map((item, key) => {
                if (key === index && isKill) return { ...item, isKill, isSelect: false }
                if (key === index && !isKill) return { ...item, isKill, isSelect }
                return item
            })
        })
    }

    unSelectResult(result) {
        this.setState({
            selectList: this.state.selectList.map(item => {
                if (result.label === item.label && result.value === item.value) return { ...item, isSelect: false }
                return item
            })
        })
    }

    checkboxHandle() {
        const { callBackHandle } = this.props
        const { isSelect, isDisable } = this.state

        if (isDisable) return
        this.setState({ isSelect: !isSelect })
        callBackHandle({ isDisable, isSelect: !isSelect })
    }

    disableHandle() {
        const { callBackHandle } = this.props
        const { isSelect, isDisable } = this.state

        this.setState({ isDisable: !isDisable })
        callBackHandle({ isSelect, isDisable: !isDisable })
    }
}

class MultipleSelectLayout extends Utils {
    constructor(props) {
        super(props)
        this.state = {
            selectList: CONST.MULTIPLE_SELECT.DEFAULT
        }
    }

    async componentDidMount() {
        const {list} = this.props

        const selectList = list.map(item => ({
            isKill: item.isKill || false,
            isSelect: item.isSelect || false,
            value: item.value,
            label: item.label
        }))
        this.setState({ selectList })
    }

    render() {
        const { selectList } = this.state
        const resultList = this.getSelectedResult()

        return <div className="multiple-select">
            <FastSelectCheckbox fastSelectHandle={({ isSelect }) => this.fastSelectHandle({ isSelect })} />
            <SelectList listSelectHandle={({ isKill, isSelect, index }) => this.listSelectHandle({ isKill, isSelect, index })} data={selectList} />
            <ResultList data={resultList} unSelectResult={item => this.unSelectResult(item)} />
        </div>
    }
}

class FastSelectCheckbox extends Utils {
    constructor(props) {
        super(props)
    }

    render() {
        const { fastSelectHandle } = this.props
        return <div style={{ paddingBottom: '15px' }}>
            <Checkbox
                key="multiple-select"
                name='全选'
                callBackHandle={fastSelectHandle}
            />
        </div>
    }
}

const SelectList = ({ data, listSelectHandle }) => <div style={style.multipleSelectList}>
    {data.map((item, key) => <Checkbox key={key}
        name={item.label}
        haveDisable
        isKill={item.isKill}
        isSelect={item.isSelect}
        callBackHandle={({ isDisable, isSelect }) => listSelectHandle({ isKill: isDisable, isSelect, index: key })}
    />)}
</div>

class ResultList extends Utils {
    constructor(props) {
        super(props)
    }

    render() {
        const { data, unSelectResult } = this.props
        const list = data.filter(({ isKill, isSelect }) => !isKill && !!isSelect)
        if (list.length === 0) return ''

        return <div style={style.multipleSelectResult}>
            {data.filter(({ isKill, isSelect }) => !isKill && !!isSelect)
                .map((item, key) => <div key={key} style={{ float: 'left', padding: '7.5px' }}>
                    <div style={style.multipleSelectItem}
                        onClick={() => unSelectResult(item)}
                    >{item.label}</div>
                </div>)}
        </div>
    }
}

class Checkbox extends Utils {
    constructor(props) {
        super(props)
        this.state = {
            isSelect: false,
            isDisable: false
        }
    }

    render() {
        const { name, haveDisable } = this.props
        const isSelect = this.props.isSelect !== null ? this.props.isSelect : this.state.isSelect
        const isDisable = this.props.isKill !== null ? this.props.isKill : this.state.isDisable

        const checkboxStyle = () => {
            let checkboxClass = style.multipleSelectItem
            if (isSelect && !isDisable) checkboxClass = { ...style.multipleSelectItem, ...style.multipleSelectSelect }
            if (isDisable) checkboxClass = checkboxClass = { ...style.multipleSelectItem, ...style.multipleSelectDisable }
            return checkboxClass
        }

        const disableStyle = () => {
            let checkboxClass =  style.multipleSelectDisable
            if (isDisable) checkboxClass = { ...style.multipleSelectDisable, ...style.multipleSelectEffect }
            return checkboxClass
        }

        return <div style={{ cursor: 'pointer', float: 'left', padding: '7.5px' }}>
            <div className="flex-start noselect">
                <div style={checkboxStyle()} onClick={this.checkboxHandle.bind(this)}>{name}</div>
                {haveDisable && <div style={disableStyle()} onClick={this.disableHandle.bind(this)}>X</div>}
            </div>
        </div>
    }
}

/**
 * 展示多选框
 * @param {*} selectedList [ isKill: false, isSelect: false, value: 'for code handle', label: 'for show' ]
 */
const openMultipleSelect = selectedList => new Promise(resolve => {
    const myMultipleSelectRef = React.createRef()

    const div = document.createElement('div')
    div.setAttribute('style', style.content)

    const confirmHandle = () => {
        const selected = myMultipleSelectRef.current.getSelectedResult()
        document.body.removeChild(div)
        resolve(consequencer.success(selected))
    }
    const cancelHandle = () => {
        resolve(consequencer.error('cancel'))
        document.body.removeChild(div)
    }

    document.body.appendChild(div)
    ReactDOM.render(
        <>
            <div style={style.mask}  onClick={cancelHandle} />
            <div style={style.container}>
                <MultipleSelectLayout ref={myMultipleSelectRef}
                    list={selectedList}
                />
                <div style={style.operating}>
                    <div style={style.confirm} onClick={confirmHandle}>确认</div>
                    <div style={style.cancel} onClick={cancelHandle}>取消</div>
                </div>
            </div>
        </>
        ,
        div
    )
}).catch(error => error);

export default openMultipleSelect