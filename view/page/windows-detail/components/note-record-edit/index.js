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

        return <div className="content-input-item flex-start-center">
            <label>{index}</label>
            <div style={{ width: '15px' }} />
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
            contentInputList: [{
                type: 'normal',
                id: 'key-1',
                value: '内容',
            }, {
                type: 'normal',
                id: 'key-2',
                value: '内容',
            }, {
                type: 'h1',
                id: 'key-3',
                value: '标题1',
            }, {
                type: 'h2',
                id: 'key-4',
                value: '标题2',
            }, {
                type: 'h3',
                id: 'key-5',
                value: '标题3',
            }, {
                type: 'h4',
                id: 'key-6',
                value: '标题4',
            }],
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

    setInputFocusField = id => {
        this.setState({ inputFocusField: id })
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

    render() {
        const { height } = this.props;
        const { title, contentInputList } = this.state

        return <div className='note-record-edit flex-start' style={{ minHeight: `${height}px` }}>
            <div className='record-edit-navigation noselect' style={{ height: `${height}px` }}>
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
            <div className='record-edit-content flex-rest' style={{ minHeight: `${height}px` }}>
                <div className='edit-content-header flex-start-center noselect'>
                    <div className="left-operating flex-start-center flex-rest">
                        <div className="operat-item hover-item">内容</div>
                        <div className="operat-item hover-item">标题1</div>
                        <div className="operat-item hover-item">标题2</div>
                        <div className="operat-item hover-item">标题3</div>
                        <div className="operat-item hover-item">标题4</div>
                    </div>

                    <div className="right-operating flex-start-center">
                        <div className="operat-item hover-item">移动</div>
                        <div className="operat-item hover-item">删除</div>
                        <div className="operat-item hover-item">暂存</div>
                    </div>
                </div>
                <div className='edit-content-input'>
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
