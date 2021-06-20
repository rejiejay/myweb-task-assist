import {
    default_display_style,
    getDisplayStyleByLoadPageHash
} from './../../const/display-style';
import {
    default_category_options,
    getCategoryByLoadPageHash
} from './../../const/category-options';
import ListComponent from './list';
import QuadrantComponent from './quadrant';

export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
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
            this.setState({ displayStyle });
        }

        if (
            category &&
            category.value !== this.state.category.value
        ) {
            this.setState({ category });
        }
    }

    render() {
        const { displayStyle } = this.state

        return <div className="windows-list flex-column flex-rest">
            <QuadrantComponent />
        </div>
    }
}
