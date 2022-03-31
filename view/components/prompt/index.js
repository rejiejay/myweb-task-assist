/**
 * Prompt 对外方法
 */
import consequencer from './../../../utils/consequencer'

import toast from './../toast'

import style from './style.js'

const CommonlyInputText = ({
    value, placeholder, onChangeHandle,
    minHeight, isMultipleInput, isAutoHeight,
    onBlur, onFocus

}) => (<div className='commonly-input-text' style={style.inputContainer}>
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
</div>)

function Prompt({ title, defaultValue, placeholder } = {}) {
    let resolveHandle = () => { }
    let rejectHandle = () => { }
    const div = document.createElement('div')
    div.setAttribute('style', style.content)

    const destroy = () => {
        if (div && div.parentNode) document.body.removeChild(div)
    }
    const confirmHandle = value => {
        if (!value) return toast.show('输入内容不能为空')
        resolveHandle(consequencer.success(value))
        destroy()
    }
    const cancelHandle = () => {
        rejectHandle(consequencer.error('cancel'))
        destroy()
    }

    const PromptContent = () => {
        const [state, initState] = React.useState({ value: defaultValue })
        const setState = newState => initState(prevState => ({ ...prevState, ...newState }))

        return <>
            <div style={style.mask} />
            <div style={style.container}>
                <div style={style.title}>{title || 'please confirm operation'}</div>
                <CommonlyInputText key='value'
                    value={state.value}
                    onChangeHandle={value => setState({ value })}
                    isMultipleInput
                    isAutoHeight
                    minHeight={75}
                    placeholder={placeholder || '请输入内容'}
                />
                <div style={style.operating}>
                    <div style={style.confirm} onClick={() => confirmHandle(state.value)}>确认</div>
                    <div style={style.cancel} onClick={cancelHandle}>取消</div>
                </div>
            </div>
        </>
    }

    document.body.appendChild(div)
    ReactDOM.render(<PromptContent></PromptContent>, div)

    return new Promise((resolve, reject) => {
        resolveHandle = resolve
        rejectHandle = reject
    }).catch(error => error);
}

export default Prompt
