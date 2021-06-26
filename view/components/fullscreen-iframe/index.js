/**
 * FullscreenIframe 对外方法:
 */
import style from './style.js'
import consequencer from './../../../utils/consequencer'

const FullscreenIframe = ({ Element, zIndex, props, className }) => {
    const parameter = props ? props : {}
    let resolveHandle = () => { }
    let rejectHandle = () => { }
    const div = document.createElement('div')
    div.setAttribute('style', style.content(zIndex))
    div.className = !!className ? className : ''

    const destroy = () => document.body.removeChild(div)
    const selectResolveHandle = result => {
        resolveHandle(result)
        destroy()
    }
    const selectRejectHandle = () => {
        rejectHandle(consequencer.error('cancel'))
        destroy()
    }

    document.body.appendChild(div)
    ReactDOM.render(
            <div style={style.container}>
                <Element
                    className={className ? className : ''}
                    resolve={selectResolveHandle}
                    reject={selectRejectHandle}
                    {...parameter}
                />
            </div>
        ,
        div
    )

    return new Promise((resolve, reject) => {
        resolveHandle = resolve
        rejectHandle = reject
    }).catch(error => error);
}

export default FullscreenIframe
