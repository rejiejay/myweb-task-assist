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
        const isHashChange = this.checkHashChange()
        if (isHashChange) {
            this.initLoadPageHash();
        } else {
            this.initPageData();
        }
        window.addEventListener("hashchange", this.initLoadPageHash.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.initLoadPageHash.bind(this));
    }

    checkHashChange() {
        const hashDisplayStyle = getDisplayStyleByLoadPageHash()
        const hashCategory = getCategoryByLoadPageHash()
        let isHashChange = false

        if (hashDisplayStyle && hashDisplayStyle.value !== this.state.displayStyle.value) {
            isHashChange = true
        }

        if (hashCategory && hashCategory.value !== this.state.category.value) {
            isHashChange = true
        }

        return isHashChange
    }

    initLoadPageHash() {
        const isHashChange = this.checkHashChange()
        if (!isHashChange) return

        const { displayStyle, category } = this.state
        const hashDisplayStyle = getDisplayStyleByLoadPageHash()
        const hashCategory = getCategoryByLoadPageHash()

        this.setState({
            displayStyle: hashDisplayStyle || displayStyle,
            category: hashCategory || category
        }, this.initPageData);
    }

    async initPageData() {
        const { category } = this.state
        const fetchInstance = await service.task.getTaskList(this.state.pageNo, category.value)
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
