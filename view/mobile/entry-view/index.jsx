import TermListItemCard, { RefreshIcon, SwitchIcon } from '../../components/page/term-list-item-card';

import { switchQuickRecallType } from '../redux/action/global';
import {
    goTaskDetailPage,
    goLongTermSelectPage,
    goRandomlyListPage,
    goCompleteListPage,
    goUncategorizedView,
    goTaskPreview,
    goLongTermList,
    goQuickRecallView,
    goTimeClassifyView,
} from '../redux/action/navigation';

import {
    getAllTaskByUnCategorized,
    getPreviewTaskByQuickRecall,
    getPreviewTaskByQuickTimeClassify,
} from '../../service/task-list';

import { quickRecalls } from '../const';

import Container from './components/container';
import Header from './components/header';

export class EntryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unCategorizedCount: 0,
            allCount: 0,
            unCategorizedQuickViewList: [],
            recentlyQuickViewList: [],
            mostlyQuickViewList: [],
            timeQuickClassifyViewList: []
        }
    }

    componentDidMount() {
        this.initHandle()
    }

    initHandle = () => {
        const self = this

        const initUnCategorized = async () => {
            const result = await getAllTaskByUnCategorized();
            if (result instanceof Error) {
                return;
            }

            self.setState({
                unCategorizedCount: result.count,
                unCategorizedQuickViewList: result.list,
            })
        }
        const initQuickRecall = async () => {
            const result = await getPreviewTaskByQuickRecall();
            if (result instanceof Error) {
                return;
            }

            self.setState({
                allCount: result.count,
                recentlyQuickViewList: result.recently,
                mostlyQuickViewList: result.mostly,
            })
        }
        const initQuickTimeClassify = async () => {
            const result = await getPreviewTaskByQuickTimeClassify();
            if (result instanceof Error) {
                return;
            }

            self.setState({
                timeQuickClassifyViewList: result,
            })
        }

        initUnCategorized();
        initQuickRecall();
        initQuickTimeClassify();
    }

    /**
     * 1. to uncategorized list page
     * 2. to pre-view page
     */
    uncategorizedClickHandle = (item) => {
        const { dispatch } = this.props
        goUncategorizedView(dispatch)
        goTaskPreview(item.id, dispatch)
    }

    quickRecallClickHandle = (item) => {
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

        /**
         * 1. to mostly or recently list page
         * 2. to pre-view page
         */
        goQuickRecallView(dispatch)
        goTaskPreview(item.id, dispatch)
    }

    /**
     * 1. to time range list page
     * 2. to pre-view page
     */
    timeClassifyItemClickHandle = (item, minTimestamp, maxTimestamp) => {
        const { dispatch } = this.props
        goTimeClassifyView(dispatch, minTimestamp, maxTimestamp)
        goTaskPreview(item.id, dispatch)
    }

    render() {
        const {
            dispatch,
            quickRecallType,
        } = this.props

        const {
            unCategorizedQuickViewList,
            timeQuickClassifyViewList,
            recentlyQuickViewList,
            mostlyQuickViewList,
            unCategorizedCount,
            allCount
        } = this.state

        return <Container
            goAddTaskPage={() => goTaskDetailPage({ id: '' }, dispatch)}
            HeaderComponent={
                <Header
                    goLongTermSelectPage={() => dispatch(goLongTermSelectPage({ longTermId: '' }))}
                    goRandomlyListPage={() => dispatch(goRandomlyListPage())}
                    goCompleteListPage={() => dispatch(goCompleteListPage())}
                />
            }
            UnCategorizedItemComponent={
                <TermListItemCard
                    key='un-categorized-item'
                    title={`未分类 - ${unCategorizedCount}`}
                    TitleIcon={<div className='term-item-icon flex-center'
                        onClick={this.initHandle}
                    ><RefreshIcon /></div>}
                    titleClick={() => goUncategorizedView(dispatch)}
                    subItem={unCategorizedQuickViewList}
                    subItemClick={this.uncategorizedClickHandle}
                />
            }
            QuickRecallItemComponent={
                <TermListItemCard
                    key='quick-recall-item'
                    title={`${quickRecallType === quickRecalls.recently ? '最近' : '最多'}浏览 - ${allCount}`}
                    titleClick={() => goQuickRecallView(dispatch)}
                    TitleIcon={<div className='term-item-icon flex-center'
                        onClick={() => dispatch(
                            switchQuickRecallType(quickRecallType === quickRecalls.recently ? quickRecalls.mostly : quickRecalls.recently)
                        )}
                    ><SwitchIcon /></div>}
                    subItem={quickRecallType === quickRecalls.recently ? recentlyQuickViewList : mostlyQuickViewList}
                    subItemClick={this.quickRecallClickHandle}
                />
            }
            TimeClassifyItemComponent={timeQuickClassifyViewList.map((time, key) =>
                <TermListItemCard
                    key={`time-classify-${key}`}
                    title={time.title}
                    titleClick={() => goTimeClassifyView(dispatch, time.minTimestamp, time.maxTimestamp)}
                    subItem={time.data}
                    subItemClick={(subItem) => this.timeClassifyItemClickHandle(subItem, time.minTimestamp, time.maxTimestamp)}
                />
            )}
        />
    }
}

const mapStateToProps = (state) => {
    const { global } = state

    return {
        quickRecallType: global.quickRecallType
    }
}

export const EntryViewComponent = window.ReactRedux.connect(mapStateToProps)(EntryView)
