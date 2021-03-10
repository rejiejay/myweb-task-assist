import FilterEdit from './../../components/page/filter-edit'

class WindowsEditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageStatus: 'add',

            title: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',

            longTerm: { id: null, title: '' },
            tags: [
                // { id, name }
            ],
            minEffectTimestamp: null,
            maxEffectTimestamp: null,
            status: { value: null, label: null },
            priority: { value: null, label: null }
        }

        this.filterEditRef = React.createRef()

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    onFilterEditChangeHandle = () => {
        const filterEditRef = this.filterEditRef.current
        const { tagFilter, longTermFilter, minEffectTimestampFilter, maxEffectTimestampFilter, statusFilter, statusMultipleFilter, priorityFilter, priorityMultipleFilter } = filterEditRef.getResult()

        this.setState({
            longTerm: longTermFilter,
            tags: tagFilter,
            minEffectTimestamp: minEffectTimestampFilter,
            maxEffectTimestamp: maxEffectTimestampFilter,
            status: statusFilter,
            priority: priorityFilter
        })
    }

    render() {
        const {
            pageStatus, 
            title, content, specific, measurable, attainable, relevant, timeBound,
            longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority
        } = this.state
        const { clientHeight } = this
        const minHeight = clientHeight - 125
        const isMultipleFilter = false
        const initFilter = { longTerm, tags, minEffectTimestamp, maxEffectTimestamp, status, priority }

        return <div className="windows flex-column-center">
            
            <div className="windows-operate flex-start">
                <div className="windows-operate-item flex-center flex-rest">新增</div>
                <div className="windows-operate-item flex-center flex-rest">暂存</div>
                <div className="windows-operate-item flex-center flex-rest">删除</div>
                <div className="windows-operate-item flex-center flex-rest">关闭</div>
            </div>

            <div className="windows-container flex-start-top" style={{ minHeight }}>
                <div className="windows-container-left flex-rest">
                    <div className="title-input flex-center">
                        <input type="text" placeholder="简单描述/提问"
                            value={title}
                            onChange={({ target: { value } }) => this.setState({ title: value })}
                        />
                    </div>
                    <div className="content-input">

                        <textarea className="content-textarea fiex-rest" type="text"
                            placeholder='任务内容'
                            style={{ height: minHeight / 2 }}
                            value={content}
                            onChange={({ target: { value } }) => this.setState({ content: value })}
                        ></textarea>
                    </div>

                    <div className="content-filter-edit">
                        <FilterEdit
                            ref={this.filterEditRef}
                            onChangeHook={this.onFilterEditChangeHandle}
                            isMultipleFilter={isMultipleFilter}
                            initFilter={initFilter}
                        />
                    </div>
                </div>

                <div className="windows-separation"></div>

                <div className="windows-container-right flex-rest">

                    <div className="soft-operate flex-start">
                        <div className="soft-operate-item flex-center flex-rest">暂存</div>
                        <div className="soft-operate-item flex-center flex-rest">关闭</div>
                    </div>

                    <div className="other-input">
                        <Otherinput
                            key='specific'
                            title='任务具体内容?'
                            placeholder='任务是什么?为什么?啥跨度影响?对啥影响大?'
                            value={specific}
                            onChange={value => this.setState({ specific: value })}
                        />
                        <Otherinput
                            key='measurable'
                            title='任务完成标识?'
                            placeholder='完成的标识是什么?为什么标志完成?核心因素?'
                            value={measurable}
                            onChange={value => this.setState({ measurable: value })}
                        />
                        <Otherinput
                            key='attainable'
                            title='任务是否可以实现?'
                            placeholder='为什么可以实现?未来自己接受呢? 决定因素?'
                            value={attainable}
                            onChange={value => this.setState({ attainable: value })}
                        />
                        <Otherinput
                            key='relevant'
                            title='任务和哪些需求相关?'
                            placeholder='为什么和这个需求相关?时间跨度?本质?哪个角度?'
                            value={relevant}
                            onChange={value => this.setState({ relevant: value })}
                        />
                        <Otherinput
                            key='timeBound'
                            title='明确的截止期限?'
                            placeholder='期限1： 是什么?为什么设定这个时间?哪个角度?'
                            value={timeBound}
                            onChange={value => this.setState({ timeBound: value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    }
}

const Otherinput = ({ title, placeholder, value, onChange }) => {
    return <div className="content-input">
        <div className="content-input-title">{title}</div>
        <textarea className="content-textarea fiex-rest" type="text"
            placeholder={placeholder}
            style={{ height: '105px' }}
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
        ></textarea>
    </div>
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows-edit'
    ReactDOM.render(<WindowsEditComponent />, root)
}
