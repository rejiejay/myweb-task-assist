var Toast = {
    init: function init() {
        var self = this
        var instance = {
            show: function show(message) {
                self.show(message, self)
            },
            destroy: self.destroy
        }

        return instance
    },

    /**
     * 显示
     * @param {string} message 显示的信息
     */
    show: function show(message, self) {
        /**
         * 目标: 防止重复调用
         */
        if (document.getElementById('rejiejay-toast')) {
            return false;
        }

        var node = document.createElement("div");

        var node_content = `
            <div class='toast-content'>
                <div class='toast-loader'>
                    <div class='loader--audioWave'></div>
                </div>
            </div>
        `;

        if (message) {
            node_content = `
                <div class='toast-content'>
                    <div class='toast-message'>${message}</div>
                </div>
            `;
        }

        node.setAttribute('class', 'rejiejay-toast');
        node.setAttribute('id', 'rejiejay-toast');
        node.innerHTML = node_content;
        document.body.appendChild(node);

        /**
         * 条件: 有文字提示的情况下
         * 作用: 可点击屏幕取消提示
         */
        if (message) {
            document.getElementById('rejiejay-toast').onclick = function () {
                self.destroy();
            }
        }
    },

    /**
     * 销毁
     */
    destroy: function destroy() {
        var toast = document.getElementById('rejiejay-toast')
        if (toast) {
            document.body.removeChild(toast);
        }
    }
}