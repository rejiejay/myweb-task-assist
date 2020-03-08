import fetch from './../../../components/async-fetch/fetch.js'
import toast from './../../../components/toast.js'
import { getProcess } from './../../../components/process-task/index.jsx';
import { confirmPopUp } from './../../../components/confirm-popup.js';

import CONST from './const.js'

class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        this.state = {
            data: CONST.TASK.DEFAULTS,
            title: '',
            conclusion: '',
            url: ''
        }

        this.id = null
        this.status = CONST.PAGE_STATUS.DEFAULTS
        this.cossdk = null
        this.file = null
    }

    async componentDidMount() {
        this.initCosJsSdk()
        this.initClipboard()
        this.initPageStatus()
        await this.initData()
    }

    initCosJsSdk() {
        const self = this
        this.cossdk = new COS({
            getAuthorization: (options, callback) => fetch.get({
                url: 'task/image/credential',
                query: {}
            }).then(
                ({ data: { tmpSecretId, tmpSecretKey, sessionToken, startTime, expiredTime } }) => callback({
                    TmpSecretId: tmpSecretId,
                    TmpSecretKey: tmpSecretKey,
                    XCosSecurityToken: sessionToken,
                    StartTime: startTime,
                    ExpiredTime: expiredTime
                }),
                error => toast.show(error)
            )
        });
    }

    initClipboard() {
        const self = this
        const uploadClipboardData = function uploadClipboardData(event) {
            const file = null;
            const clipboardItems = event.clipboardData && event.clipboardData.items

            if (!clipboardItems || clipboardItems.length <= 0) return

            /** 检索剪切板 */
            for (const item of clipboardItems) {
                if (item.type.indexOf('image') !== -1) {
                    file = item.getAsFile();
                    break;
                }
            }

            if (file === null) return

            self.file = file
        }

        document.addEventListener('paste', uploadClipboardData);
    }

    initPageStatus() {
        this.id = window.localStorage['task-conclusion-edit-id']
        this.status = this.id ? CONST.PAGE_STATUS.EDIT : CONST.PAGE_STATUS.ADD
        window.localStorage['task-conclusion-edit-id'] = ''
    }

    async initData() {
        const self = this
        const { status, id } = this
        if (status !== CONST.PAGE_STATUS.EDIT) return;

        await fetch.get({
            url: 'task/get/one',
            query: { taskId: id }
        }).then(
            ({ data }) => self.setState({
                plan: data,
                title: data.title,
                conclusion: data.conclusion
            }),
            error => { }
        )
    }

    uploadFileHandle({ target: { files } }) {
        const self = this
        let { file, cossdk } = this

        const nowTimestamp = new Date().getTime()
        const path = `myweb/task-assist/temporary/${nowTimestamp}.png`

        file = files[0]

        if (!file) return toast.show('不存在文件');
        if (!cossdk) return toast.show('未初始化SDK');

        cossdk.putObject({
            Bucket: 'rejiejay-1251940173',
            Region: 'ap-guangzhou',
            Key: path,
            Body: file,
        }, function (err, data) {
            if (err) return toast.show(err);
            self.refs.file.value = null
            self.file = null
            self.setState({ url: path });
        });
    }

    addHandle() {
        const { title, conclusion, url } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        const { data: { id } } = getProcess()
        let body = {
            title,
            conclusion
        }
        id ? body.targetId = id : null
        url ? body.image = url : null

        fetch.post({
            url: 'task/conclusion/add',
            body: body
        }).then(
            res => window.location.replace('./../index.html'),
            error => { }
        )
    }

    editHandle() {
        const { id } = this
        const { title, conclusion, url } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        let body = {
            id,
            title,
            conclusion
        }
        url ? body.image = url : null

        fetch.post({
            url: 'task/conclusion/edit',
            body: body
        }).then(
            res => window.location.replace('./../index.html'),
            error => { }
        )
    }

    taskHandle() {
        const { data } = this.state
        serviceStorage.setItem({
            key: 'processTask',
            value: data
        }).then(
            res => window.location.href = './../../todo/item/index.html',
            error => { }
        )
    }

    delHandle() {
        const { id } = this

        const handle = () => fetch.post({
            url: 'task/delete',
            body: { id }
        }).then(
            res => window.location.replace('./../index.html'),
            error => { }
        )

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
    }

    render() {
        const self = this
        const { clientHeight, status } = this
        const { title, conclusion, url } = this.state

        return [
            <div className="conclusion-input">
                <div className="title-input flex-center">
                    <input type="text" placeholder="请输入题目"
                        value={title}
                        onChange={({ target: { value } }) => this.setState({ title: value })}
                    />
                </div>
                <div className="content-input">
                    <textarea className="content-textarea fiex-rest" type="text"
                        placeholder="请输入结论"
                        style={{ height: clientHeight - 46 - 78 - 78 }}
                        value={conclusion}
                        onChange={({ target: { value } }) => this.setState({ conclusion: value })}
                    ></textarea>
                </div>

                <input className="image-input"
                    ref='file'
                    type="file"
                    name="file"
                    onChange={this.uploadFileHandle.bind(this)}
                />
                <div className="image-upload">

                    {!url && <div className="image-button flex-center"
                        onClick={() => self.refs.file.click()}
                    >上传图片</div>}

                    {!!url && <div className="image-container">
                        <img alt="image"
                            onClick={() => self.setState({ url: '' })}
                            src={`https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/${url}`}
                        ></img>
                    </div>}
                </div>
            </div>,

            <div className="operating">
                <div className="operating-container flex-start">
                    {status === CONST.PAGE_STATUS.ADD && <div className="operating-yes flex-rest flex-center"
                        onClick={this.addHandle.bind(this)}
                    >新增</div>}
                    {status === CONST.PAGE_STATUS.EDIT && <div className="operating-yes flex-rest flex-center"
                        onClick={this.editHandle.bind(this)}
                    >编辑</div>}
                    {status === CONST.PAGE_STATUS.EDIT && <div className="operating-task flex-rest flex-center"
                        onClick={this.taskHandle.bind(this)}
                    >任务</div>}
                    {status === CONST.PAGE_STATUS.EDIT && <div className="operating-no flex-rest flex-center"
                        onClick={this.delHandle.bind(this)}
                    >删除</div>}
                </div>
            </div>
        ]
    }
}

window.onload = () => ReactDOM.render(<MainComponent />, document.body);
