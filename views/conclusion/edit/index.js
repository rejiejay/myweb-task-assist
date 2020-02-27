window.onload = function () {
    initialization.main()
}

var CONST = {
    TARGET: {
        DEFAULTS: {
            id: '',
            name: '所有'
        },
        DEMO: {
            id: 'gwy',
            name: '公务员'
        }
    },
    PAGE_STATUS: {
        DEFAULTS: 'add',
        ADD: 'add',
        EDIT: 'edit'
    },
    TASK: {
        /** 作用: 判空 */
        DEFAULTS: {
            id: null,
            title: null,
            conclusion: null,
        },
        DEMO: {
            id: 1,
            targetId: 'not-null',
            title: 'not-null',
            content: null,
            conclusion: 'not-null',
            measure: null,
            span: null,
            aspects: null,
            worth: null,
            estimate: null,
            image: null,
            putoffTimestamp: null,
            completeTimestamp: null,
            sqlTimestamp: null
        }
    }
}

/**
 * 初始化方法
 */
var initialization = {
    status: CONST.PAGE_STATUS.DEFAULTS,
    clientWidth: 375,
    clientHeight: 667,

    main: function main() {
        var self = this

        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        components.init()
        this.initDom()

        this.initPageStatus()

        topic.init()
        textarea.init()
        image.init()
        del.init()

        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {
        submit.init()
    },

    initPageStatus: function initPageStatus() {
        var id = window.localStorage['task-conclusion-edit-id']

        if (id) {
            submit.data.id = id
            this.status = CONST.PAGE_STATUS.EDIT
            submit.dom.innerHTML = '编辑'
        } else {
            this.status = CONST.PAGE_STATUS.ADD
            del.dom.style = 'display: none;'
        }

        window.localStorage['task-conclusion-edit-id'] = ''
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        topic.dom = document.getElementById('title-input')
        textarea.dom = document.getElementById('content-input')
        image.file_dom = document.getElementById('upload-image')
        image.input_dom = document.getElementById('image-button')
        image.image_container_dom = document.getElementById('image-container')
        submit.dom = document.getElementById('submit')
        del.dom = document.getElementById('delete')
    },
}

var components = {
    toast: null,
    fetch: null,
    serviceStorage: null,
    confirmPopUp: null,

    init: function init() {
        this.fetch = Fetch.init()
        this.toast = Toast.init()
        this.serviceStorage = ServiceStorage.init()
        this.confirmPopUp = ConfirmPopUp.init()
    }
}

var process = {
    target: CONST.TARGET.DEFAULTS,
    dom: null,

    init: function init() {
        var self = this

        return new Promise((resolve, reject) => {
            self.initProcessTarget(resolve, reject)
        })
    },

    initProcessTarget: function initProcessTarget(resolve, reject) {
        var self = this

        components.serviceStorage.getItem({
            key: 'processTarget'
        }).then(
            res => {
                self.target = res
                resolve()
            },
            error => reject()
        )
    }
}

var topic = {
    data: null,
    dom: null,

    init: function init() {
        var self = this
        this.dom.oninput = function () {
            self.data = this.value
        }
    },
}

var textarea = {
    data: null,
    dom: null,

    init: function init() {
        var self = this
        this.initHeight()

        this.dom.oninput = function () {
            self.data = this.value
        }
    },

    initHeight: function initHeight() {
        var title = 46
        var image = 78
        var operating = 78
        textarea.dom.style.height = `${initialization.clientHeight - title - image - operating}px`
    }
}

var image = {
    file: null,
    url: null,
    file_dom: null,
    input_dom: null,
    image_container_dom: null,

    init: function init() {
        var self = this

        this.input_dom.onclick = function () {
            self.file_dom.click()
        }

        this.initUpload()
    },

    initUpload: function initUpload() {
        var self = this

        this.file_dom.onchange = function (event) {
            var file = event.target.files[0]
            self.file = file ? file : null

            if (file) self.uploadFile()
        }

        /**
         * 剪切板
         */
        var uploadClipboardData = function uploadClipboardData(event) {
            var file = null;
            var clipboardItems = event.clipboardData && event.clipboardData.items

            if (!clipboardItems || clipboardItems.length <= 0) return

            // 检索剪切板
            for (var item of clipboardItems) {
                if (item.type.indexOf('image') !== -1) {
                    file = item.getAsFile();
                    break;
                }
            }

            if (file === null) return

            self.file = file
            self.uploadFile()
        }

        document.addEventListener('paste', uploadClipboardData);
    },

    uploadFile: function uploadFile() {
        var self = this
        var file = this.file

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (ev) {
            var base64Str = ev.target.result;

            components.fetch.post({
                url: 'task/image/upload',
                body: {
                    imageBase64String: base64Str
                }
            }).then(
                ({
                    data
                }) => {
                    self.url = data
                    self.render()
                },
                error => {}
            )
        }
    },

    render: function render() {
        var self = this
        var {
            image_container_dom,
            url
        } = this

        image_container_dom.innerHTML = `<img id="image-content" src="https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/${url}" alt="image">`

        var img_dom = image_container_dom.firstElementChild
        img_dom.onclick = function imgClickHandle() {
            var parameter = {
                title: `确认要删除这张图片?`,
                succeedHandle: () => self.delHandle()
            }
            components.confirmPopUp(parameter)
        }
    },

    delHandle: function delHandle() {
        this.file = null
        this.url = null
        this.file_dom.value = ''
        this.image_container_dom.innerHTML = ''
    }
}

var submit = {
    data: CONST.TASK.DEFAULTS,
    dom: null,

    init: function init() {
        this.initDate()
        this.initSubmitHandle()
    },

    initDate: function initDate() {
        var self = this
        if (initialization.status !== CONST.PAGE_STATUS.EDIT) return false

        components.fetch.get({
            url: 'task/get/one',
            query: {
                taskId: this.data.id
            }
        }).then(
            res => {
                self.data = res.data
                self.render()
            },
            error => {}
        )
    },

    render: function render() {
        var {
            title,
            conclusion
        } = this.data
        var taskImage = this.data.image

        topic.data = title
        topic.dom.value = title

        textarea.data = conclusion
        textarea.dom.value = conclusion

        if (taskImage) {
            image.url = taskImage
            image.render()
        }
    },

    initSubmitHandle: function initSubmitHandle() {
        var self = this

        this.dom.onclick = function () {
            var title = topic.data
            if (!title) return components.toast.show('标题不能为空');

            var content = textarea.data
            if (!content) return components.toast.show('内容不能为空');

            var status = initialization.status
            if (status === CONST.PAGE_STATUS.EDIT) return self.editHandle(title, content)
            if (status === CONST.PAGE_STATUS.ADD) return self.addHandle(title, content)
        }
    },

    editHandle: function editHandle(title, conclusion) {
        var targetId = process.target.id
        var imagePath = image.url
        var body = {
            id: this.data.id,
            title,
            conclusion
        }
        targetId ? body.targetId = targetId : null
        imagePath ? body.image = imagePath : null

        components.fetch.post({
            url: 'task/conclusion/edit',
            body: body
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    },

    addHandle: function addHandle(title, conclusion) {
        var targetId = process.target.id
        var imagePath = image.url
        var body = {
            title,
            conclusion
        }
        targetId ? body.targetId = targetId : null
        imagePath ? body.image = imagePath : null

        components.fetch.post({
            url: 'task/conclusion/add',
            body: body
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    }
}

var del = {
    dom: null,

    init: function del() {
        var self = this

        this.dom.onclick = function () {
            var parameter = {
                title: `确认要删除吗?`,
                succeedHandle: () => self.delHandle()
            }
            components.confirmPopUp(parameter)
        }
    },

    delHandle: function delHandle() {
        components.fetch.post({
            url: 'task/delete',
            body: {
                id: submit.data.id
            }
        }).then(
            res => window.location.href = './../index.html',
            error => {}
        )
    }
}