import * as types from "../actions/usersAction"

const initialState = {
    items: [],
    adminItems: [],
    totalUsers: 0,
    totalActiveUsers: 0,
    totalPQUsers: 0,
    loader: false,
    buttonLoader: false
}

export default function users(state = initialState, actions) {

    switch (actions.type) {
        case types.LOADUSER:
            return {
                ...state,
                items: actions.items,
            }
        case types.LOADUSERS:
            return {
                ...state,
                adminItems: actions.adminItems,
            }
        case types.SET_USER_DATA:
            return {
                ...state,
                items: {
                    ...state.items,
                    ...actions.value
                }
            }
        case types.SET_LOADER:
            return {
                ...state,
                loader: actions.loaderState
            }
        case types.LOADTOTALUSERS:
            return {
                ...state,
                totalUsers: actions.totalUsers
            }
        case types.LOADTOTALACTIVEUSERS:
            return {
                ...state,
                totalActiveUsers: actions.totalActiveUsers
            }
        case types.LOADTOTALPQUSERS:
            return {
                ...state,
                totalPQUsers: actions.totalPQUsers
            }
        case types.BUTTON_LOADER:
            return {
                ...state,
                buttonLoader: actions.value
            }
        default:
            return {
                ...state,
            }
    }
}