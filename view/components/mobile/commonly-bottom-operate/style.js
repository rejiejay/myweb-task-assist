import jsxStyle from './../../jsx-style'

const container = {
    ...jsxStyle.basicFlex.startCenter,
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    height: '50px',
    width: '100%',
    borderTop: '1px solid #ddd',
    backgroundColor: '#fff'
}

const element = {
    padding: '0px 15px'
}

const left = {
    ...jsxStyle.basicFlex.start,
    ...jsxStyle.basicFlex.rest
}

const leftElement = ({ haveLine }) => {
    let style = { ...element }
    if (haveLine) style.borderRight = '1px solid #ddd'
    return style
}

const right = {
    ...jsxStyle.basicFlex.start
}

const rightElement = ({ haveLine }) => {
    let style = { ...element }
    if (haveLine) style.borderLeft = '1px solid #ddd'
    return style
}

const style = {
    container,
    left,
    leftElement,
    right,
    rightElement
}

export default style
