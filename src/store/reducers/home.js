import * as types from "../actions/homeActions"

const initialState = {
    survey: [],
    addVideo: [],
    dailyQuestion: [],
}

export default function home(state = initialState, actions) {

    switch(actions.type) {
        case types.LOADHOMESURVEY:
            return {
                ...state,
                survey: actions.survey
            }
        case types.LOADADDVIDEO:
            return {
                ...state,
                addVideo: actions.addVideo
            }
        case types.LOADDAILYQUESTION:
            return {
                ...state,
                dailyQuestion: actions.dailyQuestion
            }
        default: {
            return {
                ...state
            }
        }
    }
}