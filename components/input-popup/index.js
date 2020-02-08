/**
 * 使用注意: 需前置引入组件依赖
 * components/toast
 */
var InputPopUp = {
    input: '',
    toast: null,

    init: function init() {
        var self = this

        this.initComponents()

        var instance = {
            show: function show(parameter) {
                self.show(parameter)
            },
            hiden: this.destroy
        }

        return instance
    },

    /**
     * 组件
     */
    initComponents: function initComponents() {
        this.toast = Toast.init()
    },

    show: function show({
        title,
        handle,
        placeholder,
        mustInput
    }) {
        /**
         * 目标: 防止重复调用
         */
        if (document.getElementById('rejiejay-input-popup')) {
            return false;
        }

        this.build(title, placeholder, mustInput)
        this.bindEvent(handle, mustInput)
    },

    build: function build(title, placeholder, mustInput) {
        var node = document.createElement("div");

        var node_content = `
            <div id='ejiejay-input-popup-mask'></div>
            <div class='input-container'>
                <div class='input-title'>${title || 'please input'}</div>
                <div class='input-text'>
                    <input type='text' id='rejiejay-input-popup-operate-value' placeholder='${placeholder || '请输入内容'}' />
                </div>
                <div class='input-operating'>
                    <div id='rejiejay-input-popup-operate-yes'>确认</div>
                    ${mustInput ? '' : "<div id='rejiejay-input-popup-operate-no'>取消</div>"}
                </div>
            </div>
        `;

        node.setAttribute('class', 'rejiejay-input-popup');
        node.setAttribute('id', 'rejiejay-input-popup');
        node.innerHTML = node_content;
        document.body.appendChild(node);
    },

    bindEvent: function bindEvent(handle, mustInput) {
        var self = this

        var input = document.getElementById('rejiejay-input-popup-operate-value')

        document.getElementById('rejiejay-input-popup-operate-yes').onclick = function () {
            if (!input.value) {
                return self.toast.show('值不能为空')
            }
            handle(input.value)
        }

        if (!mustInput) {
            document.getElementById('rejiejay-input-popup-operate-no').onclick = function () {
                self.destroy()
            }
    
            document.getElementById('ejiejay-input-popup-mask').onclick = function () {
                self.destroy()
            }
        }
    },

    /**
     * 销毁
     */
    destroy: function destroy() {
        var popup = document.getElementById('rejiejay-input-popup')
        if (popup) {
            document.body.removeChild(popup);
        }
    }
}