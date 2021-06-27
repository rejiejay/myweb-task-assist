import TaskDetail from './../../../../components/page/task-detail';
import toast from './../../../../components/toast';

import service from './../../../../service';

export class WebAddTask extends React.Component {
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

    confirmHandle = async () => {
        const { resolve } = this.props
        const { title, content, specific, measurable, attainable, relevant, timeBound } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!content) return toast.show('内容不能为空');

        const fetchInstance = await service.task.addTask({ title, content, specific, measurable, attainable, relevant, timeBound })

        if (fetchInstance.result !== 1) {
            return toast.show(fetchInstance.message);
        }

        resolve();
    }

    onChangeHandle = (value, field) => {
        let newState = {};
        newState[field] = value;
        this.setState(newState);
    }

    render() {
        const { reject } = this.props
        const { title, content, specific, measurable, attainable, relevant, timeBound } = this.state

        return <div className='windows-add-task'>
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
