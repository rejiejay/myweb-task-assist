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
    }
}

/**
 * 初始化方法
 */
var initialization = {
    clientWidth: 375,
    clientHeight: 667,

    main: function main() {
        var self = this

        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        components.init()
        this.initDom()

        this.initPageStatus()

        textarea.init()
        image.init()


        process.init().then(() => {
            self.stepTwo()
        }, error => {})
    },

    stepTwo: function stepTwo() {},

    initPageStatus: function initPageStatus() {},

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        textarea.dom = document.getElementById('content-input')
        image.file_dom = document.getElementById('upload-image')
        image.input_dom = document.getElementById('image-button')
        image.image_container_dom = document.getElementById('image-container')
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

var textarea = {
    dom: null,

    init: function init() {
        this.initHeight()
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
        this.initDelImage()
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
        var {
            image_container_dom,
            url,
            delHandle
        } = this

        image_container_dom.innerHTML = `<img id="image-content" src="https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/${url}" alt="image">`

        var img_dom = image_container_dom.firstElementChild
        img_dom.onclick = function imgClickHandle() {
            var parameter = {
                title: `确认要删除这张图片?`,
                succeedHandle: () => delHandle()
            }
            components.confirmPopUp(parameter)
        }
    },

    delHandle: function delHandle() {
        this.file = null
        this.url = null
        this.file_dom.value = null
        this.image_container_dom.innerHTML = ''
    }
}