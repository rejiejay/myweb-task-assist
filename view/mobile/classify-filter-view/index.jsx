import Container from './components/container';
import Header from './components/header';
import List from './components/list';
import BottomOperate from './components/bottom-operate';

import {
    goTaskDetailPage,
    goTaskPreview,
    goLongTermList,
} from '../redux/action/navigation';

import {
    getAllTaskByUnCategorized,
    getAllTaskByUpdateTimestamp,
    getAllTaskByReadCount,
    getAllTaskByTimestamp,
} from '../../service/task-list';

import { filterViewClassifys, quickRecalls } from './../const';

export class ClassifyFilterView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            count: 0,
            tag: '',
            progress: '',
            priority: '',
            data: [],
        }
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        this.clearFilter()
        this.initData()
    }

    clearFilter = () => {
        this.setState({
            pageNo: 1,
            tag: '',
            progress: '',
            priority: '',
        })
    }

    initData = () => {
        const {
            classifyFilterViewStatus,
            quickRecallType,
        } = this.props;

        if (classifyFilterViewStatus === filterViewClassifys.unCategorized) {
            this.initUnCategorizedData()
        }

        if (
            classifyFilterViewStatus === filterViewClassifys.quickRecall &&
            quickRecallType === quickRecalls.recently
        ) {
            this.initRecentlydData()
        }

        if (
            classifyFilterViewStatus === filterViewClassifys.quickRecall &&
            quickRecallType === quickRecalls.mostly
        ) {
            this.initMostlyData()
        }

        if (classifyFilterViewStatus === filterViewClassifys.deadline) {
            this.initTimeQuickClassifyData()
        }
    }

    initUnCategorizedData = async () => {
        const { pageNo, tag, progress, priority } = this.state;
        const result = await getAllTaskByUnCategorized(pageNo, tag, progress, priority);
        if (result instanceof Error) {
            return;
        }

        this.setState({
            count: result.count,
            data: result.list,
        })
    }

    initRecentlydData = async () => {
        const { pageNo, tag, progress, priority } = this.state;
        const result = await getAllTaskByUpdateTimestamp(pageNo, tag, progress, priority);
        if (result instanceof Error) {
            return;
        }

        this.setState({
            count: result.count,
            data: result.list,
        })
    }

    initMostlyData = async () => {
        const { pageNo, tag, progress, priority } = this.state;
        const result = await getAllTaskByReadCount(pageNo, tag, progress, priority);
        if (result instanceof Error) {
            return;
        }

        this.setState({
            count: result.count,
            data: result.list,
        })
    }

    initTimeQuickClassifyData = async () => {
        const { pageNo, tag, progress, priority } = this.state;
        const {
            classifyFilterViewMinTimestamp,
            classifyFilterViewMaxTimestamp,
        } = this.props;

        const result = await getAllTaskByTimestamp(
            classifyFilterViewMinTimestamp,
            classifyFilterViewMaxTimestamp,
            pageNo,
            tag,
            progress,
            priority
        );
        if (result instanceof Error) {
            return;
        }

        this.setState({
            count: result.count,
            data: result.list,
        })
    }

    setPageNoHandle = (newPageNo) => {
        this.setState({ pageNo: newPageNo }, () => this.initData())
    }

    selectItemHandle = (item) => {
        const { dispatch } = this.props;

        /**
         * 1. to long term detail list page
         * 2. to pre-view page
         */
        if (item.longTermId) {
            goLongTermList(item.longTermId, dispatch)
            goTaskPreview(item.id, dispatch)
            return;
        }

        goTaskPreview(item.id, dispatch)
    }

    setTagHandle = tag => {
        this.setState({ tag, pageNo: 1 }, () => this.initData())
    }

    setProgressHandle = progress => {
        this.setState({ progress, pageNo: 1 }, () => this.initData())
    }

    selectPriorityHnalde = priority => {
        this.setState({ priority, pageNo: 1 }, () => this.initData())
    }

    render() {
        const {
            pageNo,
            count,
            tag,
            progress,
            priority,
            data
        } = this.state;
        const { classifyFilterViewStatus, dispatch } = this.props;

        return <Container
            goAddTaskPage={() => goTaskDetailPage({ id: '' }, dispatch)}
            HeaderComponent={
                <Header
                    tag={tag}
                    setTag={this.setTagHandle}

                    progress={progress}
                    setProgress={this.setProgressHandle}

                    priority={priority}
                    setPriority={this.selectPriorityHnalde}
                />
            }
            ListComponent={
                <List
                    data={data}
                    selectHandle={this.selectItemHandle}
                    classifyFilterViewStatus={classifyFilterViewStatus}
                />
            }
            BottomComponent={
                <BottomOperate
                    pageNo={pageNo}
                    pageTotal={Math.ceil(count / 8)}
                    setPageNoHandle={this.setPageNoHandle}
                />
            }
        />
    }
}

const mapStateToProps = (state) => {
    const { global } = state

    return {
        classifyFilterViewStatus: global.classifyFilterViewStatus,
        quickRecallType: global.quickRecallType,
        classifyFilterViewMinTimestamp: global.classifyFilterViewMinTimestamp,
        classifyFilterViewMaxTimestamp: global.classifyFilterViewMaxTimestamp,
    }
}

export const ClassifyFilterViewComponent = window.ReactRedux.connect(mapStateToProps)(ClassifyFilterView)

