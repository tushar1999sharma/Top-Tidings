export const isLoadingAction = () => {
    return (dispatch) => {
        dispatch({ type: 'IS_LOADING' })
    }
}