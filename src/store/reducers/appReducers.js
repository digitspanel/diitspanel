import * as types from "../actions/appActions"

const initialState = {
    appLoadingStatus: false,
}

export default function auth(state = initialState, actions) {

    switch(actions.type) {
        case types.SET_APPLOADER:
            return {
                ...state,
                appLoadingStatus: actions.appLoadingStatus
            }
        default: {
            return {
                ...state
            }
        }
    }
}