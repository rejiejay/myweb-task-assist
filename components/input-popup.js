import toast from './toast.js';
import consequencer from './../utils/consequencer.js';

export const inputPopUpDestroy = function inputPopUpDestroy() {
    var popup = document.getElementById('rejiejay-input-popup')
    if (popup) document.body.removeChild(popup);
}

export const inputPopUp = ({
    title,
    placeholder,
    mustInput
}) => new Promise(function (resolve, reject) {
    /** 目标: 防止重复调用 */
    if (document.getElementById('rejiejay-input-popup')) return reject();
    const node = document.createElement("div");

    const node_content = `
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

    const input = document.getElementById('rejiejay-input-popup-operate-value')

    document.getElementById('rejiejay-input-popup-operate-yes').onclick = function () {
        if (!input.value) {
            return toast.show('值不能为空')
        }
        resolve(input.value)
    }

    if (!mustInput) {
        document.getElementById('rejiejay-input-popup-operate-no').onclick = function () {
            inputPopUpDestroy()
            reject()
        }

        document.getElementById('ejiejay-input-popup-mask').onclick = function () {
            inputPopUpDestroy()
            reject()
        }
    }

}).then(
    value => consequencer.success(value),
    error => consequencer.error(error)
)