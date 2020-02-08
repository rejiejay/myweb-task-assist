var ConfirmPopUp = {
    init: function init() {
        var self = this

        return function instance({
            title,
            succeedHandle
        }) {
            /**
             * 目标: 防止重复调用
             */
            if (document.getElementById('rejiejay-confirm-popup')) {
                return false;
            }

            self.build(title)
            self.bindEvent(succeedHandle)
        }
    },

    build: function build(title) {
        var node = document.createElement("div");

        let node_content = `
            <div id='ejiejay-confirm-popup-mask'></div>
            <div class='confirm-container'>
                <div class='confirm-title'>${title || 'please confirm operation'}</div>
                <div class='confirm-operating'>
                    <div id='rejiejay-confirm-popup-operate-yes'>确认</div>
                    <div id='rejiejay-confirm-popup-operate-no'>取消</div>
                </div>
            </div>
        `;

        node.setAttribute('class', 'rejiejay-confirm-popup');
        node.setAttribute('id', 'rejiejay-confirm-popup');
        node.innerHTML = node_content;
        document.body.appendChild(node);
    },

    bindEvent: function bindEvent(succeedHandle) {
        var self = this

        document.getElementById('rejiejay-confirm-popup-operate-yes').onclick = function () {
            succeedHandle ? succeedHandle() : null;
            self.destroy()
        }

        document.getElementById('rejiejay-confirm-popup-operate-no').onclick = function () {
            self.destroy()
        }

        document.getElementById('ejiejay-confirm-popup-mask').onclick = function () {
            self.destroy()
        }
    },

    /**
     * 销毁
     */
    destroy: function destroy() {
        var confirm = document.getElementById('rejiejay-confirm-popup')
        if (confirm) {
            document.body.removeChild(confirm);
        }
    }
}