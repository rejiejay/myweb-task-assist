import Container from './components/container';
import Preview from './components/preview';
import List from './components/list';

import { getCompletedTasks } from '../../service/task-list';

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pageNo: 1,
            count: 0,
        }
    }

    async componentDidMount() {
        await this.init();
        this.initPreview()
    }

    init = () => new Promise(async (resolve, reject) => {
        const { pageNo } = this.state
        const result = await getCompletedTasks(pageNo);
        if (result instanceof Error) return reject(result)

        this.setState({
            data: result.list,
            count: result.count,
        }, resolve)
    }).catch(error => error)

    clickItemHandle = (id) => {
        this.refs.preview.initById(id)
    }

    initPreview = async () => {
        const { data } = this.state
        if (data.length > 0) {
            this.clickItemHandle(data[0].id)
        }
    }

    render() {
        const {
            data,
            pageNo,
            count,
        } = this.state

        return <Container
            ListComponent={<List
                data={data}
                pageNo={pageNo}
                pageTotal={Math.ceil(count / 9)}
                clickItemHandle={this.clickItemHandle}
                pageNoChangeHandle={pageNo => this.setState({ pageNo }, this.init)}
            />}
            PreviewComponent={<Preview ref='preview' />}
        />
    }
}

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system');
    root.className = 'windows'
    ReactDOM.render(<WebComponent />, root)
}
