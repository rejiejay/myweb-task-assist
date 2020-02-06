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

        let node_content = `
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

        node.setAttribute('class', 'rejiejay-toast flex-center');
        node.setAttribute('id', 'rejiejay-toast');
        node.innerHTML = node_content;
        document.body.appendChild(node);

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
        if (document.getElementById('rejiejay-toast')) {
            document.body.removeChild(document.getElementById('rejiejay-toast'));
        }
    }
}