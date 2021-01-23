import jsxStyle from './../jsx-style/index'

const content = `
    position        : fixed;
    width           : 100%;
    height          : 100%;
    top             : 0px;
    left            : 0px;
    z-index         : 99;
    background-color: rgba(0, 0, 0, 0.38);

    display  : -webkit-box;
    display  : -moz-box;
    display  : -ms-flexbox;
    display  : -webkit-flex;
    display  : flex;

    flex-direction: column;
    align-items   : center;
`

const mask = {
    width: '100%',
    opacity: 0,
    ...jsxStyle.basicFlex.rest
}

const container = {
    width: '100%',
    backgroundColor: '#fff',
    overflowY: 'auto'
}

const title = {
    padding: '0px 15px',
    height: '32px',
    color: '#303133',
    borderBottom: '1px solid #ddd',
    ...jsxStyle.basicFlex.startCenter
}

const selector = {}

const item = {
    height: '45px',
    padding: '0px 15px',
    borderBottom: '1px solid #ddd',
    ...jsxStyle.basicFlex.startCenter
}

const style = {
    content,
    mask,
    container,
    title,
    selector,
    item
}

export default style
