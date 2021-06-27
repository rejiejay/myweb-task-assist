class ContentInputItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    focusHandle() {
        this.refs.input.focus()
    }

    render() {
        const { value, type, index, onChange, id, onFocus, onBlur } = this.props;
        let className = 'content-input-item flex-start-center'
        let splitWidth = 15
        let menu = ''

        switch (type) {
            case 'normal':
                break;
            case 'h1':
                className += ' input-item-h1'
                break;
            case 'h2':
                className += ' input-item-h2'
                break;
            case 'h3':
                splitWidth = 20
                className += ' input-item-h3'
                break;
            case 'h4':
                splitWidth = 20
                className += ' input-item-h4'
                break;
            default:
                break;
        }

        return <div className={className}>
            <label>{index}</label>
            <div
                className='flex-center'
                style={{ width: `${splitWidth}px` }}
            >{menu}</div>
            <input type="text"
                id={id}
                ref='input'
                value={value || ''}
                onChange={({ target: { value } }) => onChange(value, id)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <div style={{ width: '15px' }} />
        </div>
    }
}

export default class NoteRecordEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            inputFocusField: '',
            reInputFocusField: '',
            contentInputList: new Array(55).fill('').map((i, k) => ({
                type: 'normal',
                id: `${new Date().getTime()}${k}`,
                value: `${new Date().getTime()}${k}`,
            })),
        }

        this.isFixed = false
    }

    componentDidMount() {
        window.document.addEventListener('keydown', this.keydownEventListener)
        window.document.addEventListener('scroll', this.scrollEventListener)
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.keydownEventListener)
        window.document.removeEventListener('scroll', this.scrollEventListener)
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

    scrollEventListener = e => {
        const container = this.refs['note-record-edit'];
        const navigation = this.refs['record-edit-navigation'];
        const header = this.refs['edit-content-header'];
        const input = this.refs['edit-content-input'];

        if (!container || !navigation || !header || !input) return

        const offsetTop = container.offsetTop
        const scrollheight = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;

        if (scrollheight > offsetTop) {
            if (this.isFixed) return
            this.isFixed = true
            navigation.className = 'record-edit-navigation noselect edit-navigation-fixed'
            header.className = 'edit-content-header flex-start-center noselect edit-header-fixed'
            input.className = 'edit-content-input edit-input-fixed'
            return
        };

        if (!this.isFixed) return
        navigation.className = 'record-edit-navigation noselect'
        header.className = 'edit-content-header flex-start-center noselect'
        input.className = 'edit-content-input'
        this.isFixed = false
    }

    onWrapHandle() {
        let newWrapId = '';

        const focusNewWrap = () => {
            if (!newWrapId) return
            if (!this.refs[newWrapId]) return
            this.refs[newWrapId].focusHandle()
        }

        const { inputFocusField, contentInputList } = this.state
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
        this.setState({
            contentInputList: newContentInputList
        }, () => focusNewWrap())
    }

    onDeleteHandle() {
        let lastWrapId = '';

        const focusNewWrap = () => {
            if (!lastWrapId) return
            if (!this.refs[lastWrapId]) return
            this.refs[lastWrapId].focusHandle()
        }

        const { inputFocusField, contentInputList } = this.state
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
        this.setState({
            contentInputList: newContentInputList
        }, () => focusNewWrap())
    }

    onMoveFocusHandle(direction) {
        const { inputFocusField, contentInputList } = this.state
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

    setInputFocusField = id => {
        this.setState({ inputFocusField: id, reInputFocusField: id })
    }

    clearInputFocusField = () => {
        this.setState({ inputFocusField: '' })
    }

    setContentInputItemValue = (value, id) => {
        this.setState({
            contentInputList: this.state.contentInputList.map((item, key) => {
                if (item.id === id) {
                    return { ...item, value }
                }

                return item
            })
        })
    }

    setContentInputItemType = type => {
        const { reInputFocusField, contentInputList } = this.state
        if (!reInputFocusField) return
        const item = contentInputList.find(i => i.id === reInputFocusField)
        if (!item) return
        this.refs[reInputFocusField].focusHandle()
        this.setState({
            contentInputList: contentInputList.map((item, key) => {
                if (item.id === reInputFocusField) {
                    return { ...item, type }
                }

                return item
            })
        })
    }

    render() {
        const { height, width } = this.props;
        const { title, contentInputList } = this.state

        return <div className='note-record-edit flex-start'
            ref="note-record-edit"
            style={{
                minHeight: `${height}px`,
                width: `${width}px`
            }}
        >
            <div className='record-edit-navigation noselect'
                ref="record-edit-navigation"
                style={{ height: `${height}px` }}
            >
                <div className='edit-navigation-container'>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h3'>标题3</div>
                    <div className='edit-navigation-h1'>标题1</div>
                    <div className='edit-navigation-h2'>标题2</div>
                    <div className='edit-navigation-h3'>标题3</div>
                    <div className='edit-navigation-h4'>标题4</div>
                </div>
            </div>
            <div className='record-edit-content flex-rest' style={{
                minHeight: `${height}px`,
                width: `${width - 230}px`
            }}>
                <div className='edit-content-header flex-start-center noselect'
                    ref="edit-content-header"
                    style={{ width: `${width - 231}px` }}
                >
                    <div className="left-operating flex-start-center flex-rest">
                        <div className="operat-item hover-item"
                            onClick={() => this.setContentInputItemType('normal')}
                        >内容</div>
                        <div className="operat-item hover-item"
                            onClick={() => this.setContentInputItemType('h1')}
                        >标题1</div>
                        <div className="operat-item hover-item"
                            onClick={() => this.setContentInputItemType('h2')}
                        >标题2</div>
                        <div className="operat-item hover-item"
                            onClick={() => this.setContentInputItemType('h3')}
                        >标题3</div>
                        <div className="operat-item hover-item"
                            onClick={() => this.setContentInputItemType('h4')}
                        >标题4</div>
                    </div>

                    <div className="right-operating flex-start-center">
                        <div className="operat-item hover-item">移动</div>
                        <div className="operat-item hover-item">删除</div>
                        <div className="operat-item hover-item">暂存</div>
                    </div>
                </div>
                <div className='edit-content-input'
                    ref="edit-content-input"
                    style={{ width: `${width - 231}px` }}
                >
                    <div className="title-input flex-center">
                        <input type="text" placeholder="请输入标题(简单描述/提问)"
                            value={title || ''}
                            onChange={({ target: { value } }) => this.setState({ title: value })}
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
                            onChange={this.setContentInputItemValue}
                            onFocus={() => this.setInputFocusField(item.id)}
                            onBlur={this.clearInputFocusField}
                        />
                    )}
                </div>
            </div>
        </div>
    }
}
