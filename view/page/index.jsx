import deviceHandle from './../utils/device-handle'

window.onload = () => {
    if (deviceHandle.isMobile()) return import('./mobile.jsx').then(module => {
        const MobileComponent = module.MobileComponent
        ReactDOM.render(<MobileComponent />, document.getElementById('jeker-task-assist-system'))
    })

    import('./web.jsx').then(module => {
        const WebComponent = module.WebComponent
        ReactDOM.render(<WebComponent />, document.getElementById('jeker-task-assist-system'))
    })
}
