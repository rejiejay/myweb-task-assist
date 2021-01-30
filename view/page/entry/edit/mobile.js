import CommonlyListItem from './../../../components/mobile/commonly-list-item'
import CommonlyInputText from './../../../components/mobile/commonly-input-text'

const props = {
    resolve: () => {},
    reject: () => {},
    id: null,
    longTerm: { id: null, title: '' },
    tags: [
        // "exam", "love"
    ]
}

export class TaskEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',

            longTerm: { id: null, title: '' },
            tags: [],
            minEffectTimestamp: null,
            maxEffectTimestamp: null,
            status: { value: null, label: null },
            priority: { value: null, label: null },
        }
    }

    render() {
        const {
            title, content, specific, measurable, attainable, relevant, timeBound
        } = this.state

        return <div className='task-edit-container'>
            <CommonlyListItem key='title'
                title='简单描述/提问/归纳'
                isRequiredHighlight
            >
                <CommonlyInputText key='title'
                    value={title}
                    onChangeHandle={value => this.setState({ title: value })}
                    height={250}
                    placeholder='情景? + Action/冲突/方案'
                />
            </CommonlyListItem>
            <CommonlyListItem key='content'
                title='得出什么结论?'
            >
                <CommonlyInputText key='content'
                    value={content}
                    onChangeHandle={value => this.setState({ content: value })}
                    isMultipleInput
                    isAutoHeight
                    minHeight={250}
                    placeholder='结论1: (情景是啥?)是什么?为什么?怎么办?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='specific'
                title='任务具体内容?'
            >
                <CommonlyInputText key='specific'
                    value={specific}
                    onChangeHandle={value => this.setState({ specific: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='任务是什么?为什么?啥跨度影响?对啥影响大?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='measurable'
                title='任务完成标识?'
            >
                <CommonlyInputText key='measurable'
                    value={measurable}
                    onChangeHandle={value => this.setState({ measurable: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='完成的标识是什么?为什么标志完成?核心因素?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='attainable'
                title='任务是否可以实现?'
            >
                <CommonlyInputText key='attainable'
                    value={attainable}
                    onChangeHandle={value => this.setState({ attainable: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='为什么可以实现?未来自己接受呢? 决定因素?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='relevant'
                title='任务和哪些需求相关?'
            >
                <CommonlyInputText key='relevant'
                    value={relevant}
                    onChangeHandle={value => this.setState({ relevant: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='为什么和这个需求相关?时间跨度?本质?哪个角度?'
                />
            </CommonlyListItem>
            <CommonlyListItem key='timeBound'
                title='明确的截止期限?'
            >
                <CommonlyInputText key='timeBound'
                    value={timeBound}
                    onChangeHandle={value => this.setState({ timeBound: value })}
                    isMultipleInput
                    isAutoHeight
                    placeholder='期限1： 是什么?为什么设定这个时间?哪个角度?'
                />
            </CommonlyListItem>
        </div>
    }
}

export default TaskEdit
