import FunctionHelper from './../../../utils/function-helper';
import { loadPageVar } from './../../utils/url-helper';
import toast from './../../components/toast';
import Confirm from './../../components/confirm';

import {
    getTaskDetail,
    addTaskByDetail,
    editTaskByDetail,
    editTaskDeadline,
    editTaskLongTerm,
    editTaskTag,
    editTaskPriority,
    editTaskProgress,
    deleteTask,
    completedTask,
} from './../../service/task';

import Container from './components/container';
import Main from './components/main';
import Operational from './components/operational';
import SMART from './components/smart';

class WindowsDetailComponent extends React.Component {
    constructor(props) {
        super(props)

        const nowTimestamp = new Date().getTime();

        this.state = {
            id: '',

            title: '',
            content: '',

            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',

            longTermId: '',
            longTermName: '',

            deadlineTimestamp: '',
            tag: '',
            progress: '',
            priority: '',

            createTimestamp: nowTimestamp,
            updateTimestamp: nowTimestamp,

            isEditDiff: false,
        }

        this.originTitle = '';
        this.originContent = '';

        this.originSpecific = '';
        this.originMeasurable = '';
        this.originAttainable = '';
        this.originRelevant = '';
        this.originTimeBound = '';

        this.verifyEditDiff = this.verifyEditDiffHandle();
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const id = loadPageVar('id');

        if (!id) return

        const result = await getTaskDetail(id)
        if (result instanceof Error || !result) return
        this.initDataToStatus(result)
    }

    initDataToStatus = (result) => {

        this.originTitle = result.title;
        this.originContent = result.content;

        this.originSpecific = result.specific;
        this.originMeasurable = result.measurable;
        this.originAttainable = result.attainable;
        this.originRelevant = result.attainable;
        this.originTimeBound = result.timeBound;

        this.setState({
            id: result.id,

            title: result.title,
            content: result.content,

            specific: result.specific,
            measurable: result.measurable,
            attainable: result.attainable,
            relevant: result.relevant,
            timeBound: result.timeBound,

            longTermId: result.longTermId,
            longTermName: result.longTermName,

            deadlineTimestamp: result.deadlineTimestamp,
            tag: result.tag,
            progress: result.progress,
            priority: result.priority,

            createTimestamp: result.createTimestamp,
            updateTimestamp: result.updateTimestamp,

            isEditDiff: false
        })
    }

    submitHandle = async () => {
        const {
            id,

            title,
            content,

            specific,
            measurable,
            attainable,
            relevant,
            timeBound,
        } = this.state

        if (!title) return toast.show('标题不能为空');
        if (!content) return toast.show('内容不能为空');

        const details = {
            title,
            content,

            specific,
            measurable,
            attainable,
            relevant,
            timeBound,
        }

        if (!id) {
            const result = await addTaskByDetail(details)
            if (result instanceof Error) {
                return Confirm(result.message)
            }
            return this.initDataToStatus(result);
        }

        const result = await editTaskByDetail({
            ...details,
            id
        })
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        return this.initDataToStatus(result);
    }

    deleteHandle = async () => {
        const { id } = this.state
        const confirmInstance = await Confirm('确定要删除吗?')
        if (confirmInstance.result !== 1) {
            return
        }

        const result = await deleteTask(id)
        if (result instanceof Error) {
            return Confirm(result.message)
        }

        const nowTimestamp = new Date().getTime();
        this.setState({
            id: '',

            title: '',
            content: '',

            specific: '',
            measurable: '',
            attainable: '',
            relevant: '',
            timeBound: '',

            longTermId: '',
            longTermName: '',

            deadlineTimestamp: '',
            tag: '',
            progress: '',
            priority: '',

            createTimestamp: nowTimestamp,
            updateTimestamp: nowTimestamp,

            isEditDiff: false,
        })

        this.originTitle = '';
        this.originContent = '';

        this.originSpecific = '';
        this.originMeasurable = '';
        this.originAttainable = '';
        this.originRelevant = '';
        this.originTimeBound = '';
    }

    completedHandle = async () => {
        const { id } = this.state
        const confirmInstance = await Confirm('确定要完成此任务吗?')
        if (confirmInstance.result !== 1) {
            return
        }

        const result = await completedTask(id)
        if (result instanceof Error) {
            return Confirm(result.message)
        }

        this.initDataToStatus(result);
    }

