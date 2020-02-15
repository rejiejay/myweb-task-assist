window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    clientWidth: 375,
    clientHeight: 667,

    main: function main() {
        this.clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
        this.clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

        components.init()
        this.initDom()

        textarea.init()
        image.init()
    },

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
    confirmPopUp: null,

    init: function init() {
        this.confirmPopUp = ConfirmPopUp.init()
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
            console.dir(event.target)
            self.showImage()
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
            self.showImage()
        }

        document.addEventListener('paste', uploadClipboardData);
    },

    showImage: function showImage(src) {
        this.input_dom.src = src

        this.image_container_dom.innerHTML = `<img id="image-content" src="${src}" alt="image">`
        this.initDelImage()
    },

    initDelImage: function initDelImage() {
        var self = this

        var dom = document.getElementById('image-content')

        var handle = function handle() {
            self.file = null
            self.image_container_dom.innerHTML = ''
        }

        dom ? dom.onclick = function () {
            var parameter = {
                title: '你确认要删除吗?',
                succeedHandle: handle
            }
            components.confirmPopUp(parameter)
        } : null
    },
}