import DropDownSelect from './../../../../../components/drop-down-select-tooltip';
import categoryOptions, {
    default_category_options,
    getCategoryByLoadPageHash
} from './../../const/category-options';
import { addQueryToPageHash } from './../../../../../utils/url-helper';

export default class CategoryFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: default_category_options
        };
    }

    componentDidMount() {
        this.initLoadPageHash();
    }

    initLoadPageHash() {
        const category = getCategoryByLoadPageHash()

        if (category) {
            this.setState({ category });
        }
    }

    filterHandle(category) {
        window.location.hash = addQueryToPageHash({ category: category.value });
        this.setState({ category });
    }

    render() {
        const { category } = this.state

        return <DropDownSelect
            options={categoryOptions}
            containerStyle={{ padding: 0 }}
            handle={this.filterHandle.bind(this)}
        >
            <div className="operat-item hover-item">{category.label}</div>
        </DropDownSelect>
    }
}
