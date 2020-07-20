const initState = {
    bookmarkError: null,
    bookmarkSuccess: null
}

const bookmarkReducer = (state = initState, action) => {
    switch (action.type) {
        case 'BOOKMARK_SUCCESS':
            return {
                ...state,
                bookmarkError: null,
                bookmarkSuccess: "Successfully bookmarked new news card"
            }
        case 'BOOKMARK_ERROR':
            return {
                ...state,
                bookmarkError: action.payload,
                bookmarkSuccess: null
            }
        case 'CLEAR_BOOKMARK_MSG':
                return {
                    ...state,
                    bookmarkError: null,
                    bookmarkSuccess: null
                } 
        default:
            return state
    }
}

export default bookmarkReducer;