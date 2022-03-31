
import { loadPageHashVar } from './../utils/url-helper';

import { updatePageLocationStatus } from './redux/action/navigation';
import { pages } from './const';

export let routeHashHistoryStack = [
    pages.entryView,
]

export const historyBackHandle = (historyPageLocation) => {
    routeHashHistoryStack = routeHashHistoryStack.filter(route => route !== historyPageLocation);
}

export const pushHistoryStack = (cachedPageLocation) => {
    routeHashHistoryStack.push(cachedPageLocation)
}

export default class Routes extends React.Component {
    constructor(props) {
        super(props)
    }

    /**
     * 监听hash变化
     * 监听 history back
     */
    routeHashChangeHandle = event => {
        const { dispatch, isPreventHashChange } = this.props
        const pageLocation = loadPageHashVar('pageLocation') || pages.entryView
        const isHistoryStack = routeHashHistoryStack.includes(pageLocation);

        /**
         * History Stack 表示返回
         * Prevent Hash Change 表示禁止返回
         */
        if (isHistoryStack && isPreventHashChange) {
            return window.history.forward();
        }

        if (pageLocation !== this.props.pageLocation && isHistoryStack) {
            historyBackHandle(this.props.pageLocation)
            dispatch(updatePageLocationStatus(pageLocation))
        }
    }

    /**
     * 监听 back / forward / go
     */
    routePopStateHandle = event => { }
}