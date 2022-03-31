import store from './../store/navigation';

/**
 * service
 */
function navigation(state = store, action) {
    switch (action.type) {
        case 'stop_hash_change':
            return { ...state, isPreventHashChange: true }

        case 'allow_hash_change':
            return { ...state, isPreventHashChange: false }

        case 'update_page_location_status':
            return { ...state, pageLocationStatus: action.data }

        default:
            return state
    }
}

export default navigation