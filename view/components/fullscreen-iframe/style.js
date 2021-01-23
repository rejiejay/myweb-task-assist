// import jsxStyle from './../jsx-style/index'

const content = (zIndex = 10) => `
    position        : fixed;
    width           : 100%;
    height          : 100%;
    top             : 0px;
    left            : 0px;
    z-index         : ${zIndex};
    background-color: #fff;

    display  : -webkit-box;
    display  : -moz-box;
    display  : -ms-flexbox;
    display  : -webkit-flex;
    display  : flex;

    flex-direction: column;
    align-items   : center;
`

const container = {
    width: '100%',
    overflowY: 'auto'
}

const style = {
    content,
    container
}

export default style
