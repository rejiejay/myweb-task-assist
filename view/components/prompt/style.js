import jsxStyle from './../jsx-style/index'

const content = 'position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 99; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center;'

const mask = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    opacity: '0'
}

const container = {
    border: '1px solid #ddd',
    position: 'relative',
    background: '#fff',
    borderRadius: '5px',
    overflow: 'hidden'
}

const title = {
    padding: '15px 25px',
    fontSize: '16px',
    color: '#303133',
    borderBottom: '1px solid #ddd'
}

const operating = {
    ...jsxStyle.basicFlex.startCenter
}

const confirm = {
    height: '45px',
    padding: '0px 15px',
    borderRight: '1px solid #ddd',
    ...jsxStyle.basicFlex.center,
    ...jsxStyle.basicFlex.rest
}

const cancel = {
    height: '45px',
    padding: '0px 15px',
    ...jsxStyle.basicFlex.center,
    ...jsxStyle.basicFlex.rest
}

const inputContainer = {
    border: '1px solid #ddd',
    padding: '5px 10px'
}

const baseInput = {
    color: '#606266',
    width: '100%',
    padding: '0px',
    background: '#fff'
}

const singleInputTextarea = {
    ...baseInput,
    height: '32px',
    fontSize: '14px',
    lineHeight: '32px'
}

/**
 * 多行输入的样式
 * @param {*} minHeight 优先级最高, 会覆盖
 * @param {*} isAutoHeight 自动调节高度, 根据value值改变
 * @param {*} value 输入的值
 */
const multipleInputTextarea = (minHeight, isAutoHeight, value) => {
    let style = { ...baseInput }

    if (!!isAutoHeight) {
        let wrapConut = !!value ? 0 : 1
        // 存在换行按钮 \n， 换一行
        if (!!value) wrapConut += value.split(/[\s\n]/).length
        // 超过24个字自动换一行
        if (!!value) wrapConut += Math.floor(value.length / 24)
        const wrapHeight = wrapConut * 16

        if (!!minHeight) {
            style.minHeight = `${minHeight}px`
            // 当计算的高度大于最小高度的时候，撑开
            if (minHeight < wrapHeight) style.height = `${wrapHeight}px`
        }
        if (!minHeight) {
            style.height = `${wrapHeight}px`
        }

        return style
    }

    if (!!minHeight) style.height = `${minHeight}px`
    if (!minHeight) style.minHeight = '45px'

    return style
}


const style = {
    content,
    mask,
    container,
    title,
    operating,
    confirm,
    cancel,

    inputContainer,
    singleInputTextarea,
    multipleInputTextarea
}

export default style
