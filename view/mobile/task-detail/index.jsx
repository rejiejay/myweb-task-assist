import FunctionHelper from './../../../utils/function-helper';
import toast from './../../components/toast';
import actionSheet from './../../components/action-sheet';
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
import { getTags } from './../../service/task-tag';
import {
    stopHashChange,
    allowHashChange
} from './../redux/action/navigation';

import progress_const from './../../consts/progress';

import Container from './components/container';
import Header from './components/header';
import Main from './components/main';
import Filter from './components/filter';
import Operational from './components/operational';

export class TaskDetail extends React.Component {
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

            filterTags: [],
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
        this.initTags()
        this.initDetail()
    }

    componentDidUpdate(prevProps, prevState) {
        const { isEditDiff } = this.state
        const { dispatch } = this.props

        if (isEditDiff !== prevState.isEditDiff) {
            if (isEditDiff) {
                dispatch(stopHashChange)
            } else {
                dispatch(allowHashChange)
            }
        }
    }

    initTags = async () => {
        const result = await getTags()
        if (result instanceof Error || !result) {
            return
        }

        this.setState({ filterTags: result })
    }

    initDetail = async () => {
        const { id } = this.props

        if (!id) return

        const result = await getTaskDetail(id)
        if (result instanceof Error || !result) {
            return
        }

        this.initDataToStatus(result)
    }

    initDataToStatus = (result) => {
        const { dispatch } = this.props

        this.originTitle = result.title;
        this.originContent = result.content;

        this.originSpecific = result.specific;
        this.originMeasurable = result.measurable;
        this.originAttainable = result.attainable;
        this.originRelevant = result.attainable;
        this.originTimeBound = result.timeBound;

        dispatch(allowHashChange)
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

    setDeadlineHandle = async timestamp => {
        const { id } = this.state
        const result = await editTaskDeadline(id, timestamp)
        if (result instanceof Error) {
            return Confirm(result.message)
        }
        this.setState({ deadlineTimestamp: timestamp })
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

    addTagHandle = tag => {
        const { filterTags } = this.state

        this.setState({
            filterTags: [
                tag,
                ...filterTags
            ]
        })
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

    deleteHandle = async () => {
        const { dispatch } = this.props
        const { id } = this.state
        const confirmInstance = await Confirm('确定要删除吗?')
        if (confirmInstance.result !== 1) {
            return
        }

        dispatch(allowHashChange)
        const result = await deleteTask(id)
        if (result instanceof Error) {
            dispatch(stopHashChange)
            return Confirm(result.message)
        }

        window.history.back()
        window.history.back()
    }

    completedHandle = async () => {
        const { dispatch } = this.props
        const { id } = this.state
        const confirmInstance = await Confirm('确定要完成此任务吗?')
        if (confirmInstance.result !== 1) {
            return
        }

        dispatch(allowHashChange)
        const result = await completedTask(id)
        if (result instanceof Error) {
            dispatch(stopHashChange)
            return Confirm(result.message)
        }

        window.history.back()
        window.history.back()
    }

    selectProgressHandle = async () => {
        const options = Object.values(progress_const.values).map(value => ({
            value,
            label: progress_const.valueToLable[value]
        }))
        const title = '请选择任务状态'
        const isMultiple = false

        const result = await actionSheet({ title, options, isMultiple })
        if (result instanceof Error) return
        const progress = result.value
        this.setState({ progress })
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

            filterTags,
        } = this.state

        return <Container
            HeaderComponent={
                <Header
                    isEditDiff={isEditDiff}
                    progress={progress}
                    addTagHandle={this.addTagHandle}
                    selectProgressHandle={this.selectProgressHandle}
                />
            }
            MainComponent={
                <Main
                    title={title}
                    setTitle={(value) => this.setState({ title: value }, this.verifyEditDiff)}

                    identityTime={updateTimestamp || createTimestamp}

                    content={content}
                    setContent={(value) => this.setState({ content: value }, this.verifyEditDiff)}

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
                />
            }
            FilterComponent={
                <Filter
                    isEdit={!!id}

                    longTermId={longTermId}
                    longTermName={longTermName}
                    selectLongTerm={this.selectLongTermHandle}

                    deadlineTimestamp={deadlineTimestamp}
                    setDeadline={this.setDeadlineHandle}

                    tag={tag}
                    setTag={this.setTagHandle}
                    filterTags={filterTags}

                    progress={progress}
                    setProgress={this.setProgressHandle}
                    selectProgressHandle={this.selectProgressHandle}

                    priority={priority}
                    setPriority={this.setPriorityHandle}
                />
            }
            OperationalComponent={
                <Operational
                    isEdit={!!id}
                    title={title}
                    content={content}
                    isEditDiff={isEditDiff}
                    submitHandle={this.submitHandle}
                    deleteHandle={this.deleteHandle}
                    completedHandle={this.completedHandle}
                />
            }
        />
    }
}

const mapStateToProps = (state) => {
    const { global } = state

    return {
        id: global.taskDetailId
    }
}

export const TaskDetailComponent = window.ReactRedux.connect(mapStateToProps)(TaskDetail)
