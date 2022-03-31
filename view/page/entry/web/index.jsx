import {
    getAllTaskByUnCategorized,
    getAllTaskByUpdateTimestamp,
    getAllTaskByReadCount,
    getAllTaskByTimestamp,
    getRandomlyTasks,
    getPreviewTaskByQuickTimeClassify,
} from '../../../service/task-list';

import Container from './components/container';
import Header from './components/header';
import Preview from './components/preview';
import Classification from './components/classification';
import List from './components/list';

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],

            pageNo: 1,
            count: 0,
            unClassifyCount: 0,
            recentlyCount: 0,
            mostlyCount: 0,

            /**
             * un-classify | recently | mostly | randomly | withInTimestamp
             */
            classifySelected: 'un-classify',

            minTimestamp: null,
            maxTimestamp: null,
            timestampStatistics: [],

            tag: '',
            progress: '',
            priority: '',
        }
    }

    componentDidMount() {
        this.init();
        this.initTimestampStatistics();
    }

    initTimestampStatistics = async () => {
        const result = await getPreviewTaskByQuickTimeClassify();
        if (result instanceof Error) {
            return;
        }

        this.setState({
            timestampStatistics: result,
        })
    }

    init = () => {
        const self = this
        const {
            pageNo,
            tag,
            progress,
            priority,
            classifySelected,
            minTimestamp,
            maxTimestamp,
        } = this.state

        const initUnCategorized = async () => {
            const result = await getAllTaskByUnCategorized(pageNo, tag, progress, priority, 9);
            if (result instanceof Error) return

            self.setState({
                data: result.list,
                unClassifyCount: result.count,
                count: result.count,
            })
        }

        const initRecently = async () => {
            const result = await getAllTaskByUpdateTimestamp(pageNo, tag, progress, priority, 9);
            if (result instanceof Error) return

            self.setState({
                data: result.list,
                recentlyCount: result.count,
                count: result.count,
            })
        }

        const initMostly = async () => {
            const result = await getAllTaskByReadCount(pageNo, tag, progress, priority, 9);
            if (result instanceof Error) return

            self.setState({
                data: result.list,
                mostlyCount: result.count,
                count: result.count,
            })
        }

        const initRandomly = async () => {
            const result = await getRandomlyTasks();
            if (result instanceof Error) return

            self.setState({ data: result.list })
        }

        const initTimestamp = async () => {
            const result = await getAllTaskByTimestamp(minTimestamp,
                maxTimestamp,
                pageNo,
                tag,
                progress,
                priority,
                9
            );
            if (result instanceof Error) return

            self.setState({ data: result.list, count: result.count })
        }

        if (classifySelected === 'un-classify') {
            return initUnCategorized()
        }

        if (classifySelected === 'recently') {
            return initRecently()
        }

        if (classifySelected === 'mostly') {
            return initMostly()
        }

        if (classifySelected === 'randomly') {
            return initRandomly()
        }

        initTimestamp()
    }

    clickItemHandle = (id) => {
        this.refs.preview.initById(id)
    }

    setClassifySelectedHandle = id => {
        this.setState({
            pageNo: 1,
            classifySelected: id,
        }, this.init)
    }

    selectTimeStatisticsHandle = time => {
        this.setState({
            pageNo: 1,
            classifySelected: time.title,
            minTimestamp: time.minTimestamp || null,
            maxTimestamp: time.maxTimestamp || null,
        }, this.init)
    }

    setTagHandle = tag => {
        this.setState({
            tag,
            pageNo: 1,
        }, this.init)
    }

    setProgressHandle = progress => {
        this.setState({
            progress,
            pageNo: 1,
        }, this.init)
    }

    setPriorityHandle = priority => {
        this.setState({
            priority,
            pageNo: 1,
        }, this.init)
    }

    render() {
        const {
            data,
            pageNo,
            count,

            tag,
            progress,
            priority,

            unClassifyCount,
            recentlyCount,
            mostlyCount,
            classifySelected,

            timestampStatistics
        } = this.state

        return <Container
            HeaderComponent={<Header
                tag={tag}
                setTag={this.setTagHandle}
                priority={priority}
                setPriority={this.setPriorityHandle}
                progress={progress}
                setProgress={this.setProgressHandle}
            />}
            ClassificationComponent={<Classification
                unClassifyCount={unClassifyCount}
                recentlyCount={recentlyCount}
                mostlyCount={mostlyCount}
                classifySelected={classifySelected}
                setClassifySelected={this.setClassifySelectedHandle}
                timestampStatistics={timestampStatistics}
                selectTimeStatistics={this.selectTimeStatisticsHandle}
            />}
            ListComponent={<List
                data={data}
                pageNo={pageNo}
                pageTotal={Math.ceil(count / 9)}
                clickItemHandle={this.clickItemHandle}
                randomHandle={() => this.setState({ pageNo: 1, count: 9, classifySelected: 'randomly', }, this.init)}
                pageNoChangeHandle={pageNo => this.setState({ pageNo }, this.init)}
            />}
            PreviewComponent={<Preview ref='preview' />}
        />
    }
}
