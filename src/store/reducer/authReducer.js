const initState = {
    currentUser: {},
    isAuthenticated: false,
}

const authReducer = (state = initState, action) => {
    if(action.type === 'LOGIN_USER'){
        console.log(action.payload);
        return {
            ...state,
            currentUser: action.payload,
            isAuthenticated: true,
            isLoading: false
        }
    }

    else if(action.type === 'LOGOUT_USER'){
        return {
            ...state,
            currentUser: {},
            isAuthenticated: false,
            isLoading: false
        }
    }
    
    return state
}

export default authReducer;