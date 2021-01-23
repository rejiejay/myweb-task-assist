/**
 * Button 参考 https://weui.io/#button
 */
import styleJs from './style.js'

const Button = ({ style, isLoading, isDisabled, children }) => {
    let container = styleJs.container

    if (!!style) container = { ...container, ...style }

    return <div style={container}>
        {children}
    </div>
}

export default Button

