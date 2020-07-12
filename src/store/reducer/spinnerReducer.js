const initState = {
    isLoading: false
}

const authReducer = (state = initState, action) => {
    if(action.type === 'START_SPINNER'){
        return {
            ...state,
            isLoading: true
        }
    }

    else if(action.type === 'STOP_SPINNER'){
        return {
            ...state,
            isLoading: false
        }
    }

    return state
}

export default authReducer;