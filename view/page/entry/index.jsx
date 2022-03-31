import deviceHandle from './../../utils/device-handle'
import loadScript from './../../utils/loadScript'
import initReduxStore from './../../mobile/redux/index'

window.onload = async () => {
    const root = document.getElementById('jeker-task-assist-system');

    if (deviceHandle.isMobile()) {
        document.body.className = 'mobile-device-body'
        await loadScript('./lib/react/redux.min.js')
        await loadScript('./lib/react/react-redux.min.js')
        return import('./../../mobile/index.jsx')
            .then(({ MobileComponent }) => {
                root.className = 'mobile-device'

                const Provider = window.ReactRedux.Provider
                const store = initReduxStore()

                ReactDOM.render(
                    <Provider store={store}>
                        <MobileComponent />
                    </Provider>,
                    root
                )
            });
    }

    document.body.className = 'web-device-body'
    import('./web/index.jsx').then(({ WebComponent }) => {
        root.className = 'web-device'
        ReactDOM.render(<WebComponent />, root)
    })
}
