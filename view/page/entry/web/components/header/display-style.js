import {
    list,
    quadrant,
    getDisplayStyleByLoadPageHash
} from './../../const/display-style';
import { addQueryToPageHash } from './../../../../../utils/url-helper';

export default class DisplayStyleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayStyle: list
        };
    }

    componentDidMount() {
        this.initLoadPageHash();
    }

    initLoadPageHash() {
        const displayStyle = getDisplayStyleByLoadPageHash()

        if (displayStyle) {
            this.setState({ displayStyle });
        }
    }

    switchDisplayStyle() {
        const { displayStyle } = this.state

        let newDisplayStyle = list
        if (displayStyle.value === list.value) {
            newDisplayStyle = quadrant
        }

        this.setState({ displayStyle: newDisplayStyle })
        window.location.hash = addQueryToPageHash({ displayStyle: newDisplayStyle.value });
    }

    render() {
        const { displayStyle } = this.state

        return <div className="operat-item hover-item"
            onClick={this.switchDisplayStyle.bind(this)}
        >{displayStyle.label}</div>
    }
}
