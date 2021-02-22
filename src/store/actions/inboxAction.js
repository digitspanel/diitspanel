import { createDispatchHook } from 'react-redux';
import axios from '../../axios-order';

const socket = require("../../socket");

export const LOADNINBOX = "LOADNINBOX";
export const SET_STATUS = "SET_STATUS";
export const SET_UNSEENCOUNT = "SET_UNSEENCOUNT";
export const SHOWINBOX = "SHOWINBOX";
export const HIDEINBOX = "HIDEINBOX";

export const CREATENOTIFICATION = "CREATENOTIFICATION";

export const setUnseenCount = () => {
    return dispatch => {
        dispatch({ type: SET_UNSEENCOUNT });
    }
}

export const showInbox = () => {
    return dispatch => {
        dispatch({ type: SHOWINBOX });
    }
}

export const setStatus = (id) => {
    return dispatch => {
        dispatch({ type: SET_STATUS, id: id });
        dispatch(setUnseenCount());
        axios
            .post('/inbox/' + id,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const loadInbox = (emailId) => {
    return dispatch => {
        console.log(emailId)
        axios
            .get('/inbox/' + emailId,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch({ type: LOADNINBOX, items: res.data });
                dispatch(setUnseenCount());
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

//Admin Actions

export const createNotification = (data) => {
    return dispatch => {
        axios
            .put('/inbox', {
                ...data,
            },{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                socket.socket.emit("SendNotification", "Run");
            })
            .catch((e) => {
                console.log(e);
            });
    }
}