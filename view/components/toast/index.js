/**
 * toast 对外方法:
 * @show 显示
 * @destroy 销毁
 */
import style from './style.js'

function show(message) {
    const self = this
    /** 目标: 防止重复调用 */
    if (!!this.element) return

    const div = document.createElement('div')
    div.setAttribute('style', style.content)
    this.element = div
    if (!!message) div.onclick = () => this.destroy.call(this)
    document.body.appendChild(div)

    this.destroy = () => {
        if (self.element === null) return
        document.body.removeChild(div)
        self.element = null
    }

    if (!!message) return ReactDOM.render(<div style={style.message} onClick={this.destroy.bind(this)}>{message}</div>, div);

    return ReactDOM.render(
        <div style={style.loader}>
            <div style={style.audioWave} />
        </div>,
        div
    )
}

function destroy() {
    if (this.element === null) return
    document.body.removeChild(this.element)
    this.element = null
}

const toast = {
    element: null,

    show,

    destroy
}

export default toast
