export const handleShareAction = (link) => {
    return (dispatch) => {
        try {
            navigator.clipboard.writeText(link); 
            dispatch({type: "SHARE_SUCCESS", payload: "Link copied to clipboard"});
            setTimeout(() => {
                dispatch({type: "CLEAR_SHARE_MSG"});    
            }, 3000);
        } catch (err) {
            dispatch({type: "SHARE_ERROR", payload: err});
            setTimeout(() => {
                dispatch({type: "CLEAR_SHARE_MSG"});    
            }, 3000);
        }
    }
}