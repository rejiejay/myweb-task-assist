/**
 * ActionSheet 对外方法:
 */
import style from './style.js'
import consequencer from './../../../utils/consequencer'

const ActionSheet = ({ title, options }) => {
    let resolveHandle = () => { }
    let rejectHandle = () => { }
    const div = document.createElement('div')
    div.setAttribute('style', style.content)

    const destroy = () => document.body.removeChild(div)
    const selectHandle = ({ value, label }) => {
        resolveHandle(consequencer.success({ value, label }))
        destroy()
    }
    const cancelHandle = () => {
        rejectHandle(consequencer.error('cancel'))
        destroy()
    }

    document.body.appendChild(div)
    ReactDOM.render(
        <>
            <div style={style.mask} onClick={cancelHandle} />
            <div style={style.container}>
                <div style={style.title}>{title || 'please select item'}</div>
                <div style={style.selector}>{options.map(({ value, label }, key) =>
                    <div
                        key={key}
                        style={style.item}
                        onClick={() => selectHandle({ value, label })}
                    >{label}</div>
                )}</div>
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

export default ActionSheet
