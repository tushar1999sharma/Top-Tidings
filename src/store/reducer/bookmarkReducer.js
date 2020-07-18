const initState = {
    bookmarkError: null
}

const bookmarkReducer = (state = initState, action) => {
    switch (action.type) {
        case 'bookmarkSuccess':
            return {
                ...state,
                bookmarkError: null
            }
        case 'bookmarkError':
            return {
                ...state,
                bookmarkError: action.payload
            }
        case 'clearBookmarkError':
                return {
                    ...state,
                    bookmarkError: null
                } 
        default:
            return state
    }
}

export default bookmarkReducer;