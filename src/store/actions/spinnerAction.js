export const startSpinnerAction = () => {
    return (dispatch) => {
        dispatch({ type: 'START_SPINNER' })
    }
}