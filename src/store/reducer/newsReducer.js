const initState = {
    headlines: [],
}

const newsReducer = (state = initState, action) => {
    if(action.type === 'CATEGORY_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            isLoading: false
        }
    }
    
    else if(action.type === 'SOURCE_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            isLoading: false
        }
    }

    else if(action.type === 'SEARCH_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            isLoading: false
        }
    }

    else if(action.type === 'HOME_NEWS'){
        return {
            ...state,
            headlines: action.payload,
            isLoading: false
        }
    }
    
    return state
}

export default newsReducer;