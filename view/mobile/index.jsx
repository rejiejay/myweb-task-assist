import { EntryViewComponent } from './entry-view';
import { pages } from './const';
import Routes, { routeHashHistoryStack } from './routes';

class Mobile extends Routes {
    constructor(props) {
        super(props)
        this.state = {
            pageLocation: pages.entryView
        }

        this.defaultPageComponent = <EntryViewComponent />

        this.classifyFilterViewComponent = null

        this.taskPreviewComponent = null
        this.taskDetailComponent = null

        this.longTermSelectComponent = null
        this.longTermListComponent = null

        this.randomlyListComponent = null

        this.taskCompletedViewComponent = null
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.routeHashChangeHandle)
        window.addEventListener('popstate', this.routePopStateHandle)
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.routeHashChangeHandle)
        window.removeEventListener('popstate', this.routePopStateHandle)
    }

    componentDidUpdate(prevProps) {
        const { pageLocation } = this.props;

        if (pageLocation !== prevProps.pageLocation) {
            this.changePageIn(pageLocation)
        }
    }

    changePageIn = async (pageId) => {
        switch (pageId) {
            case pages.classifyFilterView:
                if (this.classifyFilterViewComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { ClassifyFilterViewComponent } = await import('./classify-filter-view')
                this.classifyFilterViewComponent = <ClassifyFilterViewComponent />
                this.setState({ pageLocation: pageId });
                break;

            case pages.taskPreview:
                if (this.taskPreviewComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { TaskPreviewComponent } = await import('./task-preview')
                this.taskPreviewComponent = <TaskPreviewComponent />
                this.setState({ pageLocation: pageId });
                break;
            case pages.taskDetail:
                if (this.taskDetailComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { TaskDetailComponent } = await import('./task-detail')
                this.taskDetailComponent = <TaskDetailComponent />
                this.setState({ pageLocation: pageId });
                break;

            case pages.longTermSelect:
                if (this.longTermSelectComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { LongTermSelectComponent } = await import('./long-term-select')
                this.longTermSelectComponent = <LongTermSelectComponent />
                this.setState({ pageLocation: pageId });
                break;
            case pages.longTermList:
                if (this.longTermListComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { LongTermListComponent } = await import('./long-term-list')
                this.longTermListComponent = <LongTermListComponent />
                this.setState({ pageLocation: pageId });
                break;

            case pages.randomlyList:
                if (this.randomlyListComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { RandomlyListComponent } = await import('./randomly-list')
                this.randomlyListComponent = <RandomlyListComponent />
                this.setState({ pageLocation: pageId });
                break;

            case pages.taskCompletedView:
                if (this.taskCompletedViewComponent) {
                    return this.setState({ pageLocation: pageId });
                }
                const { TaskCompletedViewComponent } = await import('./task-completed-view')
                this.taskCompletedViewComponent = <TaskCompletedViewComponent />
                this.setState({ pageLocation: pageId });
                break;

            default:
                this.setState({ pageLocation: pages.entryView })
                break;
        }
    }

    renderReLoadPage = () => {
        const { pageLocation } = this.state;

        if (pageLocation === pages.taskPreview) {
            return this.taskPreviewComponent;
        }

        if (pageLocation === pages.taskDetail) {
            return this.taskDetailComponent;
        }

        return <></>;
    }

    renderCachedPage = () => {
        const { pageLocation } = this.state;

        const isTaskItemView = pageLocation === pages.taskPreview || pageLocation === pages.taskDetail

        const isCachedLongTermSelect = routeHashHistoryStack.includes(pages.longTermSelect) && isTaskItemView
        const isCachedClassifyFilterView = routeHashHistoryStack.includes(pages.classifyFilterView) && isTaskItemView

        if (
            pageLocation === pages.longTermSelect ||
            isCachedLongTermSelect
        ) {
            return this.longTermSelectComponent;
        }

        if (pageLocation === pages.longTermList) {
            return this.longTermListComponent;
        }

        if (pageLocation === pages.taskCompletedView) {
            return this.taskCompletedViewComponent;
        }

        if (
            pageLocation === pages.classifyFilterView ||
            isCachedClassifyFilterView
        ) {
            return this.classifyFilterViewComponent;
        }

        if (pageLocation === pages.randomlyList) {
            return this.randomlyListComponent;
        }

        return this.defaultPageComponent;
    }

    render() {
        return <>
            {this.renderCachedPage()}
            {this.renderReLoadPage()}
        </>;
    }
}

const mapStateToProps = (state) => {
    const { navigation } = state

    return {
        isPreventHashChange: navigation.isPreventHashChange,
        pageLocation: navigation.pageLocationStatus
    }
}

export const MobileComponent = window.ReactRedux.connect(mapStateToProps)(Mobile)
