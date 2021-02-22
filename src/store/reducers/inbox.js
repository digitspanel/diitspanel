import * as types from "../actions/inboxAction"

const initialState = {
    items: [],
    unseenCount: 0,
    inboxShow: false,
}

export default function inbox(state = initialState, actions) {

    switch(actions.type) {
        case types.LOADNINBOX:
            return {
                ...state,
                items: actions.items
            }
        case types.SET_STATUS:
            let index = state.items.findIndex(item => item.Id == actions.id);
            state.items[index].Status = "Seen";
            return {
                ...state,
            }
        case types.SET_UNSEENCOUNT:
            var count = 0;
            state.items.forEach(item => {
                if(item.Status === "Unseen"){
                    count++
                }
            });
            return {
                ...state,
                unseenCount: count,
            }
        case types.SHOWINBOX:
            return {
                ...state,
                inboxShow: !state.inboxShow,
            }
        default: {
            return {
                ...state
            }
        }
    }
}