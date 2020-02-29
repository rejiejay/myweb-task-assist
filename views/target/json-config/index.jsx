import toast from './../../../components/toast.js'
import serviceStorage from './../../../components/service-storage/index.js'

import jsonHandle from './../../../utils/json-handle.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: CONST.TARGET.DEFAULT
        }
        this.setState
    }

    componentDidMount() {
        this.initData()
    }

    initData() {
        const self = this

        serviceStorage.getItem({
            key: 'allTarget',
            hiddenError: true
        }).then(
            res => self.setState({ input: JSON.stringify(res) }),
            error => { }
        )
    }

    inputHandle = ({ target: { value } }) => this.setState({ input: value })

    verify() {
        const { input } = this.state
        return jsonHandle.verifyJSONString({
            jsonString: input,
            isArray: true
        })
    }

    submitHandle() {
        const verify = this.verify()
        if (verify.isCorrect === false) return toast.show(verify.msg);

        serviceStorage.setItem({
            key: 'allTarget',
            value: verify.data
        }).then(
            res => toast.show('update successful'),
            error => { }
        )
    }

    formatInput() {
        const verify = this.verify()
        if (verify.isCorrect === false) return toast.show(`无法插入模板${verify.msg}`);

        const data = verify.data

        // 格式化
        let valueFormat = '[\n'
        const lastKey = (data.length > 0) ? data.length - 1 : 0
        data.map((item, key) => {
            valueFormat += JSON.stringify(item)
            valueFormat += (key === lastKey) ? '\n' : ',\n'
        })
        valueFormat += ']'

        this.setState({ input: valueFormat })

        return {
            jsonValue: data,
            stringValue: valueFormat
        }
    }

    addTemplateHandle() {
        const verify = this.verify()
        if (verify.isCorrect === false) return toast.show(`无法插入模板${verify.msg}`);

        let { jsonValue, stringValue } = this.formatInput()

        let handleString = stringValue.substring(0, stringValue.length - 1);

        if (jsonValue.length > 0) {
            handleString += ',\n'
        }
        handleString += CONST.TARGET.FORMAT
        handleString += '\n]'

        this.setState({ input: handleString })
    }

    render() {
        const { input } = this.state

        return (
            <div class="rejiejay flex-column-center">

                <textarea class="textarea-input flex-rest"
                    value={input}
                    onChange={this.inputHandle.bind(this)}
                ></textarea>

                <div class="button">
                    <div class="flex-start-center">
                        <span></span>
                        <button class="button-item flex-rest"
                            onClick={this.submitHandle.bind(this)}
                        >提交</button>
                        <span></span>
                        <button class="button-item flex-rest"
                            onClick={this.addTemplateHandle.bind(this)}
                        >新增模板</button>
                        <span></span>
                        <button class="button-item flex-rest"
                            onClick={this.formatInput.bind(this)}
                        >格式化</button>
                        <span></span>
                    </div>
                </div>
            </div>
        )
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
