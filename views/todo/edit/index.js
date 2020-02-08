window.onload = function () {
    initialization.main()
}

/**
 * 初始化方法
 */
var initialization = {
    main: function main() {
        this.initDom()

        components.init()

        putoff.init()
    },

    /**
     * 节点 初始化
     */
    initDom: function initDom() {
        putoff.clear_dom = document.getElementById('picka-clear')
        putoff.picker_dom = document.getElementById('picka-date')
    }
}

var components = {
    toast: null,
    datepicker: null,

    init: function init() {
        var self = this

        this.toast = Toast.init()

        var nowYear = new Date().getFullYear()
        this.datepicker = new Rolldate({
            el: '#picka-date',
            format: 'YYYY-MM-DD hh:mm',
            beginYear: nowYear,
            endYear: nowYear + 10,
            lang: {
                title: '推迟到什么时候?'
            },
            confirm: function confirm(date) {
                var nowTime = new Date().getTime()
                var pickerTime = new Date(date.replace(/\-/g, "\/")).getTime()

                if (nowTime > pickerTime) {
                    self.toast.show('不能小于当前的日期')
                    return false;
                }

                putoff.handle(date)
            }
        })
    }
}

var putoff = {
    clear_dom: null,
    picker_dom: null,
    value: null,

    init: function init() {
        var self = this

        this.clear_dom.onclick = function () {
            self.value = null
            self.picker_dom.value = ''
        }
    },

    handle: function handle(date) {
        this.value = date
    }
}