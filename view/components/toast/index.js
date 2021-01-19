/**
 * toast 对外方法:
 * @show 显示
 * @destroy 销毁
 */
import style from './style.js'

function show(message) {
    /** 目标: 防止重复调用 */
    if (!!this.element) return

    const div = document.createElement('div')
    this.element = div
    document.body.appendChild(div)

    this.destroy = () => {
        document.body.removeChild(div)
        this.element = null
    }

    ReactDOM.render(
        <div style={style.content}>
            {!!message ?
                <div style={style.message}>{message}</div>
                :
                <div style={style.loader}>
                    <div style={style.audioWave} />
                </div>
            }
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
