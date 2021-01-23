/**
 * Button 参考 https://weui.io/#button
 */
import styleJs from './style.js'
import WeuiLoading from './weui-loading.js'

const Button = ({ style, isLoading, isDisabled, children, onClick }) => {
    let container = styleJs.container
    let clickHandle = () => { }

    if (!!style) container = { ...container, ...style }
    if (!!onClick) clickHandle = onClick
    if (!!isDisabled) container = { ...container, backgroundColor: 'rgb(242, 242, 242)', color: 'rgba(0, 0, 0, 0.2)' }

    if (isLoading) return <div style={container} onClick={clickHandle}>
        <WeuiLoading isDisabled={!!isDisabled} />
        <div style={{ paddingLeft: '12px' }}>{children}</div>
    </div>

    return <div style={container} onClick={clickHandle}>
        {children}
    </div>
}

export default Button

