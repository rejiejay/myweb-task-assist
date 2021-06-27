import toast from './../../../components/toast';
import Modal from './../../../components/modal';

import Container from './components/container';
import Operation from './components/operation';
import Header from './components/header';
import List from './components/list';

export class WebComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    addTaskHandle = () => {
        toast.show()
        import('./add-task/index.js').then(async ({ WebAddTask }) => {
            toast.destroy()

            const webAddTask = new Modal(WebAddTask);
            const result = await webAddTask.show();

            if (result instanceof Error) return

            this.refs.list.initPageData();
        })
    }

    clickTaskHandle = id => {
        if (!id) return
        this.refs.operation.initTaskById(id);
    }

    render() {
        return <Container
            OperationComponent={
                <Operation ref='operation' />
            }
        >
            <Header addTaskHandle={this.addTaskHandle} />
            <List ref="list" clickTaskHandle={this.clickTaskHandle} />
        </Container>
    }
}
