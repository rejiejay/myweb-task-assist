import serviceStorage from './../../../components/service-storage/index.js'
import { confirmPopUp } from './../../../components/confirm-popup.js';

import CONST from './const.js'
import toast from '../../../components/toast.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [
                // CONST.TEMPLATE.DEFAULTS
            ],

            status: CONST.PAGE_STATUS.DEFAULTS,
            selectIndex: '0',

            templateName: '',
            title: null,
            content: null,
            measure: null,
            span: null,
            aspects: null,
            worth: null,
            estimate: null
        }
    }

    async componentDidMount() {
        await this.initDate()
    }

    async initDate() {
        const self = this

        await serviceStorage.getItem({
            key: 'todoTaskTemplate',
            hiddenError: true
        }).then(
            data => self.setState({ list: data }),
            error => { }
        )
    }

    saveHandle = async list => await serviceStorage.setItem({
        key: 'todoTaskTemplate',
        value: list
    })

    async addHandle() {
        const self = this
        const {
            list,
            templateName,
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = this.state

        if (!templateName) return toast.show('模板名称不能为空')
        if (!title) return toast.show('模板标题不能为空')
        if (!content) return toast.show('模板内容不能为空')

        let newList = list.concat({
            name: templateName,
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        })

        const saveInstance = await self.saveHandle(newList)

        if (saveInstance.result === 1) {
            this.setState({
                status: CONST.PAGE_STATUS.DEFAULTS,
                list: newList
            });
            toast.show('保存成功!');
        }
    }

    selectedHandle() {
        const {
            list,
            selectIndex,
        } = this.state
        const {
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = list[+selectIndex]

        window.localStorage.setItem('task-todo-template', JSON.stringify({
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        }))

        window.location.replace('./../edit/index.html')
    }

    showEditHandle() {
        const { list, selectIndex } = this.state
        const selectTemplate = list[+selectIndex]

        this.setState({
            status: CONST.PAGE_STATUS.EDIT,
            templateName: selectTemplate.name,
            title: selectTemplate.title,
            content: selectTemplate.content,
            measure: selectTemplate.measure,
            span: selectTemplate.span,
            aspects: selectTemplate.aspects,
            worth: selectTemplate.worth,
            estimate: selectTemplate.estimate
        })
    }

    async editSubmitHandle() {
        const self = this
        const {
            list,
            selectIndex,

            templateName,
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = this.state

        if (!templateName) return toast.show('模板名称不能为空')
        if (!title) return toast.show('模板标题不能为空')
        if (!content) return toast.show('模板内容不能为空')

        let newList = list.concat([])
        newList[+selectIndex] = {
            name: templateName,
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        }

        const saveInstance = await self.saveHandle(newList)

        if (saveInstance.result === 1) {
            this.setState({
                status: CONST.PAGE_STATUS.DEFAULTS,
                list: newList
            });
            toast.show('编辑成功!');
        }
    }

    deleteEditHandle() {
        const self = this
        const {
            list,
            selectIndex
        } = this.state

        const handle = async () => {
            let newList = list.filter((item, key) => key !== +selectIndex)

            const saveInstance = await self.saveHandle(newList)

            if (saveInstance.result === 1) {
                self.setState({
                    status: CONST.PAGE_STATUS.DEFAULTS,
                    list: newList
                });
                toast.show('成功删除!');
            }
        }

        confirmPopUp({
            title: `确认要删除模板?`,
            succeedHandle: handle
        })
    }

    render() {
        const self = this
        const {
            status,
            list,
            selectIndex,

            templateName,
            title,
            content,
            measure,
            span,
            aspects,
            worth,
            estimate
        } = this.state

        const selectTemplate = (selectIndex && list[+selectIndex]) ? list[+selectIndex] : false;

        return [
            status === CONST.PAGE_STATUS.DEFAULTS && <div className="list">
                <div className="list-container">{list.map((item, key) =>
                    <div className="item"
                        key={key}
                        onClick={() => self.setState({
                            status: CONST.PAGE_STATUS.SHOW,
                            selectIndex: `${key}`
                        })}
                    >{item.name}</div>
                )}
                </div>

                <div className="operating">
                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={() => window.location.replace('./../edit/index.html')}
                        >不需要模板</div>
                    </div>
                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={() => self.setState({ status: CONST.PAGE_STATUS.ADD })}
                        >新增模板</div>
                    </div>
                </div>
            </div>,

            status === CONST.PAGE_STATUS.SHOW && selectTemplate && <div className="show">
                <div className="template">
                    <div className="template-title flex-center">《{selectTemplate.name}》</div>
                    <div className="template-container">
                        {selectTemplate.title && <div className="template-description">任务标题:</div>}
                        {selectTemplate.title && <div className="item title">{selectTemplate.title}</div>}
                        {selectTemplate.content && <div className="template-description">任务内容:</div>}
                        {selectTemplate.content && <div className="item content">{selectTemplate.content}</div>}
                        {selectTemplate.measure && <div className="template-description">衡量任务完成的标准?</div>}
                        {selectTemplate.measure && <div className="item measure">{selectTemplate.measure}</div>}
                        {selectTemplate.span && <div className="template-description">长时间跨度下这任务的意义?</div>}
                        {selectTemplate.span && <div className="item span">{selectTemplate.span}</div>}
                        {selectTemplate.aspects && <div className="template-description">任务影响涉及到哪些方面?</div>}
                        {selectTemplate.aspects && <div className="item aspects">{selectTemplate.aspects}</div>}
                        {selectTemplate.worth && <div className="template-description">任务的本质是为了什么?</div>}
                        {selectTemplate.worth && <div className="item worth">{selectTemplate.worth}</div>}
                        {selectTemplate.estimate && <div className="template-description">是否必须完成?何时?</div>}
                        {selectTemplate.estimate && <div className="item estimate">{selectTemplate.estimate}</div>}
                    </div>
                </div>

                <div className="operating">
                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={self.selectedHandle.bind(self)}
                        >使用模板</div>
                    </div>
                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={self.showEditHandle.bind(self)}
                        >编辑模板</div>
                    </div>
                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={self.deleteEditHandle.bind(self)}
                        >删除模板</div>
                    </div>
                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={() => self.setState({
                                status: CONST.PAGE_STATUS.DEFAULTS,
                                selectIndex: null,
                                title: null,
                                content: null,
                                measure: null,
                                span: null,
                                aspects: null,
                                worth: null,
                                estimate: null
                            })}
                        >取消</div>
                    </div>
                </div>
            </div>,

            (status === CONST.PAGE_STATUS.EDIT || (status === CONST.PAGE_STATUS.ADD)) && <div className='edit'>
                <div class="edit-container">
                    <div class="edit-title edit-required">*模板标题:</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="模板标题"
                            value={templateName}
                            onChange={({ target: { value } }) => this.setState({ templateName: value })}
                        />
                    </div>
                    <div class="edit-title edit-required">*简单描述/提问:</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="简单描述/提问"
                            value={title}
                            onChange={({ target: { value } }) => this.setState({ title: value })}
                        />
                    </div>
                    <div class="edit-title edit-required">*任务具体内容是什么:</div>

                    <div class="edit-input flex-start-center">
                        <textarea rows="5" type="text" placeholder="任务具体内容是什么"
                            value={content}
                            onChange={({ target: { value } }) => this.setState({ content: value })}
                        ></textarea>
                    </div>

                    <div class="edit-title">衡量任务完成的标准?</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="衡量任务完成的标准"
                            value={measure}
                            onChange={({ target: { value } }) => this.setState({ measure: value })}
                        />
                    </div>

                    <div class="edit-title">长时间跨度下这任务的意义?</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="长时间跨度下这任务的意义"
                            value={span}
                            onChange={({ target: { value } }) => this.setState({ span: value })}
                        />
                    </div>

                    <div class="edit-title">任务影响涉及到哪些方面?好处?</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="任务影响涉及到哪些方面?好处?"
                            value={aspects}
                            onChange={({ target: { value } }) => this.setState({ aspects: value })}
                        />
                    </div>

                    <div class="edit-title">任务的本质是为了什么?</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="任务的本质是为了什么"
                            value={worth}
                            onChange={({ target: { value } }) => this.setState({ worth: value })}
                        />
                    </div>

                    <div class="edit-title">是否必须完成?何时?</div>
                    <div class="edit-input flex-start-center">
                        <input type="text" placeholder="是否必须完成"
                            value={estimate}
                            onChange={({ target: { value } }) => this.setState({ estimate: value })}
                        />
                    </div>
                </div>

                <div className="operating">
                    {status === CONST.PAGE_STATUS.ADD && <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={self.addHandle.bind(self)}
                        >新增</div>
                    </div>}

                    {status === CONST.PAGE_STATUS.EDIT && <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={self.editSubmitHandle.bind(self)}
                        >编辑</div>
                    </div>}

                    <div className="operating-button">
                        <div className="button-container flex-center"
                            onClick={() => self.setState({
                                status: CONST.PAGE_STATUS.DEFAULTS,
                                selectIndex: null,
                                title: null,
                                content: null,
                                measure: null,
                                span: null,
                                aspects: null,
                                worth: null,
                                estimate: null
                            })}
                        >取消</div>
                    </div>
                </div>
            </div>,
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
