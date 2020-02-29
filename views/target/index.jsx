import { ProcessTask, getProcess, setProcess } from './../../components/process-task/index.jsx';
import serviceStorage from './../../components/service-storage/index';

import constHandle from './../../utils/const-handle.js';
import loadPageVar from './../../utils/load-page-var.js';
import consequencer from './../../utils/consequencer.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: CONST.REDIRECT.DEFAULTS.title,
            list: CONST.LIST
        }

        this.redirect = CONST.REDIRECT.DEFAULTS.value
    }

    componentDidMount() {
        this.initPageVar.call(this)
        this.initTitle()
        this.initList()
        this.initAutoNavigate()
    }

    initPageVar = () => this.redirect = loadPageVar('redirect')

    initTitle() {
        const title = constHandle.findValueByValue({
            CONST: CONST.REDIRECT,
            supportKey: 'value',
            supportValue: this.redirect,
            targetKey: 'title'
        })

        if (title) this.setState({ title })
    }

    async initList() {
        const allTargetInstance = await serviceStorage.getItem({
            key: 'allTarget',
            isArray: true
        }).then(
            res => consequencer.success(res),
            msg => consequencer.error(msg)
        )

        if (allTargetInstance.result === 1) this.setState({
            list: allTargetInstance.data
        });
    }

    initAutoNavigate() {
        const processInstance = getProcess()
        if (processInstance.result !== 1) return /** 含义: 加载失败缓存 */
        const { id, name } = processInstance.data
        this.navigateBy(id)
    }

    keepProcessTargetHandle({ id, name }) {
        setProcess({ id, name })
        this.navigateBy(id)
    }

    navigateBy(targetId) {
        const url = constHandle.findValueByValue({
            CONST: CONST.REDIRECT,
            supportKey: 'value',
            supportValue: this.redirect,
            targetKey: 'url'
        })

        window.location.replace(`${url}?targetId=${targetId}`)
    }

    render() {
        const self = this
        const { title, list } = this.state

        return [
            <ProcessTask></ProcessTask>,

            <div className="target-title">{title}</div>,

            <div className="list">{!!list && list.map(({ id, name }, key) => (
                <div class="list-item" key={key}>
                    <div class="list-item-container"
                        onClick={() => self.keepProcessTargetHandle({ id, name })}
                    >{name}</div>
                </div>
            ))}</div>,

            <div className="operational">
                <div className="operational-item">
                    <div className="item-container"
                        onClick={() => window.location.href = './json-config/index.html'}
                    >新增编辑计划?</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
