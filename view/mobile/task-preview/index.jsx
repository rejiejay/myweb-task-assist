import Container from './components/container';
import Header from './components/header';
import Main from './components/main';
import Filter from './components/filter';

import {
    goTaskDetailPage,
} from '../redux/action/navigation';

import {
    getTaskDetail,
} from '../../service/task';

export class TaskPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},

            longTermId: '',
            longTermName: '',
            deadlineTimestamp: '',
            tag: '',
            progress: '',
            priority: '',
        }
    }

    componentDidMount() {
        this.initHandle()
    }

    initHandle = async () => {
        const { id } = this.props
        const result = await getTaskDetail(id);
        if (result instanceof Error || !result) {
            return;
        }

        this.setState({
            data: result,
            longTermId: result.longTermId,
            longTermName: result.longTermName,
            deadlineTimestamp: result.deadlineTimestamp,
            tag: result.tag,
            progress: result.progress,
            priority: result.priority,
        })
    }

    render() {
        const { id, dispatch } = this.props
        const {
            data,

            longTermId,
            longTermName,
            deadlineTimestamp,
            tag,
            progress,
            priority,
        } = this.state

        return <Container
            goTaskDeatil={() => goTaskDetailPage({ id }, dispatch)}
            HeaderComponent={
                <Header progress={progress} />
            }
            MainComponent={
                <Main data={data} />
            }
            FilterComponent={
                <Filter
                    longTermId={longTermId}
                    longTermName={longTermName}
                    deadlineTimestamp={deadlineTimestamp}
                    tag={tag}
                    progress={progress}
                    priority={priority}
                />
            }
        />
    }
}

const mapStateToProps = (state) => {
    const { global } = state

    return {
        id: global.taskPreviewId
    }
}

export const TaskPreviewComponent = window.ReactRedux.connect(mapStateToProps)(TaskPreview)
