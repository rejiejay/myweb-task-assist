import ContentInputItem from './content-input-item';

export default class ContentInputContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputFocusField: '',
            reInputFocusField: '',
        }
    }

    componentDidMount() {
        window.document.addEventListener('keydown', this.keydownEventListener)
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.keydownEventListener)
    }

    keydownEventListener = e => {
        let currKey = 0
        e = e || event
        currKey = e.keyCode || e.which || e.charCode // 支持IE、FF
        if (currKey === 13) {
            this.onWrapHandle()
        }
        if (currKey === 8) {
            this.onDeleteHandle()
        }
        if (currKey === 38) {
            this.onMoveFocusHandle('up')
        }
        if (currKey === 40) {
            this.onMoveFocusHandle('dowm')
        }
    }

    onWrapHandle() {
        let newWrapId = '';

        const focusNewWrap = () => {
            if (!newWrapId) return
            if (!this.refs[newWrapId]) return
            this.refs[newWrapId].focusHandle()
        }

        const { inputFocusField } = this.state
        const { contentInputList, setContentInputListHandle } = this.props

        if (!inputFocusField) return

        const newContentInputList = contentInputList.reduce((accumulator, currentValue, currentIndex) => {
            const id = `${new Date().getTime() + currentIndex}${currentIndex}`
            const isWrapContentInput = currentValue.id === inputFocusField;
            currentValue.id = id
            accumulator.push(currentValue);

            if (isWrapContentInput) {
                newWrapId = id + 'inputFocusField'
                accumulator.push({
                    type: 'normal',
                    id: newWrapId,
                    value: '',
                });
            }

            return accumulator
        }, [])

        setContentInputListHandle(newContentInputList, () => focusNewWrap())
    }

    onDeleteHandle() {
        let lastWrapId = '';

        const focusNewWrap = () => {
            if (!lastWrapId) return
            if (!this.refs[lastWrapId]) return
            this.refs[lastWrapId].focusHandle()
        }

        const { inputFocusField } = this.state
        const { contentInputList, setContentInputListHandle } = this.props
        if (contentInputList.length <= 1) return
        if (!inputFocusField) return
        const item = contentInputList.find(i => i.id === inputFocusField)
        if (!item) return
        if (item.value) return

        const newContentInputList = contentInputList.reduce((accumulator, currentValue, currentIndex) => {
            const isDeleteContentInput = currentValue.id === inputFocusField;
            const id = `${new Date().getTime() + currentIndex}${currentIndex}`
            currentValue.id = id

            if (isDeleteContentInput) {
                accumulator.isDel = true
            } else {
                accumulator.list.push(currentValue);
            }

            if (!accumulator.isDel) {
                lastWrapId = id
            }

            return accumulator
        }, { list: [], isDel: false }).list

        setContentInputListHandle(newContentInputList, () => focusNewWrap())
    }

    onMoveFocusHandle(direction) {
        const { inputFocusField } = this.state
        const { contentInputList } = this.props
        if (contentInputList.length <= 1) return
        if (!inputFocusField) return

        let focusWrapId = '';
        for (let index = 0; index < contentInputList.length; index++) {
            const element = contentInputList[index];

            if (inputFocusField === element.id) {
                if (direction === 'up' && index > 0) {
                    focusWrapId = contentInputList[index - 1].id
                }
                if (direction === 'dowm' && index < (contentInputList.length - 1)) {
                    focusWrapId = contentInputList[index + 1].id
                }
            }
        }

        if (!focusWrapId) return
        this.refs[focusWrapId].focusHandle()
    }

    setInputFocusField = id => this.setState({
        inputFocusField: id,
        reInputFocusField: id
    })

    clearInputFocusField = () => this.setState({ inputFocusField: '' })

    getInputFocusField = () => this.state.reInputFocusField

    setInputFocusHandle = inputFocusField => this.refs[inputFocusField].focusHandle()

    scrollByNodeId = nodeId => {
        const top = this.refs[nodeId].getElementToPageTop()
        if (top) window.scrollTo(0, top - 100);
    }

    render() {
        const {
            title,
            contentInputList,
            setTitleHandle,
            setContentInputItemValue,
        } = this.props;

        return <>
            <div className="title-input flex-center">
                <input type="text" placeholder="请输入标题(简单描述/提问)"
                    value={title || ''}
                    onChange={({ target: { value } }) => setTitleHandle(value)}
                    onFocus={() => this.setState({ inputFocusField: '' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
            </div>

            {contentInputList.map((item, key) =>
                <ContentInputItem
                    ref={item.id}
                    key={item.id}
                    index={key + 1}
                    id={item.id}
                    type={item.type}
                    value={item.value}
                    onChange={setContentInputItemValue}
                    onFocus={() => this.setInputFocusField(item.id)}
                    onBlur={this.clearInputFocusField}
                />
            )}
        </>
    }
}
