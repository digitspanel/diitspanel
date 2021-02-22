import axios from '../../axios-order';
import * as InboxActions from '../../store/actions/inboxAction';
import * as appActions from './appActions';
import * as authActions from './authActions';
import * as userActions from './usersAction';
import fire from '../../fire';
import { toastr } from 'react-redux-toastr';

import * as socket from "../../socket";

export const LOADSURVEY = "LOADSURVEY";
export const LOADLIST = "LOADLIST";
export const LOADHISTORY = "LOADHISTORY";

//Admin actions

export const LOADALLSURVEYS = "LOADALLSURVEYS";

export const loadSurveys = (list) => {
    
    let Ids = list.length != 0 ? list.map(survey => survey.SurveyId) : null;
    return dispatch => {
        axios
            .get('/surveys/' + Ids,{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch({ type: LOADSURVEY, items: res.data });
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const loadHistory = (list) => {
    let historyList = list.filter(value => value.Status !== "active");
    return dispatch => {
        dispatch({ type: LOADHISTORY, history: historyList });
    }
}

export const loadList = (user) => {
    appActions.setAppLoader(true);
    return dispatch => {
        axios
            .get('/surveyassigner/' + localStorage.getItem("digitspanel_user_emailId"),{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch(loadHistory(res.data));
                dispatch(loadSurveys(res.data));
                dispatch({ type: LOADLIST, list: res.data });
                dispatch(userActions.updateUserActivityStatus("Active"));
                dispatch(authActions.setLogin(true));
                appActions.setAppLoader(false);
            })
            .catch((e) => {
                console.log(e);
                appActions.setAppLoader(false);
            })
    }
}

// Admin Actions

export const createSurvey = (data) => {
    return dispatch => {
        axios
            .post('/surveys',
                {
                    ...data,
                },{
                    headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
                  })
            .then((res) => {
                socket.socket.emit("SendNotification", "Run");
                dispatch({ type: LOADALLSURVEYS, adminItems: res.data });
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

export const loadAllSurveys = () => {
    return dispatch => {
        axios
            .get('/surveys',{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                dispatch({ type: LOADALLSURVEYS, adminItems: res.data });
            })
            .catch((e) => {
                console.log(e);
            })
    }
}

export const assignSurveys = (body) => {
    return dispatch => {
        console.log(body);
        axios
            .post('/surveyassigner', {
                SurveyId: body.SurveyId,
                SurveyName: body.SurveyName,
                Points: body.Points,
                UserIds: body.UserIds
            },{
                headers: { "auth-token": sessionStorage.getItem("userAuth-token") }
              })
            .then((res) => {
                toastr.success("Survey Assigned", "Survey has been successfully assigned to the filltered users!");
                dispatch(InboxActions.createNotification({
                    Title: "New Survey",
                    Description: "Congratulations! You received a new survey " + body.SurveyName,
                    Link: body.Url,
                    UserId: body.UserIds
                }))
                socket.socket.emit("SendSurvey", "Run");
            })
            .catch((e) => {
                console.log(e);
            })
    }
}