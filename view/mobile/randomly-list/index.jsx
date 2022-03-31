import Container from './components/container';
import Header from './components/header';
import List from './components/list';

import ArrayHelper from '../../../utils/array-helper';

import {
    goTaskDetailPage,
    goTaskPreview,
    goLongTermList,
} from '../redux/action/navigation';

import {
    getRandomlyTasks,
} from '../../service/task-list';

export class RandomlyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNo: 1,
            count: 0,
        }
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const { pageNo, list } = this.state;
        const result = await getRandomlyTasks(pageNo);
        if (result instanceof Error) {
            return;
        }

        this.setState({
            count: result.count,
            list: ArrayHelper.uniqueDeduplicationByKey({ array: [...list, ...result.list], key: 'id' }),
        })
    }

    forceRefreshHandle = () => {
        this.setState({
            list: [],
            pageNo: 1,
            count: 0
        }, this.init)
    }

    loadMoreHandle = () => {
        const { pageNo } = this.state;
        this.setState({ pageNo: pageNo + 1 }, this.init)
    }

    selectHandle = (item) => {
        const { dispatch } = this.props

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

    render() {
        const { list, count } = this.state
        const { dispatch } = this.props

        return <Container
            goAddTaskPage={() => goTaskDetailPage({ id: '' }, dispatch)}
            HeaderComponent={
                <Header
                    forceRefreshHandle={this.forceRefreshHandle}
                />
            }
            ListComponent={
                <List
                    list={list}
                    loadMoreHandle={this.loadMoreHandle}
                    count={count}
                    selectHandle={this.selectHandle}
                />
            }
        />
    }
}

const mapStateToProps = (state) => ({})

export const RandomlyListComponent = window.ReactRedux.connect(mapStateToProps)(RandomlyList)
