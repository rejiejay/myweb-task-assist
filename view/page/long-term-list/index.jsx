import {
    getLongTermByPagination,
} from './../../service/long-term';

import Container from './components/container';
import Header from './components/header';
import Preview from './components/preview';
import List from './components/list';

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],

            pageNo: 1,
            count: 0,
        }

        this.isInitPreview = false
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const { isInitPreview } = this
        const { pageNo } = this.state
        const result = await getLongTermByPagination(pageNo, 9)
        if (result instanceof Error || !result) return

        this.setState({
            data: result.list,
            count: result.count,
        })
        if (!isInitPreview && result.list.length > 0) {
            this.isInitPreview = result.list[0].id
            this.refs.preview.initById(this.isInitPreview)
        }
    }

    clickItemHandle = (id) => {
        this.refs.preview.initById(id)
    }

    render() {
        const {
            data,
            pageNo,
            count,
        } = this.state

        return <Container
            HeaderComponent={
                <Header
                    addLongTermHandle={() => this.setState({ pageNo: 1 }, this.init)}
                />
            }
            ListComponent={
                <List
                    data={data}
                    pageNo={pageNo}
                    pageTotal={Math.ceil(count / 9)}
                    pageNoChangeHandle={pageNo => this.setState({ pageNo }, this.init)}
                    clickItemHandle={this.clickItemHandle}
                />
            }
            PreviewComponent={
                <Preview
                    ref='preview'
                    updateLongTerm={this.init}
                />
            }
        />
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system');
    root.className = 'windows'
    ReactDOM.render(<WebComponent />, root)
}
