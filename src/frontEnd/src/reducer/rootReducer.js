const initState = {
    currentUser: {},
    headlines: [],
    isLoading: false
}
  
const rootReducer = (state = initState, action) => {
    if(action.type === 'IS_LOADING'){
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === 'CATEGORY_NEWS'){
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
    else if(action.type === 'REGISTER_USER'){
        console.log(action.payload);
        return {
            ...state,
            isLoading: false        }
    }
    else if(action.type === 'LOGIN_USER'){
        console.log(action.payload);
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false
        }
    }
    else if(action.type === 'LOGOUT_USER'){
        return {
            ...state,
            currentUser: {},
            isLoading: false
        }
    }
    
    return state
}
  
export default rootReducer