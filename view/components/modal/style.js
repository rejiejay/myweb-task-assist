const content = (zIndex = 10) => `
    position        : fixed;
    width           : 100%;
    height          : 100%;
    top             : 0px;
    left            : 0px;
    z-index         : ${zIndex};
    background-color: rgba(0, 0, 0, 0.36);

    display  : -webkit-box;
    display  : -moz-box;
    display  : -ms-flexbox;
    display  : -webkit-flex;
    display  : flex;

    flex-direction: column;
    align-items   : center;
    justify-content: center;
`

const style = {
    content
}

export default style
