import TaskDetail from './../../../../components/page/task-detail';

import TaskUncategorizedNotes from './task-notes';

export default class SideOperation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: ''
        }
    }

    onChangeHandle = (value, field) => {
        let newState = {};
        newState[field] = value;
        this.setState(newState);
    }

    render() {
        const {
            title, content, specific, measurable, attainable, relevant, timeBound
        } = this.state
        const { width } = this.props

        return <div className='side-operation' style={{ width: width || '450px' }}>
            <div className="side-operation-header noselect flex-start">
                <div className="operation-header-item header-item-button flex-center flex-rest">完成</div>
            </div>

            <TaskDetail
                title={title}
                content={content}
                specific={specific}
                measurable={measurable}
                attainable={attainable}
                relevant={relevant}
                timeBound={timeBound}
                onChangeHandle={this.onChangeHandle}
            />

            <TaskUncategorizedNotes />
        </div>
    }
}
