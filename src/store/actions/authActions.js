import axios from '../../axios-order';
import { SET_APPLOADER } from './appActions';

export const SET_LOGIN = "SET_LOGIN";
export const SET_ADMIN_LOGIN = "SET_ADMIN_LOGIN";

export const setLogin = (val) => {
    return dispatch => dispatch({ type: SET_LOGIN, login: val });
}

export const authentication = () => {
    return dispatch => {
        dispatch({ type: SET_APPLOADER, appLoadingStatus: true });
        axios
            .get('/admin?' + 'username=' + localStorage.getItem("digitspanel_admin_username"),{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                console.log(res.data.loginstatus);
                if(res.data.loginstatus == "true") {
                    dispatch({ type: SET_APPLOADER, appLoadingStatus: false });
                    dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: true });
                }
                else{
                    dispatch({ type: SET_APPLOADER, appLoadingStatus: false });
                    dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                }
            })
            .catch((e) => {
                dispatch({ type: SET_APPLOADER, appLoadingStatus: false });
                dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                console.log(e);
            });
    }
}

export const setAdminLogin = (username, password) => {
    return dispatch => {
        dispatch({ type: SET_APPLOADER, appLoadingStatus: true });
        axios
            .get('/admin?' + 'username=' + username + '&password=' + password,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
            })
            .then((res) => {
                if(res.data) {
                    localStorage.setItem("digitspanel_admin_username", username);
                    dispatch({ type: SET_APPLOADER, appLoadingStatus: false });
                    dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: true });
                }
                else{
                    dispatch({ type: SET_APPLOADER, appLoadingStatus: false });
                    dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                }
            })
            .catch((e) => {
                dispatch({ type: SET_APPLOADER, appLoadingStatus: false });
                dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                console.log(e);
            });
    }
}

export const setAdminLogout = () => {
    return dispatch => {
        axios
            .post('/admin/' + localStorage.getItem("digitspanel_admin_username"),{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                if(res.data) {
                    console.log(res.data);
                    dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                }
                else{
                    dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                }
            })
            .catch((e) => {
                dispatch({ type: SET_ADMIN_LOGIN, adminLogedIn: false });
                console.log(e);
            });
    }
}