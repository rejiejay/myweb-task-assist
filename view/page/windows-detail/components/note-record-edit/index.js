const ContentInputItem = ({ value, index, onChange, id, onFocus, onBlur }) => {
    return <div className="content-input-item flex-start-center">
        <label>{index}</label>
        <div style={{ width: '15px' }} />
        <input type="text"
            value={value || ''}
            onChange={({ target: { value } }) => onChange(value, id)}
            onFocus={onFocus}
            onBlur={onBlur}
        />
        <div style={{ width: '15px' }} />
    </div>
}

export default class NoteRecordEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            inputFocusField: '',
            contentInputList: [{
                tyep: 'normal',
                id: 'key-1',
                value: '内容',
            }, {
                tyep: 'normal',
                id: 'key-2',
                value: '内容',
            }, {
                tyep: 'h1',
                id: 'key-3',
                value: '标题1',
            }, {
                tyep: 'h2',
                id: 'key-4',
                value: '标题2',
            }, {
                tyep: 'h3',
                id: 'key-5',
                value: '标题3',
            }, {
                tyep: 'h4',
                id: 'key-6',
                value: '标题4',
            }],
        }
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
                            key={key}
                            index={key + 1}
                            id={item.id}
                            tyep={item.tyep}
                            value={item.value}
                        />
                    )}
                </div>
            </div>
        </div>
    }
}
