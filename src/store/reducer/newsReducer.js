const initState = {
    headlines: [],
    newsError: null
}

const newsReducer = (state = initState, action) => {
    if(action.type === 'CATEGORY_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            newsError: null
        }
    }
    
    else if(action.type === 'SOURCE_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            newsError: null
        }
    }

    else if(action.type === 'SEARCH_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            newsError: null
        }
    }

    else if(action.type === 'HOME_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            newsError: null
        }
    }
    else if(action.type === 'NEWS_ERROR'){
        return {
            ...state,
            newsError: action.payload
        }
    }
    else if(action.type === 'CLEAR_NEWS_MSG') {
        return {
            ...state,
            newsError: null
        }
    }
    
    return state
}

export default newsReducer;