import TaskDetail from './../../../../components/page/task-detail';

export default class SideOperation extends React.Component {
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

    render() {
        const {
            title, inputFocusField, content,
            specific, measurable, attainable, relevant, timeBound
        } = this.state

        return <div className='side-operation'>
            <div className="side-operation-header noselect flex-start">
                <div className="operation-header-item header-item-button flex-center flex-rest">完成</div>
            </div>
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
        </div>
    }
}
