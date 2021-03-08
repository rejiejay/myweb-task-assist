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
    ...jsxStyle.basicFlex.startCenter,
    borderTop: '1px solid #ddd'
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

const multipleSelectList = {
    width: '320px',
    paddingBottom: '15px',
    overflow: 'hidden'
}

const multipleSelectResult = {
    borderTop: '1px solid #ddd',
    paddingTop: '15px',
    overflow: 'hidden'
}

const multipleSelectItem = {
    border: '1px solid #ddd',
    lineHeight: '32px',
    padding: '0 15px'
}

const multipleSelectDisable = {
    lineHeight: '32px',
    width: '23px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderLeft: 'none'
}

const multipleSelectSelect = {
    color: '#fff',
    background: 'rgb(121, 182, 242)'
}

const multipleSelectEffect = {
    color: '#fff',
    background: '#909399',
    border: '1px solid #909399',
}

const style = {
    content,
    mask,
    container,
    title,
    operating,
    confirm,
    cancel,
    multipleSelectList,
    multipleSelectResult,
    multipleSelectItem,
    multipleSelectDisable,
    multipleSelectSelect,
    multipleSelectEffect
}

export default style
