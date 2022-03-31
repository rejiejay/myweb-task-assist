import Container from './components/container';
import Header from './components/header';
import List from './components/list';
import BottomOperate from './components/bottom-operate';

import {
    goTaskPreview,
} from '../redux/action/navigation';

import {
    getCompletedTasks,
} from '../../service/task-list';

export class TaskCompletedView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            count: 0,
            data: []
        }
    }

    componentDidMount() {
        this.init()
    }

    init = async () => {
        const { pageNo } = this.state;
        const result = await getCompletedTasks(pageNo);
        if (result instanceof Error) {
            return;
        }

        this.setState({
            count: result.count,
            data: result.list,
        })
    }

    setPageNoHandle = (newPageNo) => {
        this.setState({ pageNo: newPageNo }, () => this.init())
    }

    render() {
        const {
            pageNo,
            count,
            data
        } = this.state;
        const { dispatch } = this.props;

        return <Container
            HeaderComponent={
                <Header />
            }
            ListComponent={
                <List
                    data={data}
                    selectHandle={item => goTaskPreview(item.id, dispatch)}
                />
            }
            BottomComponent={
                <BottomOperate
                    pageNo={pageNo}
                    pageTotal={Math.ceil(count / 8)}
                    setPageNoHandle={this.setPageNoHandle}
                />
            }
        />
    }
}

const mapStateToProps = (state) => ({})

export const TaskCompletedViewComponent = window.ReactRedux.connect(mapStateToProps)(TaskCompletedView)


