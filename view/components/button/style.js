import jsxStyle from './../jsx-style/index'

const container = {
    position: 'relative',
    display: 'block',
    minWidth: '184px',
    padding: '0px 15px',
    minHeight: '40px',
    fontWeight: 700,
    fontSize: '14px',
    textDecoration: 'none',
    color: '#fff',
    borderRadius: '4px',
    overflow: 'hidden',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    backgroundColor: 'rgb(7, 193, 96)',
    cursor: 'pointer',
    ...jsxStyle.basicFlex.center
}

const style = {
    container
}

export default style
