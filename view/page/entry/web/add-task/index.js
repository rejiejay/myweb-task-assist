import TaskDetail from './../../../../components/page/task-detail';

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

export class WebAddTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            inputFocusField: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: ''
        }
    }

    confirmHandle = () => {
        const { resolve } = this.props
        resolve();
    }

    render() {
        const { reject } = this.props
        const {
            title, inputFocusField, content,
            specific, measurable, attainable, relevant, timeBound
        } = this.state

        return <div className='windows-add-task'>
            <TaskDetail
                title={title}
                inputFocusField={inputFocusField}
                content={content}
                specific={specific}
                measurable={measurable}
                attainable={attainable}
                relevant={relevant}
                timeBound={timeBound}
            />
            <div className="windows-operate flex-start">
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={this.confirmHandle}
                >新增</div>
                <div className="windows-operate-item flex-center flex-rest"
                    onClick={() => reject('关闭')}
                >关闭</div>
            </div>
        </div>
    }
}
