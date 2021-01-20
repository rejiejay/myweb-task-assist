/**
 * toast 对外方法:
 * @show 显示
 * @destroy 销毁
 */
import style from './style.js'
import consequencer from './../../../utils/consequencer'

function confirm(message) {
    let resolveHandle = () => { }
    let rejectHandle = () => { }
    const div = document.createElement('div')
    div.setAttribute('style', style.content)

    const destroy = () => document.body.removeChild(div)
    const confirmHandle = () => {
        resolveHandle(consequencer.success())
        destroy()
    }
    const cancelHandle = () => {
        rejectHandle(consequencer.error('cancel'))
        destroy()
    }

    document.body.appendChild(div)
    ReactDOM.render(
        <>
            <div style={style.mask} />
            <div style={style.container}>
                <div style={style.title}>{message || 'please confirm operation'}</div>
                <div style={style.operating}>
                    <div style={style.confirm} onClick={confirmHandle}>确认</div>
                    <div style={style.cancel} onClick={cancelHandle}>取消</div>
                </div>
            </div>
        </>
        ,
        div
    )

    return new Promise((resolve, reject) => {
        resolveHandle = resolve
        rejectHandle = reject
    })
}

export default confirm
