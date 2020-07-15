const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                authError: null
            }
            
        case 'REGISTER_ERROR':
            return {
                ...state,
                authError: action.payload
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }

        case 'LOGIN_ERROR':
            return {
                ...state,  
                authError: action.payload
            }  

        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                authError: null
            }
 
        case 'LOGOUT_ERROR':
            return {
                ...state,
                authError: action.payload
            }

        default:
            return state            
    }
}

export default authReducer;