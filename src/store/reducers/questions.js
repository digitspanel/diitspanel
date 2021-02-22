import * as types from "../actions/questionsAction"

const initialState = {
    items: [],
}

export default function questions(state = initialState, actions) {
    if (actions.type === types.QUESTIONS) {
        return {
            ...state,
            items: "Value"
        }
    }
    else {
        return {
            ...state
        }
    }
}