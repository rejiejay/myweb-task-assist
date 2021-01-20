import jsxStyle from './../jsx-style/index'

// const content = {
//     position: 'fixed',
//     width: '100%',
//     height: '100%',
//     top: '0px',
//     left: '0px',
//     zIndex: '99',
//     ...jsxStyle.basicFlex.center
// }
const content = 'position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 99; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center;'

const message = {
    maxWidth: '100%',
    padding: '10px 20px',
    borderRadius: '5px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
}

const loader = {
    width: '180px',
    height: '45px',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.86)'
}

const audioWave = {
    position: 'relative',
    top: '7.5px',
    margin: '0 auto',
    width: '3em',
    height: '2em',
    background: 'linear-gradient(#9b59b6, #9b59b6) 0 50%, linear-gradient(#9b59b6, #9b59b6) 0.625em 50%, linear-gradient(#9b59b6, #9b59b6) 1.25em 50%, linear-gradient(#9b59b6, #9b59b6) 1.875em 50%, linear-gradient(#9b59b6, #9b59b6) 2.5em 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em, 0.5em 0.25em',
    animation: 'audioWave 1.5s linear infinite'
}

const style = {
    content,
    message,
    loader,
    audioWave
}

export default style
