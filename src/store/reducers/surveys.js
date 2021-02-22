import * as types from "../actions/surveysAction"

const initialState = {
    items: [],
    history: [],
    list: [],
    adminItems: [],
}

export default function surveys(state = initialState, actions) {
    switch(actions.type){
        case types.LOADSURVEY:
            return {
                ...state,
                items: actions.items
            }
        case types.LOADHISTORY:
            return {
                ...state,
                history: actions.history
            }
        case types.LOADLIST:
            return {
                ...state,
                list: actions.list
            }
        case types.LOADALLSURVEYS:
            return {
                ...state,
                adminItems: actions.adminItems
            }
        default:
            return {
                ...state
            }
    }
}