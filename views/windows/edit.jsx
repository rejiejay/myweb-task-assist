import fetch from './../../components/async-fetch/fetch.js';
import toast from './../../components/toast.js'
import { confirmPopUp } from './../../components/confirm-popup.js';
import { getProcess } from './../../components/process-task/index.jsx';

import CONST from './const.js';

class EditComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            conclusion: '',
            image: null
        }

        this.status = CONST.PAGE_EDIT_STATUS.DEFAULTS
        this.task = CONST.TASK.DEFAULTS
        this.id = null
        this.file = null

        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth

        this.cossdk = null
    }

    initCosJsSdk() {
        if (!!!this.cossdk) this.cossdk = new COS({
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
        })
    }

    async init(id) {
        const self = this

        this.initCosJsSdk()

        if (!!!id) {
            this.status = CONST.PAGE_EDIT_STATUS.ADD
            return this.setState({
                title: '',
                conclusion: '',
                image: null
            })
        }

        this.id = id
        this.status = CONST.PAGE_EDIT_STATUS.EDIT

        await fetch.get({
            url: 'task/get/one',
            query: { taskId: id }
        }).then(
            ({ data }) => {
                self.task = data
                self.setState({
                    title: data.title,
                    conclusion: data.conclusion,
                    image: data.image
                })
            },
            error => { }
        )
    }

    verifyEditDiff() {
        const { status } = this
        if (status !== CONST.PAGE_EDIT_STATUS.EDIT) return false

        const { title, conclusion, image } = this.state
        const task = this.task

        let isDiff = false
        if (title !== task.title) isDiff = true
        if (conclusion !== task.conclusion) isDiff = true
        if (image !== task.image) isDiff = true
        return isDiff
    }

    closeHandle() {
        const { title, conclusion, image } = this.state
        const { editTaskCloseHandle } = this.props
        const { status } = this
        const task = this.task

        /** 含义: 未有任何数据 */
        if (status === CONST.PAGE_EDIT_STATUS.ADD && !!!title && !!!conclusion && !!!image) return editTaskCloseHandle({ isUpdate: false });
        if (this.verifyEditDiff() === false) return editTaskCloseHandle({ isUpdate: false });

        confirmPopUp({
            title: `数据未保存, 你确认要退出吗?`,
            succeedHandle: () => editTaskCloseHandle({ isUpdate: true })
        })
    }

    editTemporaryHandle() {
        const self = this
        const { id } = this
        const { title, conclusion, image } = this.state

        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        let body = {
            id,
            title,
            conclusion
        }
        image ? body.image = image : null

        fetch.post({
            url: 'task/conclusion/edit',
            body: body
        }).then(
            res => {
                self.task.title = title
                self.task.conclusion = conclusion
                self.task.image = image
                self.setState({ title, conclusion, image })
            },
            error => { }
        )
    }

    addHandle() {
        const { editTaskCloseHandle } = this.props
        const { title, conclusion, image } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        const { data: { id } } = getProcess()
        let body = {
            targetId: id,
            title,
            conclusion
        }
        image ? body.image = image : null

        fetch.post({
            url: 'task/conclusion/add',
            body: body
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )
    }

    editHandle() {
        const { editTaskCloseHandle } = this.props
        const { id } = this
        const { title, conclusion, image } = this.state
        if (!title) return toast.show('标题不能为空');
        if (!conclusion) return toast.show('内容不能为空');

        let body = {
            id,
            title,
            conclusion
        }
        image ? body.image = image : null

        fetch.post({
            url: 'task/conclusion/edit',
            body: body
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )
    }

    delHandle() {
        const { editTaskCloseHandle } = this.props
        const { id } = this

        const handle = () => fetch.post({
            url: 'task/conclusion/delete',
            body: { id }
        }).then(
            res => editTaskCloseHandle({ isUpdate: true }),
            error => { }
        )

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
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
            self.setState({ image: path });
        });
    }

    delImage() {
        const self = this

        const handle = () => self.setState({ image: null })

        confirmPopUp({
            title: `你确认要删除吗?`,
            succeedHandle: handle
        })
    }

    render() {
        const self = this
        const { isShow } = this.props
        const { title, conclusion, image } = this.state
        const { clientHeight, status } = this
        const minHeight = clientHeight - 46 - 26 - 52
        const isDiff = this.verifyEditDiff()

        return [
            <div className="edit flex-center" style={!!!isShow ? { display: 'none' } : {}}>
                <div className="edit-container flex-start-top">
                    <div className="edit-operating flex-rest"
                        style={{ minHeight }}
                    >
                        <div className="title-input flex-center">
                            <input type="text" placeholder="请输入题目"
                                value={title}
                                onChange={({ target: { value } }) => this.setState({ title: value })}
                            />
                        </div>
                        <div className="content-input">
                            <textarea className="content-textarea fiex-rest" type="text"
                                placeholder="请输入结论"
                                style={{ height: minHeight - 63 - 32 }}
                                value={conclusion}
                                onChange={({ target: { value } }) => this.setState({ conclusion: value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className="edit-preview">
                        <div className="edit-preview-container"
                            style={{ minHeight }}
                        >
                            <div className="preview-operating">
                                <div className="preview-operating-container flex-center close-container noselect"
                                    onClick={this.closeHandle.bind(this)}
                                >关闭</div>
                            </div>
                            {isDiff && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.editTemporaryHandle.bind(this)}
                                >暂存</div>
                            </div>}
                            <div className="item-description-container">
                                <div className="item-description"
                                    dangerouslySetInnerHTML={{ __html: conclusion.replace(/\n/g, "<br>") }}
                                ></div>
                            </div>
                            <input className="image-input"
                                ref='file'
                                type="file"
                                name="file"
                                onChange={this.uploadFileHandle.bind(this)}
                            />
                            {!!!image && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={() => self.refs.file.click()}
                                >图片</div>
                            </div>}
                            {!!image && <div className="image-container">
                                <img alt="image"
                                    onClick={self.delImage.bind(self)}
                                    src={`https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/${image}`}
                                ></img>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.ADD && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.addHandle.bind(this)}
                                >新增</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.editHandle.bind(this)}
                                >编辑</div>
                            </div>}
                            {status === CONST.PAGE_EDIT_STATUS.EDIT && <div className="preview-operating">
                                <div className="preview-operating-container flex-center noselect"
                                    onClick={this.delHandle.bind(this)}
                                >删除</div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        ]
    }
}

export default EditComponent
