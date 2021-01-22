import deviceHandle from './../../utils/device-handle'

window.onload = () => {
    const root = document.getElementById('jeker-task-assist-system')
    if (deviceHandle.isMobile()) return import('./mobile.jsx').then(({ MobileComponent }) => {
        root.className = 'mobile-device-container'
        ReactDOM.render(<MobileComponent />, root)
    })

    import('./web.jsx').then(({ WebComponent }) => {
        root.className = 'web-device-container'
        ReactDOM.render(<WebComponent />, root)
    })
}
