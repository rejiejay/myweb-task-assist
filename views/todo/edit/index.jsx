class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        const self = this
        const { } = this.state

        return [
            <div class="edit">
                <div class="edit-title edit-required">*简单描述/提问:</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="简单描述/提问" id="edit-title" />
                </div>
                <div class="edit-title edit-required">*任务具体内容是什么:</div>

                <div class="edit-input flex-start-center">
                    <textarea rows="5" type="text" placeholder="任务具体内容是什么" id="edit-content"></textarea>
                </div>

                <div class="edit-title">衡量任务完成的标准?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="衡量任务完成的标准" id="edit-measure" />
                </div>

                <div class="edit-title">长时间跨度下这任务的意义?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="长时间跨度下这任务的意义" id="edit-span" />
                </div>

                <div class="edit-title">任务影响涉及到哪些方面?好处?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="任务影响涉及到哪些方面?好处?" id="edit-aspects" />
                </div>

                <div class="edit-title">任务的本质是为了什么?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="任务的本质是为了什么" id="edit-worth" />
                </div>

                <div class="edit-title">是否必须完成?何时?</div>
                <div class="edit-input flex-start-center">
                    <input type="text" placeholder="是否必须完成" id="edit-estimate" />
                </div>

                <div class="edit-title">是否需要推迟完成?</div>
                <div class="edit-input flex-start-center">
                    <input readonly type="text" id="picka-date" placeholder="推迟?" />
                    <div class="picka-clear flex-center">取消</div>
                </div>

                <div class="edit-title">得出什么结论?</div>

                <div class="edit-input flex-start-center">
                    <textarea rows="5" type="text" placeholder="结论" id="edit-conclusion"></textarea>
                </div>
            </div>,

            <div class="operation">
                <div class="operation-container flex-start-center">
                    <div class="operation-button flex-center flex-rest" id="edit-confirm">保存</div>
                    <div class="vertical-line"></div>
                    <div class="operation-button flex-center flex-rest" id="edit-complete">done</div>
                    <div class="vertical-line"></div>
                    <div class="operation-button flex-center flex-rest" id="edit-delete">取消/删除</div>
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
