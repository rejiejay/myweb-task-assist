const Otherinput = ({ title, placeholder, value, onChange, isFocus, onBlur, onFocus }) => {
    return <div className="content-input">
        <div className="content-input-title">{isFocus ? placeholder : title}</div>
        <textarea className="content-textarea fiex-rest" type="text"
            placeholder={placeholder}
            value={value || ''}
            onChange={({ target: { value } }) => onChange(value)}
            onBlur={onBlur}
            onFocus={onFocus}
        ></textarea>
    </div>
}

export class TaskDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputFocusField: '',
        }
    }

    render() {
        const {
            onChangeHandle,
            title, content, specific, measurable, attainable, relevant, timeBound
        } = this.props
        const { inputFocusField } = this.state

        return <div className='task-detail'>
            <div className="title-input flex-center">
                <input type="text" placeholder="简单描述/提问"
                    value={title || ''}
                    onChange={({ target: { value } }) => onChangeHandle(value, 'title')}
                    onFocus={() => this.setState({ inputFocusField: 'title' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
            </div>
            {inputFocusField === 'title' && <div className='edit-input-tip'>情景? + Action/冲突/方案</div>}
            {inputFocusField === 'content' && <div className='edit-input-tip'>结论1: (情景是啥?)是什么?为什么?怎么办?</div>}
            <div className="content-input">
                <textarea className="content-textarea fiex-rest" type="text"
                    placeholder='任务结论'
                    value={content || ''}
                    onChange={({ target: { value } }) => onChangeHandle(value, 'content')}
                    onFocus={() => this.setState({ inputFocusField: 'content' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                ></textarea>
            </div>
            <div className="other-input">
                <Otherinput
                    key='specific'
                    title='任务具体内容?'
                    placeholder='任务是什么?为什么?啥跨度影响?对啥影响大?'
                    value={specific}
                    onChange={value => onChangeHandle(value, 'specific')}
                    isFocus={inputFocusField === 'specific'}
                    onFocus={() => this.setState({ inputFocusField: 'specific' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
                <Otherinput
                    key='measurable'
                    title='任务完成标识?'
                    placeholder='完成的标识是什么?为什么标志完成?核心因素?'
                    value={measurable}
                    onChange={value => onChangeHandle(value, 'measurable')}
                    isFocus={inputFocusField === 'measurable'}
                    onFocus={() => this.setState({ inputFocusField: 'measurable' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
                <Otherinput
                    key='attainable'
                    title='任务是否可以实现?'
                    placeholder='为什么可以实现?未来自己接受呢? 决定因素?'
                    value={attainable}
                    onChange={value => onChangeHandle(value, 'attainable')}
                    isFocus={inputFocusField === 'attainable'}
                    onFocus={() => this.setState({ inputFocusField: 'attainable' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
                <Otherinput
                    key='relevant'
                    title='任务和哪些需求相关?'
                    placeholder='为什么和这个需求相关?时间跨度?本质?哪个角度?'
                    value={relevant}
                    onChange={value => onChangeHandle(value, 'relevant')}
                    isFocus={inputFocusField === 'relevant'}
                    onFocus={() => this.setState({ inputFocusField: 'relevant' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
                <Otherinput
                    key='timeBound'
                    title='明确的截止期限?'
                    placeholder='期限1： 是什么?为什么设定这个时间?哪个角度?'
                    value={timeBound}
                    onChange={value => onChangeHandle(value, 'timeBound')}
                    isFocus={inputFocusField === 'timeBound'}
                    onFocus={() => this.setState({ inputFocusField: 'timeBound' })}
                    onBlur={() => this.setState({ inputFocusField: '' })}
                />
            </div>
        </div>
    }
}

export default TaskDetail;
