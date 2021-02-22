import { useState } from 'react';
import axios from '../../axios-order';
import * as appActions from './appActions';
import * as authActions from './authActions';
import * as surveysActions from './surveysAction';
import { toastr } from 'react-redux-toastr'
import fire from '../../fire';

export const LOADUSER = "LOADUSER";
export const SET_LOGIN = "SET_LOGIN";
export const LOADUSERS = "LOADUSERS";
export const SET_LOADER = "SET_LOADER";
export const LOADTOTALUSERS = "LOADTOTALUSERS";
export const LOADTOTALACTIVEUSERS = "LOADTOTALACTIVEUSERS";
export const LOADTOTALPQUSERS = "LOADTOTALPQUSERS";
export const USERACTIVITY = "USERACTIVITY";
export const SET_USER_DATA = "SET_USER_DATA";
export const BUTTON_LOADER = "BUTTON_LOADER";

let userAuthData = {
    EmailId: "",
    FirstName: "",
    LastName: "",
    ActivityStatus: "",
};

fire.auth().onAuthStateChanged(User => {
    if (User) {
        if(User.displayName != null){
            userAuthData = {
                EmailId: User.email,
                FirstName: User.displayName.split(" ")[0],
                LastName: User.displayName.split(" ")[1],
                ActivityStatus: "Active"
            };
        }
    }
});

export const loginUser = (user, emailId, password) => {
    return async dispatch => {
        dispatch(buttonLoader(true));
        await axios
            .post('/users/login', {
                user: user,
                emailId: emailId,
                password: password
            })
            .then((res) => {
                sessionStorage.setItem("digitspanel-userAuth", JSON.stringify(res.data));
                sessionStorage.setItem("userAuth-token", res.data.token);
                console.log(sessionStorage.getItem("userAuth-token"));
                dispatch(loadUser(res.data.user));
                dispatch(buttonLoader(false));
            })
            .catch((e) => {
                toastr.error('Incorrect email id or password!');
                dispatch(buttonLoader(false));
            })
    }
}

export const buttonLoader = (value) => {
    return dispatch => {
        dispatch({ type: BUTTON_LOADER, value: value });
    }
}

export const setUserData = (value) => {
    return dispatch => {
        dispatch({ type: SET_USER_DATA, value: value })
    }
}

export const updateUserActivityStatus = (val) => {
    return dispatch => {
        dispatch(postAnswers(localStorage.getItem("digitspanel_user_emailId"), {ActivityStatus: val}));
    }
}

export const loadTotalUsers = (val) => {
    return dispatch => {
        dispatch({ type: LOADTOTALUSERS, totalUsers: val });
    }
}

export const loadTotalActiveUsers = (val) => {
    return dispatch => {
        dispatch({ type: LOADTOTALACTIVEUSERS, totalActiveUsers: val });
    }
}

export const loadTotalPQUsers = (val) => {
    return dispatch => {
        dispatch({ type: LOADTOTALPQUSERS, totalPQUsers: val });
    }
}

export const setLoader = (val) => {
    return dispatch => {
        dispatch({ type: SET_LOADER, loaderState: val});
    }
}

export const loadUser = (user) => {

    return dispatch => {
        appActions.setAppLoader(true);

        localStorage.setItem("digitspanel_user_emailId", user.email);

        let userData = {
            EmailId: user.email,
            FirstName: user.displayName.split(" ")[0],
            LastName: user.displayName.split(" ")[1],
            ProfilePicURL: user.photoURL ? user.photoURL : null,
            ActivityStatus: "Active"
        };

        axios
            .get('/users/' + user.email,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                console.log(res.data)
                if (res.data == "") {
                    axios
                        .post('/users',
                            {
                                ...userData
                            })
                        .then((res) => {
                            dispatch({ type: LOADUSER, items: userAuthData });
                            dispatch(surveysActions.loadList(res.data.user));
                            console.log(res)
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                        
                }
                else {
                    console.log(res.data)
                    dispatch({ type: LOADUSER, items: res.data });
                    dispatch(surveysActions.loadList(res.data.user));
                }
            })
            .catch((e) => {
                console.log(e);
                dispatch(authActions.setLogin(false));
                appActions.setAppLoader(false);
            })
    }
}

export const postAnswers = (id, data) => {

    return dispatch => {
        axios
            .put('/users/' + id,
                {
                    ...data,
                },{
                    headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
                  })
            .then((res) => {
                dispatch({ type: LOADUSER, items: res.data });
            })
            .catch((e) => {
                console.log(e);
            });
    }

}

// Admin Page

export const loadUsers = (data) => {

    return dispatch => {
        console.log(data);
        axios
            .get('/users?' + 
            'ageStart='+ data.ageStart
            +'&ageEnd='+ data.ageEnd
            +'&gender='+ data.gender
            +'&province=' + data.province
            +'&city='+ data.city
            +'&maritialStatus='+ data.martialStatu
            +'&network='+ data.network
            +'&householdStart='+ data.householdStart
            +'&householdEnd='+ data.householdEnd
            +'&family='+ data.family
            +'&houseStatus=' + data.houseStatus
            +'&avgIncome=' + data.avgIncome
            +'&numOfSimStart=' + data.numOfSimStart
            +'&numOfSimEnd=' + data.numOfSimEnd
            +'&smartPhone=' + data.smartPhone
            +'&featuredPhone=' + data.featurePhonne
            +'&SECURBAN='+ data.SECURBAN
            + '&SECRURAL=' + data.SECRURAL
            ,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                console.log(res.data);
                dispatch(setLoader(false));
                dispatch({ type: LOADUSERS, adminItems: res.data });
            })
            .catch((e) => {
                toastr.error(
                    "Survey Assigning Failed"
                );
            });
    }

}

export const loadUsersInfo = () => {
    return dispatch => {
        axios
            .get('/users/userscount',{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch(loadTotalUsers(res.data.userscount));
                console.log('totalUser RUNNING')
            })
            .catch((e) => {
                console.log(e);
            });

        axios
            .get('/users/activeusers',{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch(loadTotalActiveUsers(res.data));
            })
            .catch((e) => {
                console.log(e);
            });

        axios
            .get('/users/pqusers',{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch(loadTotalPQUsers(res.data.pqcount));
            })
            .catch((e) => {
                console.log(e);
            });
    }
}