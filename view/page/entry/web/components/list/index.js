import service from './../../../../../service';

import {
    default_display_style,
    getDisplayStyleByLoadPageHash,
    list,
    quadrant
} from './../../const/display-style';
import {
    default_category_options,
    getCategoryByLoadPageHash
} from './../../const/category-options';

import ListComponent from './list';
import QuadrantComponent from './quadrant';
import Pagination from './pagination';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pageNo: 1,
            pageTotal: 1,
            displayStyle: default_display_style,
            category: default_category_options,
        }
    }

    componentDidMount() {
        this.initLoadPageHash();
        window.addEventListener("hashchange", this.initLoadPageHash.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.initLoadPageHash.bind(this));
    }

    initLoadPageHash() {
        const displayStyle = getDisplayStyleByLoadPageHash()
        const category = getCategoryByLoadPageHash()

        if (
            displayStyle &&
            displayStyle.value !== this.state.displayStyle.value
        ) {
            this.setState({ displayStyle }, this.initPageData);
        }

        if (
            category &&
            category.value !== this.state.category.value
        ) {
            this.setState({ category }, this.initPageData);
        }
    }

    async initPageData() {
        const { displayStyle, category } = this.state
        const fetchInstance = await service.task.getTaskList(this.state.pageNo, displayStyle, category)
        if (fetchInstance.result !== 1) return
        const { count, list, pageNo } = fetchInstance.data

        this.setState({ data: list, pageNo, pageTotal: count })
    }

    render() {
        const { displayStyle, pageNo, pageTotal, data } = this.state

        let MainComponent = () => { }

        switch (displayStyle.value) {
            case list.value:
                MainComponent = ListComponent
                break;
            case quadrant.value:
                MainComponent = QuadrantComponent
                break;
            default:
                break;
        }

        return <div className="windows-list flex-column-center flex-rest noselect">
            <MainComponent data={data} />
            <Pagination pageNo={pageNo} pageTotal={pageTotal} />
        </div>
    }
}
