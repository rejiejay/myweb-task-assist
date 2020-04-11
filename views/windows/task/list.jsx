import fetch from './../../../components/async-fetch/fetch.js';
import { getProcess } from './../../../components/process-task/index.jsx';

class ListComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [
                /** CONST.TASK.DEMO */
            ],

            selectedTaskId: null
        }

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth
    }

    async init() {
        await this.initExecutableTask()
    }

    async initExecutableTask() {
        const self = this
        const processTask = getProcess()
        const query = processTask.result === 1 ? {
            targetId: processTask.data.id
        } : {}

        await fetch.get({
            url: 'task/get/list/executable',
            query
        }).then(
            ({ data }) => self.setState({ list: data }),
            error => { }
        )
    }

    selectedTaskHandle(id) {
        const { selectedTaskId } = this.state
        if (id !== selectedTaskId) return this.setState({ selectedTaskId: id });
        this.props.selectedTaskHandle(id)
    }

    render() {
        const self = this
        const { list, selectedTaskId } = this.state
        const { isShow } = this.props
        const { clientHeight } = this
        let style = { minHeight: (clientHeight - 46 - 26 - 52) }
        !!!isShow ? style.display = 'none' : '';

        return <div className="list flex-column-center" style={style} >
            <div className="task-container flex-rest flex-column-center">
                <div className="task-float noselect">{list.map(({
                    id,
                    targetId,
                    title,
                    content,
                    conclusion,
                    measure,
                    span,
                    aspects,
                    worth,
                    estimate,
                    image,
                    putoffTimestamp,
                    completeTimestamp,
                    sqlTimestamp
                }, key) => <div className={`task-item ${selectedTaskId === id ? 'task-item-selected' : ''}`} key={key}>
                        <div className="task-item-container"
                            onClick={() => self.selectedTaskHandle(id)}
                        >
                            {selectedTaskId === id ? content : title}
                        </div>
                    </div>
                )}</div>
            </div>
        </div>
    }
}

export default ListComponent
