/**
 * MobileInput 移动端常用 Input
 */
import style from './style.js'

export default class CommonlyInputText extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            value, placeholder, onChangeHandle,
            minHeight, isMultipleInput, isAutoHeight,
            onBlur, onFocus
        } = this.props

        return <div className='commonly-input-text' style={style.container}>
            {!isMultipleInput &&
                <input type="text"
                    style={style.singleInputTextarea}
                    value={value}
                    onChange={({ target: { value } }) => onChangeHandle(value)}
                    placeholder={placeholder}
                    onBlur={() => onBlur && onBlur()}
                    onFocus={() => onFocus && onFocus()}
                />
            }
            {!!isMultipleInput &&
                <textarea type="text"
                    style={style.multipleInputTextarea(minHeight, isAutoHeight, value)}
                    value={value}
                    onChange={({ target: { value } }) => onChangeHandle(value)}
                    placeholder={placeholder}
                    onBlur={() => onBlur && onBlur()}
                    onFocus={() => onFocus && onFocus()}
                />
            }
        </div>
    }
}
