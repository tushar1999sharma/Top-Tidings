const initState = {
    shareError: null,
    shareSuccess: null
}

const shareReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SHARE_SUCCESS':
            return {
                ...state,
                shareError: null,
                shareSuccess: "link copied to clipboard"
            }
        case 'SHARE_ERROR':
            return {
                ...state,
                shareError: action.payload,
                shareSuccess: null
            }
        case 'CLEAR_SHARE_MSG':
                return {
                    ...state,
                    shareError: null,
                    shareSuccess: null
                } 
        default:
            return state
    }
}

export default shareReducer;