import * as types from "../actions/authActions"

const initialState = {
    logedIn: false,
    adminLogedIn: false,
}

export default function auth(state = initialState, actions) {

    switch(actions.type) {
        case types.SET_LOGIN:
            localStorage.setItem("digitspanel_user_logedin", actions.logedIn);
            return {
                ...state,
                logedIn: actions.login
            }
        case types.SET_ADMIN_LOGIN:
            localStorage.setItem("digitspanel_admin_Logedin", actions.adminLogedIn);
            return {
                ...state,
                adminLogedIn: actions.adminLogedIn
            }
        default: {
            return {
                ...state
            }
        }
    }
}