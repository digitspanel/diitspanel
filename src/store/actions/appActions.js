export const SET_APPLOADER = "SET_APPLOADER";

export const setAppLoader = (val) => {
    return dispatch => dispatch({ type: SET_APPLOADER, appLoadingStatus: val });
}