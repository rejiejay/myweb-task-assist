import login from './../../components/login.js';
import toast from './../../components/toast.js'
import { setProcess } from './../../components/process-task/index.jsx';
import serviceStorage from './../../components/service-storage/index.js'

import deviceDiffer from './../../utils/device-differ.js'
import loadPageVar from './../../utils/load-page-var.js'
import consequencer from './../../utils/consequencer.js'

import CONST from './const.js';

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    async componentDidMount() {
        await login()
        this.initRedirect()
    }

    redirectErrorHandle() {
        const type = loadPageVar('type')
        const id = loadPageVar('id')

        toast.show(`获取数据有误:[type:${type}][id:${id}]`)
        setTimeout(
            () => window.location.replace("./../index.html"),
            5000
        )
    }

    initRedirect() {
        const type = loadPageVar('type')
        const id = loadPageVar('id')

        if (!type || !id) return this.redirectErrorHandle()

        if (type === CONST.TYPE.TASK_LIST.value) return this.redirectTaskList(id)
    }

    async redirectTaskList(task) {
        const allTargetInstance = await serviceStorage.getItem({
            key: 'allTarget',
            isArray: true
        }).then(
            res => consequencer.success(res),
            msg => consequencer.error(msg)
        )
        if (allTargetInstance.result !== 1) return this.redirectErrorHandle()

        const isInclude = allTargetInstance.data.filter(({ id, name }) => id == task)
        if (isInclude.length > 0) {
            setProcess(isInclude[0])
            const isMobileDevice = deviceDiffer()
            window.location.replace(isMobileDevice ? './../todo/list/index.html' : './../windows/task/index.html')
        } else {
            this.redirectErrorHandle()
        }
    }

    render() {
        return (<div className="redirect"></div>)
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
