import global from './reducer/global';
import navigation from './reducer/navigation';

const initReduxStore = () => {
    const rootReducer = window.Redux.combineReducers({
        global,
        navigation
    })
    const store = window.Redux.createStore(rootReducer)

    return store
}

export default initReduxStore