    verifyEditDiffHandle = () => {
        const handle = () => {
            let isEditDiff = false

            const {
                title,
                content,

                specific,
                measurable,
                attainable,
                relevant,
                timeBound,
            } = this.state

            const {
                originTitle,
                originContent,

                originSpecific,
                originMeasurable,
                originAttainable,
                originRelevant,
                originTimeBound,
            } = this

            if (title !== originTitle) isEditDiff = true
            if (content !== originContent) isEditDiff = true

            if (specific !== originSpecific) isEditDiff = true
            if (measurable !== originMeasurable) isEditDiff = true
            if (attainable !== originAttainable) isEditDiff = true
            if (relevant !== originRelevant) isEditDiff = true
            if (timeBound !== originTimeBound) isEditDiff = true

            this.setState({ isEditDiff })
        }

        return FunctionHelper.debounce(handle, 500);
    }

    selectLongTermHandle = async longTermId => {
        const { id } = this.state
        const result = await editTaskLongTerm(id, longTermId)
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({
            longTermId: result.longTermId,
            longTermName: result.longTermName,
        })
    }

    setDeadlineHandle = async timestamp => {
        const { id } = this.state
        const result = await editTaskDeadline(id, timestamp)
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({ deadlineTimestamp: timestamp })
    }

    setTagHandle = async (tag = 'null') => {
        const { id } = this.state
        const result = await editTaskTag(id, tag)
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({
            tag: result.tag,
        })
    }

    setPriorityHandle = async (priority = 'null') => {
        const { id } = this.state
        const result = await editTaskPriority(id, priority)
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({
            priority: result.priority,
        })
    }

    setProgressHandle = async (progress = 'null') => {
        const { id } = this.state
        const result = await editTaskProgress(id, progress)
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({
            progress: result.progress,
        })
    }

    render() {
        const {
            id,

            title,
            content,

            specific,
            measurable,
            attainable,
            relevant,
            timeBound,

            longTermId,
            longTermName,

            deadlineTimestamp,
            tag,
            progress,
            priority,

            createTimestamp,
            updateTimestamp,

            isEditDiff,
        } = this.state

        return <Container
            MainComponent={<Main
                title={title}
                setTitle={(value) => this.setState({ title: value }, this.verifyEditDiff)}

                identityTime={updateTimestamp || createTimestamp}

                content={content}
                setContent={(value) => this.setState({ content: value }, this.verifyEditDiff)}
            />}
            isShowSmart={!!specific || !!measurable || !!attainable || !!relevant || !!timeBound}
            SmartComponent={<SMART
                specific={specific}
                setSpecific={(value) => this.setState({ specific: value }, this.verifyEditDiff)}

                measurable={measurable}
                setMeasurable={(value) => this.setState({ measurable: value }, this.verifyEditDiff)}

                attainable={attainable}
                setAttainable={(value) => this.setState({ attainable: value }, this.verifyEditDiff)}

                relevant={relevant}
                setRelevant={(value) => this.setState({ relevant: value }, this.verifyEditDiff)}

                timeBound={timeBound}
                setTimeBound={(value) => this.setState({ timeBound: value }, this.verifyEditDiff)}
            />}
            OperationalComponent={<Operational
                isEdit={!!id}
                title={title}
                content={content}
                isEditDiff={isEditDiff}
                submitHandle={this.submitHandle}
                deleteHandle={this.deleteHandle}
                completedHandle={this.completedHandle}

                specific={specific}
                setSpecific={(value) => this.setState({ specific: value }, this.verifyEditDiff)}

                measurable={measurable}
                setMeasurable={(value) => this.setState({ measurable: value }, this.verifyEditDiff)}

                attainable={attainable}
                setAttainable={(value) => this.setState({ attainable: value }, this.verifyEditDiff)}

                relevant={relevant}
                setRelevant={(value) => this.setState({ relevant: value }, this.verifyEditDiff)}

                timeBound={timeBound}
                setTimeBound={(value) => this.setState({ timeBound: value }, this.verifyEditDiff)}

                longTermId={longTermId}
                longTermName={longTermName}
                selectLongTerm={this.selectLongTermHandle}

                deadlineTimestamp={deadlineTimestamp}
                setDeadline={this.setDeadlineHandle}

                tag={tag}
                setTag={this.setTagHandle}

                progress={progress}
                setProgress={this.setProgressHandle}

                priority={priority}
                setPriority={this.setPriorityHandle}
            />}
        />
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    root.className = 'windows'
    ReactDOM.render(<WindowsDetailComponent />, root)
}