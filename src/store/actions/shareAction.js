export const handleShareAction = (link) => {
    return (dispatch) => {
        try {
            navigator.clipboard.writeText(link); 
            dispatch({type: "SHARE_SUCCESS", payload: "Link copied to clipboard"});
        } catch (err) {
            dispatch({type: "SHARE_ERROR", payload: err});
        }
    }
}